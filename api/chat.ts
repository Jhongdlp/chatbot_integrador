import { redis, supabase, openai, CORS_HEADERS, Message } from './utils.js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Constants
const RATE_LIMIT_WINDOW = 60 * 60; // 1 hour in seconds
const RATE_LIMIT_MAX_REQUESTS = 50; // Max requests per hour per IP
const CHAT_HISTORY_TTL = 60 * 60 * 24; // 24 hours retention for chat history

// Helper: Handle CORS preflight
const handleOptions = (res: VercelResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return res.status(200).end();
};

// Helper: Error Response
const sendError = (res: VercelResponse, status: number, message: string) => {
  res.setHeader('Content-Type', 'application/json');
  return res.status(status).json({ error: message });
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    return handleOptions(res);
  }

  // 2. Validate Method
  if (req.method !== 'POST') {
    return sendError(res, 405, 'Method Not Allowed');
  }

  try {
    const { messages, sessionId } = req.body as { messages: Message[], sessionId: string };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return sendError(res, 400, 'Invalid request body: "messages" array is required.');
    }
    
    // Use IP or sessionId for rate limiting
    // Note: Vercel provides x-forwarded-for header
    const ip = (req.headers['x-forwarded-for'] as string) || 'unknown';
    const rateLimitKey = `rate_limit:${ip}`;

    // 3. Rate Limiting (Upstash Redis)
    // Increment the counter for this IP
    const currentUsage = await redis.incr(rateLimitKey);
    
    // Set expiry if it's the first request (value is 1)
    if (currentUsage === 1) {
      await redis.expire(rateLimitKey, RATE_LIMIT_WINDOW);
    }

    if (currentUsage > RATE_LIMIT_MAX_REQUESTS) {
      return sendError(res, 429, 'Too many requests. Please try again later.');
    }

    // 4. Retrieve Chat History (Upstash Redis) - optional if passing full context from client
    // For this implementation, we'll trust the client sends the relevant history,
    // but we can persist it here for future analysis or context restoration.
    // Let's store the latest interaction.
    if (sessionId) {
        const historyKey = `chat:${sessionId}`;
        // Store the user's latest message
        const lastUserMessage = messages[messages.length - 1];
        if (lastUserMessage.role === 'user') {
            await redis.rpush(historyKey, JSON.stringify(lastUserMessage));
            await redis.expire(historyKey, CHAT_HISTORY_TTL);
        }
    }

    const lastMessage = messages[messages.length - 1];
    const userQuery = lastMessage.content;

    // 5. Generate Embedding for User Query (OpenAI)
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small', // Use a small, fast model
      input: userQuery.replaceAll('\n', ' '),
    });
    const embedding = embeddingResponse.data[0].embedding;

    // 6. Search Vector Database (Supabase)
    // Assumes a function 'match_documents' exists in Supabase
    const { data: documents, error: searchError } = await supabase.rpc('match_documents', {
      query_embedding: embedding,
      match_threshold: 0.5, // Similarity threshold
      match_count: 5, // Top 5 relevant chunks
    });

    if (searchError) {
      console.error('Supabase Vector Search Error:', searchError);
      // Fallback: Proceed without context if search fails (or return error)
    }

    // Construct Context String with metadata
    const contextText = documents
      ?.map((doc: any) => `---\n${doc.content}\n---`)
      .join('\n\n') || '';
    
    // Extract metadata for debugging
    const contextMetadata = documents?.map((doc: any) => ({
      similarity: doc.similarity,
      proyecto: doc.metadata?.proyecto,
      componente: doc.metadata?.componente,
      seccion: doc.metadata?.h2
    })) || [];

    // 7. System Prompt Augmentation (RAG) - EMPODERATECH Specific
    const systemPrompt = `
Eres un asistente virtual oficial del Programa EMPODERATECH ECUADOR, de la Dirección de Economía Digital del Ministerio de Telecomunicaciones y de la Sociedad de la Información (MINTEL).

Tu misión es ayudar a MIPYMEs, emprendedores, artesanos y organizaciones de la Economía Popular y Solidaria (EPS) a entender y aprovechar los 6 proyectos estratégicos del programa (2025-2030):

1. **Ruta de Transformación Digital Productiva**: 
   - Fase 0: Sensibilización y Diagnóstico
   - Fase 1: Presencia Digital Básica (Quick Wins)
   - Fase 2: Productividad Digital Interna
   - Fase 3: Escalamiento Digital y Uso de Datos
   - Fase 4: IA Productiva y Visibilidad

2. **Comercio Digital**: Estrategia Nacional con 5 dimensiones (Inclusión, Promoción, Gobernanza, Innovación, Logística)

3. **Emprendedor Digital**: 
   - Digitalízate Rural (artesanos, agricultores, comunidades)
   - Mujeres E-mpoderadas (reducción de brecha de género)

4. **Ciberseguridad para MIPYMES**: Protección y buenas prácticas

5. **Observatorio y Datos Abiertos**: Transparencia y evidencia

6. **Brigadas TECH - Click para Vender**: Asistencia territorial práctica

**ALIADOS ESTRATÉGICOS**: Mercado Libre, Claro, AWS, BCE, Macrogram, Banco Pichincha, entre otros.

**INSTRUCCIONES IMPORTANTES**:
- Usa ÚNICAMENTE la información del contexto proporcionado a continuación
- Si no encuentras la respuesta en el contexto, indica amablemente que no dispones de esa información y sugiere contactar a economiadigital@mintel.gob.ec
- Sé específico con fechas, requisitos, fases, aliados y KPIs cuando estén en el contexto
- Mantén un tono institucional pero cercano y motivador
- Si mencionas fases o proyectos, explica brevemente de qué tratan
- NO inventes ni asumas información que no esté en el contexto

**FORMATO DE RESPUESTA**:
- Usa **negritas** para resaltar términos importantes (ej: **EMPODERATECH**, **Fase 1**, **Aliados**)
- Usa listas con viñetas (-) para enumerar items
- Separa párrafos con líneas en blanco para mejor lectura
- Estructura las respuestas en secciones claras cuando sea apropiado
- Mantén las respuestas concisas pero completas (máximo 3-4 párrafos)

**Contexto de la documentación oficial:**
${contextText}
    `;


    // Only include the system prompt and the last few messages to save tokens/context window
    // (Or use the full 'messages' array if short enough)
    const completionMessages: Message[] = [
      { role: 'system', content: systemPrompt },
      ...messages.slice(-5) // Keep last 5 messages for context continuity
    ];

    // 8. Generate Streamed Response (OpenAI) -> We can't do true streaming with Vercel Serverless easily without Edge Runtime
    // For simplicity in standard Serverless Functions, we'll do a simple await.
    // If you need streaming, we'd switch to Edge Functions. Let's stick to simple first.
    
    // Using standard completion (non-streaming for now to ensure reliability)
    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // Or gpt-4o
        messages: completionMessages as any,
        temperature: 0.3, // Lower temperature for more factual answers
    });
    
    const reply = completion.choices[0].message.content;

    // Save Assistant Response to History (Redis)
    if (sessionId && reply) {
        const historyKey = `chat:${sessionId}`;
        await redis.rpush(historyKey, JSON.stringify({ role: 'assistant', content: reply }));
    }

    // Return JSON response with metadata
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ 
        role: 'assistant', 
        content: reply,
        metadata: {
          contextUsed: !!contextText,
          documentsRetrieved: documents?.length || 0,
          sources: contextMetadata.slice(0, 3) // Top 3 sources
        }
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return sendError(res, 500, 'Internal Server Error');
  }
}
