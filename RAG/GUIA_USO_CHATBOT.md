# Guía de Uso: Chatbot EMPODERATECH con RAG

## 🎯 Descripción

El chatbot ahora utiliza un sistema RAG (Retrieval Augmented Generation) completo que consulta 43 chunks de documentación oficial sobre el Programa EMPODERATECH ECUADOR para responder preguntas con información precisa y actualizada.

---

## 🚀 Cómo Usar el Chatbot

### 1. Iniciar Conversación

1. Abre el sitio web del proyecto
2. Busca el botón flotante azul en la esquina inferior derecha 💬
3. Haz clic para abrir el chatbot

### 2. Preguntas Sugeridas

Al abrir el chatbot verás 4 preguntas frecuentes sugeridas:

- "¿Qué es EMPODERATECH?"
- "¿Cuáles son las fases de la Ruta Digital?"
- "¿Cómo participo en Digitalízate Rural?"
- "¿Quiénes son los aliados estratégicos?"

Puedes hacer clic en cualquiera para obtener una respuesta inmediata.

### 3. Hacer Preguntas Personalizadas

Escribe tu propia pregunta en el campo de texto. Ejemplos:

**Sobre el Programa**:

- "¿Qué proyectos incluye EMPODERATECH?"
- "¿Cuál es el objetivo del programa?"
- "¿Quiénes pueden participar?"

**Sobre Fases Específicas**:

- "¿Qué herramientas ofrece la Fase 1?"
- "¿Cuánto dura cada fase?"
- "¿Qué requisitos hay para la Fase 2?"

**Sobre Aliados y Contacto**:

- "¿Qué empresas son aliadas del programa?"
- "¿Cómo contacto con MINTEL?"
- "¿Dónde se implementa el programa?"

**Sobre Proyectos Específicos**:

- "¿Qué es Digitalízate Rural?"
- "¿Qué es el proyecto de Comercio Digital?"
- "¿Cómo funcionan las Brigadas TECH?"

### 4. Interpretar las Respuestas

#### Indicador RAG

Si ves el ícono ✨ con "Basado en X documentos oficiales", significa que la respuesta está fundamentada en la documentación oficial del programa.

#### Fuente del Proyecto

Debajo verás 📂 seguido del nombre del proyecto de donde proviene la información, por ejemplo:

- 📂 RUTA DE TRANSFORMACIÓN DIGITAL PRODUCTIVA
- 📂 Comercio Digital

#### Respuestas sin Contexto

Si el chatbot no encuentra información en la documentación, te sugerirá contactar directamente a: **economiadigital@mintel.gob.ec**

---

## 🛠️ Para Desarrolladores

### Ejecutar en Desarrollo

```bash
# Terminal 1: API (ya debe estar corriendo)
npm run dev:api

# Terminal 2: Frontend
npm run dev
```

El chatbot estará disponible en: `http://localhost:5173`

### Probar la Integración RAG

```bash
# Probar API directamente
cd RAG
chmod +x test-chatbot-rag.sh
./test-chatbot-rag.sh http://localhost:3000/api/chat
```

### Ver Logs del Sistema

Abre la consola del navegador (F12) para ver:

- Requests al API
- Metadata de documentos recuperados
- Similarity scores
- Errores (si los hay)

---

## 📊 Qué Esperar del Sistema

### Calidad de Respuestas

✅ **Alta precisión** en temas documentados (6 proyectos EMPODERATECH)
✅ **Contexto específico** con fases, aliados, fechas y KPIs
✅ **No alucinaciones** - solo responde con info del documento
✅ **Sugerencias de contacto** cuando no tiene la info

### Limitaciones

⚠️ **Solo sabe lo que está en el PDF**: No puede responder sobre temas fuera de EMPODERATECH
⚠️ **Threshold 0.5**: Preguntas muy específicas o con términos diferentes pueden no encontrar resultados
⚠️ **Contexto limitado**: Usa los últimos 5 mensajes + contexto RAG

---

## 🔧 Troubleshooting

### El chatbot no responde

1. Verifica que el API esté corriendo: `npm run dev:api`
2. Revisa la consola del browser para errores
3. Verifica que Supabase esté accesible

### Respuestas genéricas sin RAG

1. Verifica que los 43 chunks estén en Supabase:
   ```sql
   SELECT COUNT(*) FROM documents;
   ```
2. Revisa los logs del API en la terminal
3. Verifica las credenciales de OpenAI y Supabase en `.env`

### No encuentra información obvia

1. La pregunta puede necesitar reformularse
2. Intenta con términos específicos del documento (ej: "Fase 1" en vez de "primera etapa")
3. Reduce el threshold en `api/chat.ts` línea 87 (de 0.5 a 0.4)

---

## 📞 Contacto y Soporte

**Correo oficial**: economiadigital@mintel.gob.ec  
**Programa**: EMPODERATECH ECUADOR  
**Organismo**: MINTEL - Ministerio de Telecomunicaciones y de la Sociedad de la Información

---

## 🎓 Mejoras Futuras Sugeridas

1. **Streaming**: Implementar respuestas en tiempo real
2. **Multi-idioma**: Soporte para inglés
3. **Feedback**: Botones de 👍 👎 para mejorar calidad
4. **Historial**: Persistir conversaciones
5. **Analytics**: Dashboard de preguntas más frecuentes
