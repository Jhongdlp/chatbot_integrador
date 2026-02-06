import { Message } from '../../api/utils';

interface ChatResponse {
  role: 'assistant';
  content: string;
  metadata?: {
    contextUsed?: boolean;
    documentsRetrieved?: number;
    sources?: Array<{
      similarity?: number;
      proyecto?: string;
      componente?: string;
      seccion?: string;
    }>;
  };
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

    let responseText;
    try {
        responseText = await response.text();
    } catch (e) {
        throw new Error('No se recibió respuesta del servidor.');
    }

    if (!response.ok) {
        console.error('API Error Status:', response.status);
        console.error('API Error Body:', responseText);
        
        let errorMessage = 'Error al comunicarse con el servidor';
        try {
             // Try to parse error json if possible
             const errorJson = JSON.parse(responseText);
             if (errorJson.error) errorMessage = errorJson.error;
        } catch {}

        if (response.status === 429) {
            errorMessage = 'Has enviado demasiados mensajes. Por favor espera un momento.';
        } else if (response.status === 404) {
            errorMessage = 'Error 404: No se encontró el servicio de chat (/api/chat). Verifica que el servidor backend esté corriendo.';
        } else if (response.status === 500) {
            errorMessage = 'Error Interno del Servidor (500). Revisa la terminal del servidor para más detalles.';
        }
        
        throw new Error(errorMessage);
    }

    try {
        const data = JSON.parse(responseText);
        return data;
    } catch (error) {
        console.error('JSON Parse Error. Received:', responseText);
        throw new Error('Respuesta inválida del servidor (No es JSON). Revisa la consola para ver qué devolvió.');
    }
  } catch (error) {
    console.error('API Service Error:', error);
    throw error;
  }
}
