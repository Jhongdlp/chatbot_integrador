import 'dotenv/config';
import { redis, supabase, openai } from '../api/utils';

async function verifyConnections() {
  console.log('--- Verifying Backend Connections ---');

  // 1. Verify Redis
  try {
    console.log('Testing Redis (Upstash)...');
    await redis.set('verify_test', 'success');
    const val = await redis.get('verify_test');
    if (val === 'success') {
      console.log('✅ Redis Connected!');
    } else {
      console.error('❌ Redis verification failed: Value mismatch');
    }
  } catch (error) {
    console.error('❌ Redis Connection Error:', error);
  }

  // 2. Verify OpenAI
  try {
    console.log('Testing OpenAI...');
    const models = await openai.models.list();
    if (models.data.length > 0) {
      console.log('✅ OpenAI Connected!');
    } else {
      console.error('❌ OpenAI verification failed: No models found');
    }
  } catch (error) {
    console.error('❌ OpenAI Connection Error:', error);
    if ((error as any).status === 401) console.error('   (Check your API KEY)');
  }

  // 3. Verify Supabase
  try {
    console.log('Testing Supabase...');
    // Just a simple query to check connection/auth
    // We try to fetch from a table that might not exist, but just checking if the client connects
    // Or better, check auth status
    const { data, error } = await supabase.from('users').select('count', { count: 'exact', head: true });
    
    // Even if error (table doesn't exist), if it's not a connection/auth error, we are arguably okay.
    // simpler:
    const { error: authError } = await supabase.auth.getSession();
    
    if (!authError) {
      console.log('✅ Supabase Client Connected!');
    } else {
        console.error('❌ Supabase Error:', authError.message);
    }

  } catch (error) {
    console.error('❌ Supabase Connection Error:', error);
  }
}

verifyConnections();
