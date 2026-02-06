import { Redis } from '@upstash/redis';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

// Initialize Redis client using Upstash
// Requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN env vars
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Initialize Supabase client
// Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars
// SERVICE_ROLE_KEY is critical for backend operations (bypassing RLS if needed for vector search)
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Initialize OpenAI client
// Requires OPENAI_API_KEY env var
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Interface for Chat Message
export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};
