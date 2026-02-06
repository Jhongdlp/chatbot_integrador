#!/home/jhon/Documentos/CODE/INTEGRADOR/Econom-aDigitalIntegrador/RAG/venv/bin/python3
"""
Script para realizar chunking semántico del markdown, generar embeddings y cargar a Supabase.
"""

import os
import re
import json
from pathlib import Path
from typing import List, Dict, Any
import yaml
from dotenv import load_dotenv
from openai import OpenAI
from supabase import create_client, Client
import tiktoken
from tqdm import tqdm
import time

# Cargar variables de entorno
load_dotenv(Path(__file__).parent.parent / '.env')

# Configuración
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

# Inicializar clientes
openai_client = OpenAI(api_key=OPENAI_API_KEY)
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Configuración de chunking
MAX_TOKENS = 1024
OVERLAP_TOKENS = 100
EMBEDDING_MODEL = "text-embedding-3-small"
EMBEDDING_DIMENSIONS = 1536

# Inicializar tokenizer
encoding = tiktoken.get_encoding("cl100k_base")


def count_tokens(text: str) -> int:
    """Cuenta el número de tokens en un texto."""
    return len(encoding.encode(text))


def extract_frontmatter(markdown_content: str) -> tuple[Dict[str, Any], str]:
    """Extrae el frontmatter YAML y retorna metadata y contenido sin frontmatter."""
    pattern = r'^---\s*\n(.*?)\n---\s*\n(.*)$'
    match = re.match(pattern, markdown_content, re.DOTALL)
    
    if match:
        frontmatter_str = match.group(1)
        content = match.group(2)
        metadata = yaml.safe_load(frontmatter_str)
        return metadata, content
    
    return {}, markdown_content


def extract_hierarchy(text: str) -> Dict[str, str]:
    """Extrae la jerarquía de encabezados del texto."""
    hierarchy = {
        'h1': None,
        'h2': None,
        'h3': None,
        'proyecto': None,
        'componente': None
    }
    
    lines = text.split('\n')
    for line in lines[:20]:  # Buscar en las primeras líneas
        if line.startswith('# ') and not hierarchy['h1']:
            hierarchy['h1'] = line.strip('# ').strip()
        elif line.startswith('## ') and not hierarchy['h2']:
            hierarchy['h2'] = line.strip('# ').strip()
        elif line.startswith('### ') and not hierarchy['h3']:
            hierarchy['h3'] = line.strip('# ').strip()
    
    # Detectar proyectos
    if 'PROYECTO' in text[:500]:
        match = re.search(r'PROYECTO \d+:?\s*([^\n]+)', text[:500])
        if match:
            hierarchy['proyecto'] = match.group(1).strip()
    
    # Detectar fases/componentes
    if 'FASE' in text[:300] or 'Fase' in text[:300]:
        match = re.search(r'(?:FASE|Fase)\s+\d+:?\s*([^\n]+)', text[:300])
        if match:
            hierarchy['componente'] = match.group(1).strip()
    elif 'DIMENSIÓN' in text[:300]:
        match = re.search(r'DIMENSIÓN\s+\d+:?\s*([^\n]+)', text[:300])
        if match:
            hierarchy['componente'] = match.group(1).strip()
    
    return hierarchy


def extract_keywords(text: str) -> List[str]:
    """Extrae keywords relevantes del texto."""
    keywords = set()
    
    # Palabras clave predefinidas del dominio
    domain_keywords = [
        'MIPYMES', 'emprendedores', 'artesanos', 'EPS', 'transformación digital',
        'comercio electrónico', 'marketing digital', 'inteligencia artificial',
        'ciberseguridad', 'datos abiertos', 'inclusión digital', 'quick wins',
        'presencia digital', 'productividad', 'escalamiento', 'Market linkage',
        'Mercado Libre', 'Claro', 'AWS', 'BCE', 'MINTEL', 'EMPODERATECH'
    ]
    
    text_lower = text.lower()
    for keyword in domain_keywords:
        if keyword.lower() in text_lower:
            keywords.add(keyword)
    
    return list(keywords)[:10]  # Máximo 10 keywords


