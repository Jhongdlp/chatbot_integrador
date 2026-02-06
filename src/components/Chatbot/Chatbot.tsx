import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Minimize2, Sparkles } from 'lucide-react';
import { sendMessage } from '../../services/api';
import { Message } from '../../../api/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Helper to generate a random session ID stored in localStorage
const getSessionId = () => {
  let sessionId = localStorage.getItem('chat_session_id');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(7);
    localStorage.setItem('chat_session_id', sessionId);
  }
  return sessionId;
};

// Typing animation hook
const useTypingEffect = (text: string, speed: number = 20) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!text) return;
    
    setDisplayedText('');
    setIsTyping(true);
    let i = 0;
    
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayedText, isTyping };
};

// Suggested questions for better UX
const SUGGESTED_QUESTIONS = [
  "¿Qué es EMPODERATECH?",
  "¿Cuáles son las fases de la Ruta Digital?",
  "¿Cómo participo en Digitalízate Rural?",
  "¿Quiénes son los aliados estratégicos?"
];

interface MessageWithMetadata extends Message {
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
  id?: string;
}

// Message component with typing animation
const ChatMessage = ({ msg, isLatest }: { msg: MessageWithMetadata; isLatest: boolean }) => {
  const shouldAnimate = msg.role === 'assistant' && isLatest;
  const { displayedText, isTyping } = useTypingEffect(shouldAnimate ? msg.content : '', 15);
  const textToShow = shouldAnimate ? displayedText : msg.content;

  return (
    <div>
      <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`max-w-[85%] p-4 rounded-2xl text-sm ${
            msg.role === 'user'
              ? 'bg-blue-600 text-white rounded-br-none'
              : 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 rounded-bl-none shadow-sm'
          }`}
        >
          {msg.role === 'assistant' ? (
            <div className="assistant-message">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => (
                    <p className="mb-3 last:mb-0 leading-relaxed text-zinc-700 dark:text-zinc-200">
                      {children}
                    </p>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-blue-700 dark:text-blue-400">
                      {children}
                    </strong>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-3 space-y-1.5">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mb-3 space-y-1.5 list-decimal pl-5">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="leading-relaxed ml-1 text-zinc-700 dark:text-zinc-200">
                      <span className="mr-2">•</span>
                      {children}
                    </li>
                  ),
                  h3: ({ children }) => (
                    <h3 className="font-bold text-base mb-2 mt-3 text-zinc-800 dark:text-zinc-100">
                      {children}
                    </h3>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-zinc-600 dark:text-zinc-300">
                      {children}
                    </em>
                  ),
                  code: ({ children }) => (
                    <code className="bg-zinc-100 dark:bg-zinc-700 px-1.5 py-0.5 rounded text-xs font-mono">
                      {children}
                    </code>
                  ),
                }}
              >
                {textToShow}
              </ReactMarkdown>
              {isTyping && (
                <span className="inline-block w-0.5 h-4 bg-blue-500 animate-pulse ml-0.5 align-middle" />
              )}
            </div>
          ) : (
            <div className="whitespace-pre-wrap">{textToShow}</div>
          )}
          
          {/* RAG Metadata Badge - solo mostrar cuando termine de escribir */}
          {msg.role === 'assistant' && msg.metadata?.contextUsed && !isTyping && (
            <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                <Sparkles size={10} className="text-blue-500" />
                <span>Basado en {msg.metadata.documentsRetrieved} documentos oficiales</span>
              </div>
              
              {/* Sources Display */}
              {msg.metadata.sources && msg.metadata.sources.length > 0 && (
                <div className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                  {msg.metadata.sources[0]?.proyecto && (
                    <div className="truncate">
                      📂 {msg.metadata.sources[0].proyecto}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<MessageWithMetadata[]>([
    { 
      role: 'assistant', 
      content: '¡Hola! Soy tu asistente del **Programa EMPODERATECH ECUADOR** 🚀\n\n¿En qué puedo ayudarte hoy?',
      id: 'initial'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sessionId = getSessionId();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: MessageWithMetadata = { 
      role: 'user', 
      content: input,
      id: Date.now().toString()
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setShowSuggestions(false);

    try {
      const response = await sendMessage([...messages, userMessage], sessionId);
      
      const assistantMessage: MessageWithMetadata = { 
        role: 'assistant', 
        content: response.content,
        metadata: response.metadata,
        id: (Date.now() + 1).toString()
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Chat error:', error);
      setMessages((prev) => [...prev, { 
        role: 'assistant', 
        content: error.message || 'Lo siento, tuve un problema al procesar tu solicitud. Por favor intenta de nuevo.',
        id: (Date.now() + 1).toString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            <MessageCircle size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '600px'
            }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className={`fixed bottom-6 right-6 z-50 w-full max-w-[420px] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 flex flex-col transition-all duration-300`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <MessageCircle size={20} />
                  <Sparkles size={10} className="absolute -top-1 -right-1 text-yellow-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">EMPODERATECH Asistente</h3>
                  <p className="text-xs opacity-90">Powered by RAG + IA</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <Minimize2 size={18} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            {!isMinimized && (
              <>
                {/* Suggested Questions */}
                {showSuggestions && messages.length === 1 && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800">
                    <p className="text-xs font-medium text-blue-900 dark:text-blue-200 mb-2">Preguntas frecuentes:</p>
                    <div className="flex flex-wrap gap-2">
                      {SUGGESTED_QUESTIONS.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestedQuestion(q)}
                          className="text-xs bg-white dark:bg-zinc-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-lg border border-blue-200 dark:border-blue-700 transition-colors"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50 dark:bg-zinc-900/50">
                  {messages.map((msg, idx) => (
                    <ChatMessage 
                      key={msg.id || idx} 
                      msg={msg} 
                      isLatest={idx === messages.length - 1}
                    />
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white dark:bg-zinc-800 p-3 rounded-2xl rounded-bl-none border border-zinc-200 dark:border-zinc-700 shadow-sm flex items-center gap-2">
                        <Loader2 className="animate-spin text-blue-600" size={16} />
                        <span className="text-xs text-zinc-500">Consultando documentación...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSubmit} className="p-3 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 shrink-0">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Escribe tu pregunta sobre EMPODERATECH..."
                      className="flex-1 bg-zinc-100 dark:bg-zinc-800 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none dark:text-white placeholder:text-zinc-400"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                  <div className="mt-1 text-xs text-center text-zinc-400 dark:text-zinc-600">
                    Información oficial del MINTEL
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
