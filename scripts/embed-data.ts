import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { supabase, openai } from '../api/utils';

// Configuration
const FILES_TO_PROCESS = [
  'INSTRUCCIONES_GOOGLE_SHEETS.md',
  'README.md'
];

async function generateEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text.replaceAll('\n', ' '),
  });
  return response.data[0].embedding;
}

async function processFile(filePath: string) {
  const fullPath = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`File not found: ${filePath}`);
    return;
  }

  const content = fs.readFileSync(fullPath, 'utf-8');
  console.log(`Processing ${filePath} (${content.length} chars)...`);

  // Simple chunking Strategy: Split by paragraphs or roughly 1000 chars
  // For better results, use a proper text splitter like langchain's RecursiveCharacterTextSplitter
  const chunks = content.split('\n\n').filter(chunk => chunk.trim().length > 0);

  let successCount = 0;

  for (const chunk of chunks) {
    if (chunk.length < 50) continue; // Skip very small chunks

    try {
      const embedding = await generateEmbedding(chunk);

      const { error } = await supabase.from('documents').insert({
        content: chunk,
        metadata: { source: filePath },
        embedding: embedding,
      });

      if (error) {
        console.error('Error inserting chunk:', error.message);
      } else {
        successCount++;
      }
    } catch (err) {
      console.error('Error processing chunk:', err);
    }
  }

  console.log(`Saved ${successCount} chunks from ${filePath}`);
}

async function main() {
  console.log('--- Starting Ingestion ---');
  
  for (const file of FILES_TO_PROCESS) {
    await processFile(file);
  }

  console.log('--- Ingestion Complete ---');
}

main();
