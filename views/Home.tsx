import React, { useState, MouseEvent, useEffect } from 'react';
import { SectionType } from '../types';

interface HomeProps {
  onNavigate: (section: SectionType) => void;
}

// Typewriter Component for individual character animation
const Typewriter: React.FC<{ text: string; delay?: number; className?: string }> = ({ text, delay = 0, className = "" }) => {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block opacity-0 animate-letter-pop"
          style={{ 
            animationDelay: `${delay + index * 50}ms`, // 50ms stagger per letter
            whiteSpace: 'pre',
            minWidth: char === ' ' ? '0.3em' : 'auto'
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

// ScrambleText Component for "decoding" effect
const ScrambleText: React.FC<{ text: string; className?: string; delay?: number }> = ({ text, className, delay = 0 }) => {
  const [output, setOutput] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?/~';
    let iteration = 0;
    let interval: ReturnType<typeof setInterval>;

    const startScramble = () => {
      interval = setInterval(() => {
        setOutput(
          text
            .split('')
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return symbols[Math.floor(Math.random() * symbols.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3; 
      }, 30);
    };

    const timeout = setTimeout(startScramble, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  const handleHover = () => {
    if (isHovered) return;
    setIsHovered(true);
    
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?/~';
    let iteration = 0;
    
    const interval = setInterval(() => {
        setOutput(
          text
            .split('')
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return symbols[Math.floor(Math.random() * symbols.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          setIsHovered(false);
        }

        iteration += 1; 
      }, 20);
  };

  return (
    <span 
      className={`${className} cursor-default`} 
      onMouseEnter={handleHover}
    >
        {output || text.split('').map(() => '#').join('')}
    </span>
  );
};

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    // Calculate normalized position (-1 to 1) based on screen center
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    setMousePos({ x, y });
  };

  // Calculate distance from center for dynamic central glow intensity (0 to 1, where 0 is center)
  const distFromCenter = Math.min(Math.sqrt(mousePos.x ** 2 + mousePos.y ** 2), 1);
  const glowIntensity = 1 + (1 - distFromCenter) * 0.2; // 1.0 to 1.2 scale

  return (
    <div 
      className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative z-10 pt-20 pb-32 overflow-hidden w-full selection:bg-neonCyan/30"
      onMouseMove={handleMouseMove}
    >
      
      {/* --- Ambient Background Effects --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        
        {/* Mouse Spotlight / Ripple Effect */}
        <div 
           className="absolute inset-0 transition-opacity duration-300"
           style={{
             background: `radial-gradient(circle at ${(mousePos.x + 1) * 50}% ${(mousePos.y + 1) * 50}%, rgba(0, 243, 255, 0.05) 0%, transparent 40%)`,
             mixBlendMode: 'screen'
           }}
        ></div>

        {/* Central Glow - Reacts to mouse proximity */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[800px] bg-gradient-radial from-white/5 to-transparent opacity-40 blur-3xl transition-transform duration-200 ease-out will-change-transform"
          style={{ 
             transform: `translate(calc(-50% + ${mousePos.x * 20}px), calc(-50% + ${mousePos.y * 20}px)) scale(${glowIntensity})` 
          }}
        ></div>
        
        {/* Floating Orbs - Responsive sizing & Interactive Parallax */}
        {/* Purple Orb (Left) */}
        <div 
          className="absolute top-[15%] -left-10 lg:left-[10%] w-56 h-56 lg:w-[500px] lg:h-[500px] bg-neonPurple/5 rounded-full blur-[80px] lg:blur-[100px] animate-pulse-slow pointer-events-auto transition-all duration-700 ease-out hover:bg-neonPurple/20 hover:scale-110 hover:blur-[80px]"
          style={{ 
            transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)` 
          }}
        ></div>

        {/* Cyan Orb (Right) */}
        <div 
          className="absolute bottom-[15%] -right-10 lg:right-[10%] w-56 h-56 lg:w-[500px] lg:h-[500px] bg-neonCyan/5 rounded-full blur-[80px] lg:blur-[100px] animate-pulse-slow pointer-events-auto transition-all duration-700 ease-out hover:bg-neonCyan/20 hover:scale-110 hover:blur-[80px]"
          style={{ 
            animationDelay: '1.5s',
            transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)` 
          }}
        ></div>
        
        {/* Horizon Line - Subtle Tilt */}
        <div 
          className="absolute top-[60%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-500 ease-out opacity-50"
          style={{
            transform: `rotate(${mousePos.x * 1}deg) translateY(${mousePos.y * 10}px)`
          }}
        ></div>
      </div>

      {/* --- Desktop Decorative Elements (Visible on LG and above) --- */}
      
      {/* Left Side: Tech Icons Floating - Parallax Effect & Interactive */}
      <div 
        className="hidden lg:block absolute left-[2%] xl:left-[8%] top-1/2 -translate-y-1/2 w-64 h-[500px] z-10 transition-transform duration-200 ease-out pointer-events-none"
        style={{ transform: `translate(calc(0px + ${mousePos.x * -15}px), calc(-50% + ${mousePos.y * -15}px))` }}
      >
        <div className="relative w-full h-full flex flex-col justify-between py-10 items-center pointer-events-auto">
           {/* Abstract Vertical Line Connection */}
           <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2 pointer-events-none"></div>
           
           <div className="relative bg-black/20 backdrop-blur-sm p-4 rounded-full border border-white/10 animate-float shadow-lg shadow-cyan-500/10 transition-all duration-300 hover:scale-125 hover:border-cyan-400 hover:shadow-cyan-400/50 hover:bg-black/60 cursor-pointer group">
             <i className="fa-brands fa-react text-4xl text-cyan-400 animate-spin-slow group-hover:animate-none"></i>
           </div>
           
           <div className="relative right-12 bg-black/20 backdrop-blur-sm p-3 rounded-xl border border-white/10 animate-float transition-all duration-300 hover:scale-125 hover:border-orange-500 hover:shadow-orange-500/50 hover:bg-black/60 cursor-pointer" style={{ animationDelay: '1s' }}>
             <i className="fa-brands fa-html5 text-3xl text-orange-500"></i>
           </div>

           <div className="relative left-10 bg-black/20 backdrop-blur-sm p-5 rounded-2xl border border-white/10 animate-float transition-all duration-300 hover:scale-125 hover:border-neonPurple hover:shadow-neonPurple/50 hover:bg-black/60 cursor-pointer" style={{ animationDelay: '2s' }}>
              <i className="fa-solid fa-code text-2xl text-neonPurple"></i>
           </div>

           <div className="relative bg-black/20 backdrop-blur-sm p-4 rounded-full border border-white/10 animate-float transition-all duration-300 hover:scale-125 hover:border-yellow-400 hover:shadow-yellow-400/50 hover:bg-black/60 cursor-pointer" style={{ animationDelay: '1.5s' }}>
             <i className="fa-brands fa-js text-4xl text-yellow-400"></i>
           </div>
        </div>
      </div>

      {/* Right Side: Code Snippet Card - 3D Tilt Effect */}
      <div 
        className="hidden lg:block absolute right-[2%] xl:right-[8%] top-1/2 -translate-y-1/2 w-80 perspective-1000 z-10 transition-all duration-300"
        style={{ 
          transform: `translate(0, -50%) rotateY(${mousePos.x * -3}deg) rotateX(${mousePos.y * 3}deg)` 
        }}
      >
        <div className="glass-panel rounded-xl border-white/10 p-5 transform rotate-y-12 rotate-z-2 shadow-2xl hover:rotate-0 hover:scale-105 transition-all duration-500 font-mono text-xs text-left bg-[#0f172a]/80 backdrop-blur-xl border-l-4 border-l-neonPurple group overflow-hidden relative">
          
          {/* Shine effect on hover */}
          <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 transition-all duration-1000 group-hover:left-[200%]"></div>
          
          <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
            <span className="text-gray-500 text-[10px]">dev_profile.ts</span>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
            </div>
          </div>
          <div className="space-y-2 text-gray-300 font-medium leading-relaxed relative z-10">
            <p><span className="text-pink-500">interface</span> <span className="text-yellow-400">Developer</span> <span className="text-white">{`{`}</span></p>
            <p className="pl-4">name: <span className="text-green-400">'Arya'</span>;</p>
            <p className="pl-4">role: <span className="text-green-400">'Frontend Engineer'</span>;</p>
            <p className="pl-4">skills: <span className="text-blue-400">string</span>[];</p>
            <p className="pl-4">loves: <span className="text-blue-400">Coffee</span> | <span className="text-blue-400">Code</span>;</p>
            <p className="text-white">{`}`}</p>
            <p className="mt-4"><span className="text-pink-500">const</span> <span className="text-blue-400">me</span>: <span className="text-yellow-400">Developer</span> = <span className="text-white">{`{`}</span></p>
            <p className="pl-4">name: <span className="text-green-400">"Arya Suryavanshi"</span>,</p>
            <p className="pl-4">skills: [<span className="text-green-400">"React"</span>, <span className="text-green-400">"Flutter"</span>],</p>
            <p className="text-white">{`};`}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-gray-500 relative z-10">
             <i className="fa-solid fa-terminal text-xs"></i>
             <span className="text-[10px] animate-pulse">Compiling...</span>
          </div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto">

        {/* Badge */}
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
          <div className="glass-panel p-1 rounded-full mb-8 inline-block hover:shadow-[0_0_20px_rgba(0,243,255,0.3)] transition-shadow duration-300">
            <span className="bg-gradient-to-r from-neonPurple to-neonCyan text-transparent bg-clip-text px-6 py-2 rounded-full font-bold text-xs md:text-sm uppercase tracking-widest border border-white/10 block bg-black/50 backdrop-blur-md">
              Available for Hire
            </span>
          </div>
        </div>

        {/* Hero Text with Typewriter Effect */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-tight">
          <div className="block mb-2">
            <Typewriter text="Crafting Digital" delay={100} />
          </div>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-glow relative inline-block group cursor-default pb-2">
            <Typewriter text="Experiences." delay={900} />
            
            {/* Glow Effect - Moved behind text (-z-10) to prevent blurring the text itself */}
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10 rounded-xl"></div>
            
            {/* Sparkle decoration */}
            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '1800ms' }}>
              <i className="fa-solid fa-star text-2xl text-yellow-400 absolute -top-4 -right-8 animate-spin-slow opacity-80 hidden md:block"></i>
            </div>
          </span>
        </h1>

        {/* Name with Scramble/Decode Effect */}
        <div className="mb-8 opacity-0 animate-fade-in-up scale-90 md:scale-100" style={{ animationDelay: '1900ms' }}>
          <div className="text-2xl md:text-4xl lg:text-5xl font-mono tracking-tighter text-white">
            <ScrambleText text="Arya Pramod Suryavanshi" delay={2000} className="hover:text-neonCyan transition-colors" />
          </div>
        </div>

        {/* Bio */}
        <div className="max-w-2xl px-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '2000ms' }}>
          <p className="text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed">
            Frontend Developer <span className="text-gray-500 mx-2">|</span> Flutter & React Enthusiast
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto my-6"></div>
          <p className="text-sm md:text-base text-gray-400 font-light tracking-wide uppercase">
            2nd Year ECS Student building pixel-perfect interfaces
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mt-12 w-full max-w-md justify-center opacity-0 animate-fade-in-up px-4" style={{ animationDelay: '2100ms' }}>
          <button
            onClick={() => onNavigate('projects')}
            className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-neonCyan/50 transition-all duration-300 w-full sm:w-auto hover:-translate-y-1"
          >
            <div className="absolute inset-0 w-0 bg-neonCyan/20 transition-all duration-[250ms] ease-out group-hover:w-full opacity-30"></div>
            <span className="relative flex items-center justify-center gap-2 font-semibold tracking-wide">
              See My Work <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </span>
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className="group relative px-8 py-4 bg-neonPurple text-white rounded-xl font-bold shadow-lg shadow-neonPurple/20 hover:shadow-neonPurple/40 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto border border-neonPurple"
          >
            <span className="flex items-center justify-center gap-2 tracking-wide">
              Contact Me <i className="fa-regular fa-paper-plane"></i>
            </span>
          </button>
        </div>
        
        {/* Social Links */}
        <div className="mt-16 lg:mt-24 flex gap-8 text-2xl text-gray-400 opacity-0 animate-fade-in-up" style={{ animationDelay: '2200ms' }}>
          <a href="#" className="hover:text-neonCyan transition-all hover:scale-125 transform p-2 hover:drop-shadow-[0_0_8px_rgba(0,243,255,0.5)]"><i className="fa-brands fa-github"></i></a>
          <a href="#" className="hover:text-neonPurple transition-all hover:scale-125 transform p-2 hover:drop-shadow-[0_0_8px_rgba(188,19,254,0.5)]"><i className="fa-brands fa-linkedin"></i></a>
          <a href="#" className="hover:text-pink-500 transition-all hover:scale-125 transform p-2 hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]"><i className="fa-brands fa-instagram"></i></a>
        </div>

        {/* --- Mobile Only Decorations (Visible below content on small screens) --- */}
        <div className="lg:hidden w-full flex flex-col items-center gap-8 mt-16 opacity-0 animate-fade-in-up" style={{ animationDelay: '2.5s' }}>
          
          {/* Mobile Tech Icons Row */}
          <div className="flex justify-center gap-6">
            <div className="bg-black/20 backdrop-blur-sm p-3 rounded-full border border-white/10 shadow-lg shadow-cyan-500/10">
              <i className="fa-brands fa-react text-2xl text-cyan-400 animate-spin-slow"></i>
            </div>
            <div className="bg-black/20 backdrop-blur-sm p-3 rounded-xl border border-white/10 shadow-lg shadow-orange-500/10">
              <i className="fa-brands fa-html5 text-xl text-orange-500"></i>
            </div>
            <div className="bg-black/20 backdrop-blur-sm p-3 rounded-2xl border border-white/10 shadow-lg shadow-neonPurple/10">
              <i className="fa-solid fa-code text-xl text-neonPurple"></i>
            </div>
            <div className="bg-black/20 backdrop-blur-sm p-3 rounded-full border border-white/10 shadow-lg shadow-yellow-400/10">
              <i className="fa-brands fa-js text-2xl text-yellow-400"></i>
            </div>
          </div>

          {/* Mobile Code Snippet Card */}
          <div className="w-full max-w-[280px] sm:max-w-xs mx-auto">
             <div className="glass-panel rounded-xl border-white/10 p-5 font-mono text-xs text-left bg-[#0f172a]/80 backdrop-blur-xl border-l-4 border-l-neonPurple shadow-xl">
                <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                  <span className="text-gray-500 text-[10px]">dev_profile.ts</span>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                  </div>
                </div>
                <div className="space-y-2 text-gray-300 font-medium leading-relaxed">
                  <p><span className="text-pink-500">interface</span> <span className="text-yellow-400">Dev</span> <span className="text-white">{`{`}</span></p>
                  <p className="pl-4">name: <span className="text-green-400">'Arya'</span>;</p>
                  <p className="pl-4">role: <span className="text-green-400">'Frontend'</span>;</p>
                  <p className="text-white">{`}`}</p>
                  <p className="mt-4"><span className="text-pink-500">const</span> <span className="text-blue-400">me</span>: <span className="text-yellow-400">Dev</span> = <span className="text-white">{`{`}</span></p>
                  <p className="pl-4">name: <span className="text-green-400">"Arya"</span>,</p>
                  <p className="pl-4">skills: [<span className="text-green-400">"React"</span>],</p>
                  <p className="text-white">{`};`}</p>
                </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Home;