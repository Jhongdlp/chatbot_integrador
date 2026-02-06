# Proceso RAG - Documentación

## Archivo Fuente

**PDF**: `PLANIFICACIÓN-DIR.ECONOMIADIGITAL25-30_VF.pdf`

- **Tamaño**: 1.75 MB
- **Páginas**: 44
- **Contenido**: Plan Estratégico de la Dirección de Economía Digital de Ecuador 2025-2030

## Archivos Generados

### 1. extracted_text.txt

- **Ubicación**: `/RAG/extracted_text.txt`
- **Tamaño**: 93.57 KB
- **Descripción**: Texto plano extraído del PDF con marcadores de páginas
- **Uso**: Archivo intermedio para análisis y revisión

### 2. PLANIFICACION_ECONOMIA_DIGITAL_2025-2030.md

- **Ubicación**: `/RAG/PLANIFICACION_ECONOMIA_DIGITAL_2025-2030.md`
- **Descripción**: Markdown estructurado y optimizado para RAG
- **Características**:
  - YAML Frontmatter con metadatos completos
  - Estructura jerárquica con 6 niveles de encabezados
  - Divisores semánticos (`---`) entre secciones principales
  - Contexto preservado en cada sección
  - Tablas formateadas en markdown
  - Listas organizadas
  - Referencias cruzadas claras

## Estructura del Documento Markdown

### Metadatos (YAML Frontmatter)

```yaml
titulo: "Planificación Dirección de Economía Digital 2025-2030"
documento: "PLANIFICACIÓN-DIR.ECONOMIADIGITAL25-30_VF"
organismo: "MINTEL"
programa_principal: "EMPODERATECH ECUADOR"
periodo: "2025-2030"
fecha_extraccion: "2026-02-05"
total_paginas: 44
```

### Jerarquía de Contenidos

1. **Nivel 1 (H1)**: Título principal y programas
2. **Nivel 2 (H2)**: Contexto, visión, proyectos principales
3. **Nivel 3 (H3)**: Objetivos, alcances, componentes
4. **Nivel 4 (H4)**: Actividades, fases, dimensiones
5. **Nivel 5 (H5)**: Detalles específicos
6. **Nivel 6 (H6)**: Sub-detalles

### Secciones Principales

1. **Contexto y Principios Rectores**
2. **Programa EMPODERATECH - Descripción General y FODA**
3. **Proyecto 1**: Ruta de Transformación Digital Productiva (5 fases)
4. **Proyecto 2**: Comercio Digital (5 dimensiones estratégicas)
5. **Proyecto 3**: Emprendedor Digital (inclusión, género, territorio)
6. **Proyecto 4**: Ciberseguridad para MIPYMES
7. **Proyecto 5**: Observatorio y Datos Abiertos
8. **Proyecto 6**: Brigadas TECH - Click para Vender
9. **Espacios de Sensibilización** (Webinarios, TechTalks, Podcast)
10. **Plan de Medios**
11. **Conclusiones y Metadatos**

## Optimizaciones para RAG

### 1. Contexto Preservado

- Cada sección incluye contexto suficiente para ser entendida independientemente
- Referencias a proyectos relacionados
- Acrónimos expandidos en primera mención

### 2. Divisores Semánticos

- Líneas `---` separan secciones temáticas principales
- Facilitan el chunking en puntos lógicos
- Evitan pérdida de contexto en cortes

### 3. Metadatos Enriquecidos

- Frontmatter YAML con información clave
- Metadatos al final del documento
- Fechas, instituciones, aliados estratégicos

### 4. Estructura Consistente

- Patrón repetible: Descripción → Objetivo → Alcance → Actividades → KPIs
- Facilita el entrenamiento de modelos
- Mejora la recuperación de información específica

### 5. Tamaño Óptimo de Secciones

- Secciones entre 300-1500 palabras
- Ideales para chunks de 512-2048 tokens
- Balance entre contexto y granularidad

## Recomendaciones para Chunking

### Estrategia Recomendada: Chunking por Sección

```python
# Pseudocódigo para chunking
def chunk_document(markdown_file):
    chunks = []

    # 1. Extraer frontmatter como chunk especial
    frontmatter_chunk = extract_yaml_frontmatter()

    # 2. Dividir por divisores principales (---)
    sections = split_by_dividers()

    # 3. Para secciones muy largas, dividir por H2/H3
    for section in sections:
        if len(section) > MAX_CHUNK_SIZE:
            subsections = split_by_headers(section, level=2)
            chunks.extend(subsections)
        else:
            chunks.append(section)

    # 4. Agregar metadata a cada chunk
    for chunk in chunks:
        chunk.metadata = {
            'document': frontmatter.documento,
            'programa': frontmatter.programa_principal,
            'section': extract_section_title(chunk)
        }

    return chunks
```

### Tamaños Sugeridos de Chunks

| Modelo de Embeddings          | Tamaño Recomendado | Overlap      |
| ----------------------------- | ------------------ | ------------ |
| OpenAI text-embedding-3-small | 512 tokens         | 50 tokens    |
| OpenAI text-embedding-3-large | 1024 tokens        | 100 tokens   |
| Cohere embed-multilingual-v3  | 512 tokens         | 50 tokens    |
| Local (sentence-transformers) | 256-512 tokens     | 25-50 tokens |

### Ejemplo de Metadata por Chunk

```json
{
  "documento": "PLANIFICACIÓN-DIR.ECONOMIADIGITAL25-30_VF",
  "organismo": "MINTEL",
  "programa": "EMPODERATECH ECUADOR",
  "proyecto": "Ruta de Transformación Digital Productiva",
  "fase": "Fase 1: Presencia Digital Básica",
  "tipo": "descripcion_actividades",
  "keywords": ["presencia digital", "MIPYMES", "quick wins", "formalización"],
  "pagina_fuente": 10,
  "chunk_id": "rtdp-fase1-001"
}
```

## Siguiente Paso: Script de Chunking

Para implementar el chunking, se recomienda crear un script Python que:

1. Lea el markdown generado
2. Extraiga y preserve el frontmatter
3. Divida el documento según la estrategia recomendada
4. Genere embeddings usando el modelo seleccionado
5. Almacene en vector database (Supabase + pgvector recomendado)

## Herramientas Recomendadas

### Para Chunking

- `langchain.text_splitter.MarkdownTextSplitter`
- `llama-index.core.node_parser.MarkdownNodeParser`

### Para Embeddings

- OpenAI API (text-embedding-3-small/large)
- Voyage AI (voyage-2)
- Cohere (embed-multilingual-v3)

### Para Vector Store

- Supabase (PostgreSQL + pgvector) ✅ Ya disponible en el proyecto
- Pinecone
- Weaviate

## Validación de Calidad

✅ **Estructura**: Jerárquica y clara
✅ **Contexto**: Cada sección es autocontenida  
✅ **Formato**: Markdown válido
✅ **Metadata**: Rica y estructurada
✅ **Tamaño**: Apropiado para RAG
✅ **Semántica**: Divisores lógicos preservados
✅ **Referencias**: Cruzadas y claras
✅ **Completitud**: 100% del contenido del PDF incluido
