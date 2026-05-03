'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Bot, Languages, Loader2 } from 'lucide-react';
import { askChunavGuru } from '@/app/actions/ai-assistant';

type Message = {
  role: 'user' | 'bot';
  content: string;
};

export default function ChunavGuru() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi' | null>(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || !language || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const response = await askChunavGuru(userMessage, language);

    if (response.text) {
      setMessages(prev => [...prev, { role: 'bot', content: response.text }]);
    }

    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chunav-guru-chat"
            role="complementary"
            aria-label="Chunav Guru AI Assistant"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            className="absolute bottom-[72px] right-0 w-[90vw] md:w-[400px] h-[480px] bg-white border border-outline-variant rounded-lg overflow-hidden flex flex-col"
            style={{ boxShadow: '0px 8px 30px rgba(0,0,0,0.12)' }}
          >
            {/* Header */}
            <div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary-container flex items-center justify-center">
                  <Bot className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-on-surface text-[14px]">Chunav Guru</h3>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-on-surface-variant font-bold">AI Civics Mentor</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-surface-container rounded transition-colors text-on-surface-variant"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide bg-surface">
              {!language ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-5 px-6">
                  <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center">
                    <Languages size={28} className="text-primary-container" />
                  </div>
                  <div>
                    <h4 className="text-[18px] font-medium text-on-surface mb-1">Namaste! नमस्ते!</h4>
                    <p className="text-[13px] text-on-surface-variant">Select your preferred language to start talking with Chunav Guru.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    <button
                      onClick={() => setLanguage('en')}
                      className="p-3 rounded bg-white border border-outline-variant hover:border-primary-container hover:text-primary-container transition-all font-medium text-[14px] text-on-surface"
                    >
                      English
                    </button>
                    <button
                      onClick={() => setLanguage('hi')}
                      className="p-3 rounded bg-white border border-outline-variant hover:border-primary-container hover:text-primary-container transition-all font-medium text-[14px] text-on-surface"
                    >
                      हिन्दी
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {messages.length === 0 && (
                    <div className="text-center py-10 px-6">
                      <p className="text-[13px] text-on-surface-variant italic font-medium">
                        {language === 'en'
                          ? "I'm here to help you understand how elections work in India. Ask me anything!"
                          : "मैं यहाँ आपको यह समझने में मदद करने के लिए हूँ कि भारत में चुनाव कैसे काम करते हैं। मुझसे कुछ भी पूछें!"}
                      </p>
                    </div>
                  )}
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-3 rounded ${
                        msg.role === 'user'
                          ? 'bg-primary-container text-white rounded-tr-none'
                          : 'bg-surface-container-low text-on-surface border border-outline-variant rounded-tl-none'
                      }`}>
                        <div className="flex items-center gap-1.5 mb-1">
                          {msg.role === 'user' ? <User size={10} /> : <Bot size={10} className="text-primary-container" />}
                          <span className="text-[9px] font-semibold uppercase tracking-wider opacity-60">
                            {msg.role === 'user' ? 'You' : 'Guru'}
                          </span>
                        </div>
                        <p className="text-[13px] leading-[1.5] whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-surface-container-low p-3 rounded rounded-tl-none border border-outline-variant">
                        <div className="animate-spin text-primary-container inline-flex">
                          <Loader2 size={18} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input */}
            {language && (
              <div className="p-3 border-t border-outline-variant bg-white">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={language === 'en' ? "Ask about elections..." : "चुनावों के बारे में पूछें..."}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-full py-2.5 pl-4 pr-11 text-[13px] focus:outline-none focus:border-primary-container transition-colors text-on-surface placeholder:text-on-surface-variant"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="absolute right-1.5 p-2 text-primary-container hover:text-primary disabled:text-outline-variant transition-colors rounded-full"
                  >
                    <Send size={18} />
                  </button>
                </div>
                <button
                  onClick={() => setLanguage(null)}
                  className="mt-2 text-[10px] uppercase tracking-[0.05em] text-outline hover:text-primary-container transition-colors flex items-center gap-1 mx-auto font-semibold"
                >
                  <Languages size={10} /> Change Language / भाषा बदलें
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="chunav-guru-chat"
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
        className="w-14 h-14 rounded-full bg-primary-container flex items-center justify-center text-white border-none hover:bg-primary transition-colors"
        style={{ boxShadow: '0px 4px 20px rgba(0,91,191,0.3)' }}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
}
