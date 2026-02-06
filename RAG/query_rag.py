#!/home/jhon/Documentos/CODE/INTEGRADOR/Econom-aDigitalIntegrador/RAG/venv/bin/python3
"""
Script para consultar el sistema RAG y buscar información en el documento.
"""

import os
import sys
from pathlib import Path
from typing import List, Dict, Any
from dotenv import load_dotenv
from openai import OpenAI
from supabase import create_client, Client

# Cargar variables de entorno
load_dotenv(Path(__file__).parent.parent / '.env')

# Configuración
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

# Inicializar clientes
openai_client = OpenAI(api_key=OPENAI_API_KEY)
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Configuración de búsqueda
EMBEDDING_MODEL = "text-embedding-3-small"
EMBEDDING_DIMENSIONS = 1536
SIMILARITY_THRESHOLD = 0.5
TOP_K = 5


def generate_query_embedding(query: str) -> List[float]:
    """Genera embedding para la consulta."""
    response = openai_client.embeddings.create(
        model=EMBEDDING_MODEL,
        input=query,
        dimensions=EMBEDDING_DIMENSIONS
    )
    return response.data[0].embedding


def search_documents(query_embedding: List[float], top_k: int = TOP_K, threshold: float = SIMILARITY_THRESHOLD) -> List[Dict[str, Any]]:
    """Busca documentos similares usando la función de Supabase."""
    result = supabase.rpc(
        'match_documents',
        {
            'query_embedding': query_embedding,
            'match_threshold': threshold,
            'match_count': top_k
        }
    ).execute()
    
    return result.data


def format_result(result: Dict[str, Any], index: int) -> str:
    """Formatea un resultado para mostrar."""
    metadata = result.get('metadata', {})
    similarity = result.get('similarity', 0)
    content = result.get('content', '')
    
    # Truncar contenido si es muy largo
    content_preview = content[:300] + '...' if len(content) > 300 else content
    
    output = f"\n{'='*80}\n"
    output += f"📄 RESULTADO {index + 1} - Similitud: {similarity:.3f}\n"
    output += f"{'='*80}\n"
    
    # Metadata relevante
    if metadata.get('proyecto'):
        output += f"🎯 Proyecto: {metadata['proyecto']}\n"
    if metadata.get('componente'):
        output += f"📌 Componente: {metadata['componente']}\n"
    if metadata.get('h2'):
        output += f"📋 Sección: {metadata['h2']}\n"
    if metadata.get('keywords'):
        keywords_str = ', '.join(metadata['keywords'][:5])
        output += f"🏷️  Keywords: {keywords_str}\n"
    
    output += f"\n📝 Contenido:\n{content_preview}\n"
    
    return output


def generate_answer(query: str, context: str) -> str:
    """Genera una respuesta usando GPT-4 con el contexto."""
    prompt = f"""Eres un asistente experto en el Programa EMPODERATECH ECUADOR de transformación digital.

Contexto del documento:
{context}

Pregunta del usuario: {query}

Proporciona una respuesta clara, precisa y basada únicamente en el contexto proporcionado. Si la información no está en el contexto, indícalo claramente."""

    response = openai_client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Eres un asistente experto en transformación digital y el programa EMPODERATECH ECUADOR."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3,
        max_tokens=500
    )
    
    return response.choices[0].message.content


def main():
    # Obtener query de argumentos o input
    if len(sys.argv) > 1:
        query = ' '.join(sys.argv[1:])
    else:
        query = input("🔍 Ingresa tu pregunta: ")
    
    if not query.strip():
        print("❌ Por favor ingresa una pregunta válida")
        return
    
    print(f"\n🔍 Buscando: \"{query}\"")
    print("⏳ Generando embedding de la consulta...")
    
    # Generar embedding de la query
    query_embedding = generate_query_embedding(query)
    
    print("🔎 Buscando documentos relevantes...")
    
    # Buscar en Supabase
    results = search_documents(query_embedding)
    
    if not results:
        print("\n❌ No se encontraron resultados relevantes.")
        print(f"   Intenta reformular la pregunta o reducir el threshold (actual: {SIMILARITY_THRESHOLD})")
        return
    
    print(f"\n✅ Encontrados {len(results)} resultados relevantes\n")
    
    # Mostrar resultados
    for i, result in enumerate(results):
        print(format_result(result, i))
    
    # Preguntar si quiere generar respuesta con GPT-4
    print("\n" + "="*80)
    generate = input("\n💬 ¿Deseas generar una respuesta con GPT-4? (s/n): ").lower()
    
    if generate == 's':
        print("\n🤖 Generando respuesta con GPT-4...")
        
        # Combinar contexto de los top 3 resultados
        context = "\n\n".join([
            f"### {r['metadata'].get('h2', 'Sección')}\n{r['content']}"
            for r in results[:3]
        ])
        
        answer = generate_answer(query, context)
        
        print("\n" + "="*80)
        print("🤖 RESPUESTA GENERADA")
        print("="*80)
        print(f"\n{answer}\n")
        print("="*80)


if __name__ == "__main__":
    main()
