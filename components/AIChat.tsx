import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { SectionType } from '../types';

// Add type definitions for Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface AIChatProps {
  currentSection?: SectionType;
}

const AIChat: React.FC<AIChatProps> = ({ currentSection = 'home' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: "System Online. I am Arya's portfolio assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Text-to-Speech Logic
  const speak = (text: string) => {
    if (isMuted || !window.speechSynthesis) return;
    
    // Cancel any current speech
    window.speechSynthesis.cancel();

    // Strip markdown symbols and URLs for smoother speech
    const cleanText = text
      .replace(/!\[.*?\]\(.*?\)/g, 'I have generated an image for you.') // Replace images with text
      .replace(/```[\s\S]*?```/g, 'Here is the code snippet you requested.') // Replace code blocks
      .replace(/[*`#]/g, ''); // Remove formatting chars
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.pitch = 1;
    utterance.rate = 1.1;
    
    // Try to find a good English voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google US English')) || voices.find(v => v.lang === 'en-US');
    if (preferredVoice) utterance.voice = preferredVoice;

    window.speechSynthesis.speak(utterance);
  };

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSendMessage(transcript); // Auto-send on voice
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const handleSendMessage = async (textOverride?: string) => {
    const userMessage = textOverride || input.trim();
    if (!userMessage || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      // Context-Aware Prompt Construction
      const contextPrompt = `
        Current User Context: The user is currently viewing the "${currentSection}" section of the portfolio.
        
        System Instructions:
        You are Arya's Advanced AI Assistant.
        
        1. **Context Awareness**: 
           - If in 'Projects', mention details about EduNexus or CodeQuest.
           - If in 'Contact', encourage using the form.
           - If in 'Skills', discuss React, Flutter, or Python.
           
        2. **Capabilities**:
           - **Images**: If the user asks for an image, a design, or a mockup, generate a markdown image link using Picsum. 
             Format: \`![Description](https://picsum.photos/seed/{keyword}/400/300)\`. Replace {keyword} with a relevant term (e.g., tech, nature, code).
           - **Code**: If asked for code, provide clean, commented snippets wrapped in standard markdown code blocks (\`\`\`).
        
        3. **Personality**:
           - Keep responses concise (max 3 sentences) unless explaining code.
           - Tone: Professional, futuristic, helpful.
        
        Arya's Info:
        - Role: Frontend & Mobile Developer (Student).
        - Tech: React, Flutter, Python, Tailwind, Supabase.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
            { role: 'user', parts: [{ text: contextPrompt + "\n\nUser Query: " + userMessage }]}
        ],
      });

      const aiResponse = response.text || "I'm having trouble accessing my database.";
      
      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
      speak(aiResponse);

    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "Connection interrupted. Please check your API key." }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to render message with Code Blocks and Images
  const renderMessage = (text: string) => {
    // Split by code blocks first
    const parts = text.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      // Check if this part is a code block
      if (part.startsWith('```') && part.endsWith('```')) {
        const codeContent = part.replace(/```\w*\n?/, '').replace(/```$/, '');
        return (
          <div key={index} className="bg-black/50 p-3 rounded-lg my-2 overflow-x-auto border border-white/10 group relative">
             <div className="absolute top-2 right-2 flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
             </div>
             <pre className="text-xs font-mono text-neonCyan pt-4">
               <code>{codeContent.trim()}</code>
             </pre>
          </div>
        );
      }

      // Process regular text for Markdown Images (![alt](url))
      // We split regular text by image regex
      const imageRegex = /!\[(.*?)\]\((.*?)\)/g;
      const textParts = part.split(imageRegex);
      
      if (textParts.length > 1) {
          const elements = [];
          let lastIndex = 0;
          
          // matchAll isn't fully supported in all TS configs, using simple exec loop or split logic
          // A simpler way with split: 
          // split results: [text, alt, url, text, alt, url, ...]
          for (let i = 0; i < textParts.length; i += 3) {
              // Push text
              if (textParts[i]) elements.push(<span key={`text-${index}-${i}`}>{textParts[i]}</span>);
              
              // Push Image if it exists
              if (i + 2 < textParts.length) {
                  const alt = textParts[i+1];
                  const url = textParts[i+2];
                  elements.push(
                      <div key={`img-${index}-${i}`} className="my-3 rounded-xl overflow-hidden border border-white/20 shadow-lg">
                          <img src={url} alt={alt} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
                          <div className="bg-black/40 p-1 text-[10px] text-center text-gray-400 font-mono">{alt}</div>
                      </div>
                  );
              }
          }
          return <span key={index}>{elements}</span>;
      }

      return <span key={index}>{part}</span>;
    });
  };

  return (
    <>
      {/* Floating Toggle Button - Moved down to match navbar alignment */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-4 sm:right-6 z-[70] w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-neonPurple to-neonCyan flex items-center justify-center shadow-lg shadow-neonCyan/20 transition-all duration-300 group border border-white/20 ${isOpen ? 'rotate-90 scale-0 opacity-0' : 'scale-100 opacity-100 hover:scale-110'}`}
      >
        <i className="fa-solid fa-robot text-xl text-white"></i>
        {!isOpen && (
             <span className="absolute -top-10 right-0 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] text-neonCyan font-bold uppercase tracking-widest border border-neonCyan/20 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            AI Assistant
            </span>
        )}
      </button>

      {/* Chat Window - Adjusted Layout to prevent cutoff */}
      {/* Used bottom-24 to sit above where the toggle button was, max-h ensures it fits on screen */}
      <div 
        className={`fixed bottom-24 right-4 sm:right-6 z-[70] w-[calc(100vw-2rem)] sm:w-[400px] h-[550px] max-h-[calc(100vh-150px)] glass-panel rounded-3xl border-neonCyan/20 shadow-2xl flex flex-col overflow-hidden bg-[#0f172a]/95 transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'}`}
      >
          {/* Header */}
          <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neonCyan/10 flex items-center justify-center text-neonCyan border border-neonCyan/30 relative">
                <i className="fa-solid fa-brain text-sm"></i>
                {isListening && (
                    <span className="absolute inset-0 rounded-full border-2 border-neonCyan animate-ping"></span>
                )}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white leading-none mb-1">Arya-Bot v2.0</h4>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 font-mono">
                        Context: <span className="text-neonPurple uppercase">{currentSection}</span>
                    </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
                <button 
                    onClick={() => {
                        window.speechSynthesis.cancel();
                        setIsMuted(!isMuted);
                    }} 
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isMuted ? 'text-gray-500 hover:text-white' : 'text-neonCyan bg-neonCyan/10'}`}
                    title={isMuted ? "Unmute Voice" : "Mute Voice"}
                >
                    <i className={`fa-solid ${isMuted ? 'fa-volume-xmark' : 'fa-volume-high'} text-xs`}></i>
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors border border-transparent hover:border-white/10"
                >
                  <i className="fa-solid fa-xmark text-sm"></i>
                </button>
            </div>
          </div>

          {/* Messages Container */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-black/20">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-neonPurple/20 border border-neonPurple/30 text-white rounded-tr-none shadow-lg shadow-neonPurple/5' 
                    : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
                }`}>
                  {msg.role === 'ai' ? renderMessage(msg.text) : msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-fade-in-up">
                <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex gap-2 items-center">
                  <span className="text-[10px] text-gray-400 font-mono">Thinking</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-neonCyan rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-neonCyan rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1 h-1 bg-neonCyan rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  </div>
                </div>
              </div>
            )}
            {isListening && (
                 <div className="flex justify-end animate-fade-in-up">
                    <div className="bg-neonCyan/10 border border-neonCyan/30 px-4 py-2 rounded-2xl rounded-tr-none flex items-center gap-2">
                        <div className="w-2 h-2 bg-neonCyan rounded-full animate-pulse"></div>
                        <span className="text-xs text-neonCyan font-bold">Listening...</span>
                    </div>
                 </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white/5 border-t border-white/10 shrink-0">
            <div className="relative flex gap-2">
               <button
                onClick={toggleListening}
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                    isListening 
                    ? 'bg-red-500/20 text-red-500 border-red-500/50 animate-pulse' 
                    : 'bg-white/5 text-gray-400 border-white/10 hover:text-neonCyan hover:border-neonCyan/30'
                }`}
                title="Speak"
              >
                <i className={`fa-solid ${isListening ? 'fa-microphone-lines' : 'fa-microphone'} text-sm`}></i>
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={isListening ? "Listening..." : "Type or speak..."}
                disabled={isListening}
                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-neonCyan/50 transition-colors disabled:opacity-50"
              />
              
              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || isListening}
                className="w-10 h-10 rounded-xl bg-neonCyan/20 text-neonCyan flex items-center justify-center hover:bg-neonCyan hover:text-black transition-all disabled:opacity-50 border border-neonCyan/20"
              >
                <i className="fa-solid fa-paper-plane text-xs"></i>
              </button>
            </div>
            <div className="flex justify-between items-center mt-2 px-1">
                <p className="text-[9px] text-gray-500 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Gemini-3 Flash • Voice Enabled
                </p>
            </div>
          </div>
      </div>
    </>
  );
};

export default AIChat;