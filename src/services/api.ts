import { Message } from '../../api/utils';

interface ChatResponse {
  role: 'assistant';
  content: string;
}

const API_URL = import.meta.env.VITE_API_URL || '/api'; // Fallback to relative path for production (served by same domain)

export async function sendMessage(messages: Message[], sessionId: string): Promise<ChatResponse> {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages, sessionId }),
    });

    if (!response.ok) {
        if (response.status === 429) {
            throw new Error('Has enviado demasiados mensajes. Por favor espera un momento.');
        }
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al comunicarse con el servidor');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Service Error:', error);
    throw error;
  }
}
