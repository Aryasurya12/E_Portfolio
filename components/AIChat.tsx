import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { processQuery, clearSession, AIResponse } from '../lib/aryaAI/engine';
import { SectionType, Project } from '../types';

interface AIChatProps {
  currentSection?: SectionType;
}

const suggestedPrompts = [
  "What are Arya's best projects?",
  "Show me AI/ML projects.",
  "Which projects use Python?",
  "Tell me about PM2.5."
];

const AIChat: React.FC<AIChatProps> = ({ currentSection = 'home' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; response: AIResponse }[]>([
    { 
      role: 'ai', 
      response: { 
        text: "Explore Arya's work through conversation.\n\nAsk about projects, AI/ML, software development, skills, achievements or experience." 
      } 
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isProcessing]);

  const handleSendMessage = async (textOverride?: string) => {
    const query = textOverride || input.trim();
    if (!query || isProcessing) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', response: { text: query } }]);
    setIsProcessing(true);

    // Simulate small processing delay for technical feel
    setTimeout(() => {
      const response = processQuery(query);
      setMessages(prev => [...prev, { role: 'ai', response }]);
      setIsProcessing(false);
    }, 600);
  };

  const handleAction = (action: 'navigate' | 'open_project' | 'open_link', payload: string) => {
    if (action === 'navigate') {
      window.dispatchEvent(new CustomEvent('arya-navigate', { detail: payload }));
      if (window.innerWidth < 1024) setIsOpen(false); // Auto close on mobile
    } else if (action === 'open_project') {
      window.dispatchEvent(new CustomEvent('arya-navigate', { detail: 'projects' }));
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('open-project', { detail: payload }));
      }, 500); // Give time for navigation transition
      if (window.innerWidth < 1024) setIsOpen(false);
    } else if (action === 'open_link') {
      window.open(payload, '_blank');
    }
  };

  const renderProjectCard = (project: Project) => (
    <div key={project.id} className="mt-3 border border-white/10 bg-white/5 rounded-lg p-4 font-mono text-sm relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-1 h-full bg-accentPink"></div>
      <div className="font-bold text-white mb-1 uppercase tracking-wider">{project.title}</div>
      <div className="text-xs text-accentPink mb-3">{Array.isArray(project.category) ? project.category.join(' · ') : project.category}</div>
      <div className="text-gray-400 text-xs mb-4 line-clamp-2">
        {project.features[project.features.length - 1]}
      </div>
      <div className="flex gap-2">
        <button 
          onClick={() => handleAction('open_project', project.id)}
          className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded transition-colors text-xs"
        >
          [ VIEW PROJECT ]
        </button>
        {project.githubLink !== '#' && (
          <button 
            onClick={() => handleAction('open_link', project.githubLink)}
            className="px-3 py-1 bg-white/5 hover:bg-white/10 text-white rounded transition-colors text-xs"
          >
            [ GITHUB ]
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* LAUNCHER */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-12 h-12 md:w-14 md:h-14 bg-black/80 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-md hover:border-accentPink transition-colors group z-[100] shadow-[0_0_20px_rgba(139,92,246,0.15)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-primaryPurple/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
            <span className="font-mono text-accentPink font-bold tracking-widest text-sm relative z-10">&gt;_</span>
            
            {/* Ping indicator */}
            <span className="absolute top-0 right-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accentPink opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accentPink"></span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-0 lg:bottom-6 right-0 lg:right-10 w-full lg:w-[420px] h-[85vh] lg:h-[600px] max-h-[800px] bg-[#0a0a14]/95 backdrop-blur-xl border border-white/10 lg:rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* HEADER */}
            <div className="px-5 py-4 border-b border-white/10 flex justify-between items-start bg-black/40">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
                  <h3 className="font-mono font-bold tracking-widest text-white text-sm">ARYA.AI</h3>
                </div>
                <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Portfolio Intelligence Interface</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => { clearSession(); setMessages([messages[0]]); }}
                  className="text-gray-500 hover:text-white transition-colors text-xs font-mono"
                  title="Clear Session"
                >
                  <i className="fa-solid fa-rotate-right"></i>
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-white transition-colors text-xs"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>

            {/* MESSAGES */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`text-sm ${msg.role === 'user' ? 'text-gray-300 font-sans' : 'text-gray-300 font-mono'} whitespace-pre-wrap leading-relaxed max-w-[90%]`}>
                    {msg.response.text}
                  </div>
                  
                  {/* Action Buttons */}
                  {msg.response.actionButtons && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {msg.response.actionButtons.map((btn, i) => (
                        <button
                          key={i}
                          onClick={() => handleAction(btn.action, btn.payload)}
                          className="px-3 py-1.5 border border-primaryPurple/50 hover:bg-primaryPurple/20 text-accentPink text-[10px] font-mono tracking-widest uppercase rounded transition-colors"
                        >
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Project Cards */}
                  {msg.response.projectCards && (
                    <div className="w-full flex flex-col gap-2 mt-2">
                      {msg.response.projectCards.map(renderProjectCard)}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* WELCOME SUGGESTIONS (only if just 1 message) */}
              {messages.length === 1 && !isProcessing && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2 pt-2"
                >
                  {suggestedPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(prompt)}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-xs text-gray-400 hover:text-white transition-colors text-left"
                    >
                      {prompt}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* PROCESSING STATE */}
              {isProcessing && (
                <div className="flex flex-col items-start font-mono text-xs text-accentPink">
                  <motion.div 
                    animate={{ opacity: [1, 0, 1] }} 
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    &gt; ANALYSING PROJECT DATA...
                  </motion.div>
                </div>
              )}
            </div>

            {/* INPUT */}
            <div className="p-4 bg-black/20 border-t border-white/5">
              <div className="relative flex items-center">
                <span className="absolute left-4 text-accentPink font-mono text-sm">&gt;</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask ARYA.AI..."
                  className="w-full bg-black/40 border border-white/10 rounded-full py-3 pl-8 pr-12 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accentPink/50 transition-colors font-mono"
                  disabled={isProcessing}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || isProcessing}
                  className="absolute right-3 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-accentPink disabled:opacity-50 transition-colors"
                >
                  <i className="fa-solid fa-paper-plane text-sm"></i>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;