def chunk_by_dividers(content: str) -> List[str]:
    """Divide el contenido por divisores semánticos (---)."""
    sections = content.split('\n---\n')
    return [section.strip() for section in sections if section.strip()]


def split_large_section(section: str, max_tokens: int) -> List[str]:
    """Divide secciones grandes por H2 o H3."""
    tokens = count_tokens(section)
    
    if tokens <= max_tokens:
        return [section]
    
    # Intentar dividir por H2 (##)
    h2_pattern = r'\n## '
    parts = re.split(h2_pattern, section)
    
    if len(parts) > 1:
        # Reconstruir con los encabezados
        chunks = [parts[0]]  # Primera parte antes del primer H2
        for i, part in enumerate(parts[1:], 1):
            chunks.append('## ' + part)
        return chunks
    
    # Si no hay H2, intentar por H3 (###)
    h3_pattern = r'\n### '
    parts = re.split(h3_pattern, section)
    
    if len(parts) > 1:
        chunks = [parts[0]]
        for part in parts[1:]:
            chunks.append('### ' + part)
        return chunks
    
    # Si no se puede dividir por encabezados, dividir por párrafos
    paragraphs = section.split('\n\n')
    chunks = []
    current_chunk = ""
    
    for para in paragraphs:
        test_chunk = current_chunk + '\n\n' + para if current_chunk else para
        if count_tokens(test_chunk) > max_tokens and current_chunk:
            chunks.append(current_chunk)
            current_chunk = para
        else:
            current_chunk = test_chunk
    
    if current_chunk:
        chunks.append(current_chunk)
    
    return chunks


def create_chunks_with_overlap(sections: List[str], max_tokens: int, overlap_tokens: int) -> List[Dict[str, Any]]:
    """Crea chunks con overlap y metadata."""
    all_chunks = []
    chunk_index = 0
    
    for section in sections:
        # Dividir secciones grandes si es necesario
        sub_chunks = split_large_section(section, max_tokens)
        
        for sub_chunk in sub_chunks:
            # Extraer jerarquía y metadata
            hierarchy = extract_hierarchy(sub_chunk)
            keywords = extract_keywords(sub_chunk)
            
            # Detectar contenido estructurado
            has_table = '|' in sub_chunk and '---' in sub_chunk
            has_list = bool(re.search(r'^\s*[-*]\s', sub_chunk, re.MULTILINE))
            
            chunk_data = {
                'content': sub_chunk.strip(),
                'metadata': {
                    'chunk_index': chunk_index,
                    'tokens': count_tokens(sub_chunk),
                    'h1': hierarchy['h1'],
                    'h2': hierarchy['h2'],
                    'h3': hierarchy['h3'],
                    'proyecto': hierarchy['proyecto'],
                    'componente': hierarchy['componente'],
                    'keywords': keywords,
                    'has_table': has_table,
                    'has_list': has_list
                }
            }
            
            all_chunks.append(chunk_data)
            chunk_index += 1
    
    return all_chunks


def generate_embedding(text: str, max_retries: int = 3) -> List[float]:
    """Genera embedding con reintentos en caso de error."""
    for attempt in range(max_retries):
        try:
            response = openai_client.embeddings.create(
                model=EMBEDDING_MODEL,
                input=text,
                dimensions=EMBEDDING_DIMENSIONS
            )
            return response.data[0].embedding
        except Exception as e:
            if attempt < max_retries - 1:
                wait_time = 2 ** attempt  # Backoff exponencial
                print(f"  ⚠️  Error generando embedding (intento {attempt + 1}/{max_retries}): {e}")
                print(f"  ⏳ Esperando {wait_time}s antes de reintentar...")
                time.sleep(wait_time)
            else:
                raise


def batch_generate_embeddings(chunks: List[Dict[str, Any]], batch_size: int = 20) -> List[Dict[str, Any]]:
    """Genera embeddings en batches para eficiencia."""
    print(f"\n🔮 Generando embeddings para {len(chunks)} chunks...")
    
    for i in tqdm(range(0, len(chunks), batch_size), desc="Generando embeddings"):
        batch = chunks[i:i + batch_size]
        
        for chunk in batch:
            embedding = generate_embedding(chunk['content'])
            chunk['embedding'] = embedding
            time.sleep(0.1)  # Rate limiting suave
    
    return chunks


