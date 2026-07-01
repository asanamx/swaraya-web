'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, User, Bot, Minimize2 } from 'lucide-react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '¡Hola! Soy el asistente de swaraya. ¿En qué puedo ayudarte hoy? Puedo responder preguntas sobre nuestros servicios de IA o explicarte conceptos de inteligencia artificial.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          session_id: sessionId,
          history: messages.slice(-10)
        })
      });

      if (!response.ok) throw new Error('Failed to send message');

      const data = await response.json();
      setSessionId(data.session_id);
      
      // Add assistant response
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button - positioned to align with send button when chat opens */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-[26px] right-[26px] z-50 w-11 h-11 rounded-xl bg-[#5468D6] text-white shadow-lg shadow-[#5468D6]/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-[#5468D6]/40 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Abrir chat"
        data-testid="chat-open-button"
      >
        <MessageCircle className="w-5 h-5" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-[#0A0C10] rounded-2xl shadow-2xl shadow-black/50 border border-[rgba(255,255,255,0.06)] overflow-hidden flex flex-col h-[520px] max-h-[calc(100vh-6rem)]">
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-[#0C1016] to-[#0A0C10] border-b border-[rgba(255,255,255,0.04)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#5468D6] flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#F4F6F9]">Asistente swaraya</h3>
                <p className="text-[0.6875rem] text-[#9BA5B7]">Powered by AI</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.04)] flex items-center justify-center text-[#5D6878] hover:text-[#F4F6F9] hover:bg-[rgba(255,255,255,0.08)] transition-colors"
              aria-label="Cerrar chat"
              data-testid="chat-close-button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[rgba(255,255,255,0.1)] scrollbar-track-transparent">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${
                  msg.role === 'user' 
                    ? 'bg-[rgba(255,255,255,0.08)]' 
                    : 'bg-[#5468D6]/20'
                }`}>
                  {msg.role === 'user' 
                    ? <User className="w-3.5 h-3.5 text-[#9BA5B7]" />
                    : <Bot className="w-3.5 h-3.5 text-[#5468D6]" />
                  }
                </div>
                
                {/* Message Bubble */}
                <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#5468D6] text-white rounded-tr-md'
                    : 'bg-[rgba(255,255,255,0.04)] text-[#B7BFCC] rounded-tl-md'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-[#5468D6]/20 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-[#5468D6]" />
                </div>
                <div className="px-4 py-3 rounded-2xl rounded-tl-md bg-[rgba(255,255,255,0.04)]">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#5D6878] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#5D6878] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#5D6878] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="p-4 border-t border-[rgba(255,255,255,0.04)]">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] rounded-xl text-sm text-[#F4F6F9] placeholder-[#5D6878] focus:outline-none focus:border-[#5468D6]/50 transition-colors disabled:opacity-50"
                data-testid="chat-input"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-11 h-11 rounded-xl bg-[#5468D6] text-white flex items-center justify-center transition-all hover:bg-[#5468D6] disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="chat-send-button"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;
