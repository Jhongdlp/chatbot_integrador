import { redis, supabase, openai, CORS_HEADERS, Message } from './utils.ts';
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

    // Construct Context String
    const contextText = documents
      ?.map((doc: any) => `---\n${doc.content}\n---`)
      .join('\n\n') || '';

    // 7. System Prompt Augmentation (RAG)
    const systemPrompt = `
      You are a helpful assistant for the "Economía Digital" platform.
      Use the following context to answer the user's question.
      If the answer is not in the context, say "I don't have enough information to answer that based on the provided documents."
      Do not hallucinate facts.

      Context:
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

    // Return JSON response
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ 
        role: 'assistant', 
        content: reply,
        // debug: { contextUsed: !!contextText } 
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return sendError(res, 500, 'Internal Server Error');
  }
}
