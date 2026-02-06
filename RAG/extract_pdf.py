#!/home/jhon/Documentos/CODE/INTEGRADOR/Econom-aDigitalIntegrador/RAG/venv/bin/python3
"""
Script para extraer y analizar el contenido del PDF PLANIFICACIÓN-DIR.ECONOMIADIGITAL25-30_VF.pdf
Este script extrae el texto, analiza la estructura y genera un markdown optimizado para RAG.
"""

import sys
import re
from pathlib import Path

try:
    import PyPDF2
except ImportError:
    print("PyPDF2 no está instalado. Instalando...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "PyPDF2"])
    import PyPDF2

def extract_text_from_pdf(pdf_path):
    """Extrae el texto completo del PDF"""
    print(f"📄 Extrayendo texto de: {pdf_path}")
    
    text_pages = []
    
    with open(pdf_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        total_pages = len(pdf_reader.pages)
        print(f"📊 Total de páginas: {total_pages}")
        
        for page_num in range(total_pages):
            page = pdf_reader.pages[page_num]
            text = page.extract_text()
            text_pages.append({
                'page_num': page_num + 1,
                'text': text
            })
            print(f"✓ Página {page_num + 1}/{total_pages} extraída")
    
    return text_pages

def analyze_structure(text_pages):
    """Analiza la estructura del documento"""
    print("\n🔍 Analizando estructura del documento...")
    
    analysis = {
        'total_pages': len(text_pages),
        'sections': [],
        'has_tables': False,
        'has_lists': False,
        'headings': []
    }
    
    for page_data in text_pages:
        text = page_data['text']
        
        # Buscar títulos (texto en mayúsculas o con números de sección)
        lines = text.split('\n')
        for i, line in enumerate(lines):
            line_stripped = line.strip()
            
            # Detectar títulos principales (mayúsculas, cortos)
            if len(line_stripped) > 0 and len(line_stripped) < 100:
                if line_stripped.isupper() and len(line_stripped.split()) > 1:
                    analysis['headings'].append({
                        'page': page_data['page_num'],
                        'text': line_stripped,
                        'type': 'main_heading'
                    })
                
                # Detectar secciones numeradas
                if re.match(r'^[\d\.]+\s+[A-Z]', line_stripped):
                    analysis['headings'].append({
                        'page': page_data['page_num'],
                        'text': line_stripped,
                        'type': 'numbered_section'
                    })
        
        # Detectar listas
        if re.search(r'^\s*[•\-\*]\s+', text, re.MULTILINE):
            analysis['has_lists'] = True
        
        # Detectar tablas (múltiples espacios o tabs)
        if re.search(r'\t+|\s{3,}', text):
            analysis['has_tables'] = True
    
    return analysis

def clean_text(text):
    """Limpia y normaliza el texto"""
    # Eliminar múltiples espacios
    text = re.sub(r' +', ' ', text)
    
    # Eliminar múltiples saltos de línea (máximo 2)
    text = re.sub(r'\n{3,}', '\n\n', text)
    
    # Corregir palabras cortadas por guiones al final de línea
    text = re.sub(r'(\w+)-\n(\w+)', r'\1\2', text)
    
    return text.strip()

def main():
    # Ruta del PDF
    pdf_path = Path(__file__).parent / "PLANIFICACIÓN-DIR.ECONOMIADIGITAL25-30_VF.pdf"
    
    if not pdf_path.exists():
        print(f"❌ Error: No se encontró el archivo {pdf_path}")
        sys.exit(1)
    
    # Extraer texto
    text_pages = extract_text_from_pdf(pdf_path)
    
    # Analizar estructura
    analysis = analyze_structure(text_pages)
    
    # Guardar análisis
    print("\n📋 Resumen del análisis:")
    print(f"  - Total de páginas: {analysis['total_pages']}")
    print(f"  - Encabezados encontrados: {len(analysis['headings'])}")
    print(f"  - Contiene tablas: {'Sí' if analysis['has_tables'] else 'No'}")
    print(f"  - Contiene listas: {'Sí' if analysis['has_lists'] else 'No'}")
    
    # Mostrar algunos encabezados
    if analysis['headings']:
        print("\n📑 Primeros encabezados detectados:")
        for heading in analysis['headings'][:10]:
            print(f"  - Página {heading['page']}: {heading['text'][:80]}")
    
    # Guardar texto completo
    output_txt = Path(__file__).parent / "extracted_text.txt"
    with open(output_txt, 'w', encoding='utf-8') as f:
        for page_data in text_pages:
            f.write(f"\n{'='*80}\n")
            f.write(f"PÁGINA {page_data['page_num']}\n")
            f.write(f"{'='*80}\n\n")
            f.write(clean_text(page_data['text']))
            f.write("\n\n")
    
    print(f"\n✅ Texto extraído guardado en: {output_txt}")
    print(f"\n📝 Tamaño del archivo: {output_txt.stat().st_size / 1024:.2f} KB")

if __name__ == "__main__":
    main()