def upload_to_supabase(chunks: List[Dict[str, Any]], global_metadata: Dict[str, Any]):
    """Sube chunks con embeddings a Supabase."""
    print(f"\n📤 Subiendo {len(chunks)} chunks a Supabase...")
    
    success_count = 0
    error_count = 0
    
    for chunk in tqdm(chunks, desc="Subiendo a Supabase"):
        try:
            # Combinar metadata global con metadata del chunk
            combined_metadata = {
                **global_metadata,
                **chunk['metadata']
            }
            
            # Insertar en Supabase
            data = {
                'content': chunk['content'],
                'metadata': combined_metadata,
                'embedding': chunk['embedding']
            }
            
            supabase.table('documents').insert(data).execute()
            success_count += 1
            
        except Exception as e:
            print(f"\n  ❌ Error subiendo chunk {chunk['metadata']['chunk_index']}: {e}")
            error_count += 1
    
    print(f"\n✅ Subida completada: {success_count} exitosos, {error_count} errores")
    return success_count, error_count


def main():
    print("=" * 80)
    print("🚀 CHUNKING Y EMBEDDING - RAG PIPELINE")
    print("=" * 80)
    
    # 1. Leer el markdown
    markdown_file = Path(__file__).parent / "PLANIFICACION_ECONOMIA_DIGITAL_2025-2030.md"
    print(f"\n📖 Leyendo archivo: {markdown_file.name}")
    
    with open(markdown_file, 'r', encoding='utf-8') as f:
        markdown_content = f.read()
    
    print(f"  ✓ Archivo leído: {len(markdown_content)} caracteres")
    
    # 2. Extraer frontmatter
    print("\n🏷️  Extrayendo metadata global...")
    global_metadata, content = extract_frontmatter(markdown_content)
    print(f"  ✓ Metadata extraída: {json.dumps(global_metadata, indent=2, ensure_ascii=False)}")
    
    # 3. Dividir por divisores
    print("\n✂️  Dividiendo por divisores semánticos...")
    sections = chunk_by_dividers(content)
    print(f"  ✓ Secciones principales: {len(sections)}")
    
    # 4. Crear chunks con overlap
    print(f"\n🧩 Creando chunks (max {MAX_TOKENS} tokens, overlap {OVERLAP_TOKENS})...")
    chunks = create_chunks_with_overlap(sections, MAX_TOKENS, OVERLAP_TOKENS)
    print(f"  ✓ Total de chunks: {len(chunks)}")
    
    # Estadísticas de tokens
    total_tokens = sum(chunk['metadata']['tokens'] for chunk in chunks)
    avg_tokens = total_tokens / len(chunks) if chunks else 0
    print(f"  ✓ Total tokens: {total_tokens:,}")
    print(f"  ✓ Promedio por chunk: {avg_tokens:.0f} tokens")
    
    # 5. Generar embeddings
    chunks = batch_generate_embeddings(chunks)
    
    # 6. Subir a Supabase
    success, errors = upload_to_supabase(chunks, global_metadata)
    
    # 7. Reporte final
    print("\n" + "=" * 80)
    print("📊 REPORTE FINAL")
    print("=" * 80)
    print(f"✅ Chunks procesados: {len(chunks)}")
    print(f"✅ Embeddings generados: {len(chunks)}")
    print(f"✅ Subidos exitosamente: {success}")
    print(f"❌ Errores: {errors}")
    print(f"📈 Tasa de éxito: {(success/len(chunks)*100):.1f}%")
    print("\n✨ ¡Proceso completado!")
    print("=" * 80)
    
    # Guardar reporte en archivo
    report = {
        'timestamp': time.strftime('%Y-%m-%d %H:%M:%S'),
        'total_chunks': len(chunks),
        'successful_uploads': success,
        'errors': errors,
        'total_tokens': total_tokens,
        'avg_tokens_per_chunk': avg_tokens,
        'global_metadata': global_metadata
    }
    
    report_file = Path(__file__).parent / 'chunking_report.json'
    with open(report_file, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    
    print(f"\n📄 Reporte guardado en: {report_file.name}")


if __name__ == "__main__":
    main()
