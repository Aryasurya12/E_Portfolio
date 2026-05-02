import React, { useState, MouseEvent, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SectionType } from '../types';

interface HomeProps {
  onNavigate: (section: SectionType) => void;
}

// ScrambleText Component for "decoding" effect
const ScrambleText: React.FC<{ text: string; className?: string; delay?: number }> = ({ text, className = "", delay = 0 }) => {
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
    <span className={`${className} cursor-default`} onMouseEnter={handleHover}>
      {output || text.split('').map(() => '#').join('')}
    </span>
  );
};

// Advanced Dynamic Typewriter
const TypewriterRotator: React.FC<{ items: string[]; delay?: number; className?: string; }> = ({ items, delay = 0, className = '' }) => {
  const [text, setText] = useState('');
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    let unmounted = false;
    let loopIndex = 0;
    let isDeleting = false;
    let charIndex = 0;
    let typingTimeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (unmounted) return;
      const current = items[loopIndex % items.length];

      if (isDeleting) {
        setText(current.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setText(current.substring(0, charIndex + 1));
        charIndex++;
      }

      let delta = 80 - Math.random() * 30;

      if (isDeleting) { delta /= 2; }

      if (!isDeleting && charIndex === current.length) {
        delta = 2500; // Pause at full word
        setIsBlinking(true);
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        loopIndex++;
        delta = 500; // Pause before next word
        setIsBlinking(false);
      } else {
        setIsBlinking(false);
      }

      typingTimeout = setTimeout(tick, delta);
    };

    const initialDelay = setTimeout(() => {
      tick();
    }, delay);

    return () => {
      unmounted = true;
      clearTimeout(initialDelay);
      clearTimeout(typingTimeout);
    };
  }, [items, delay]);

  return (
    <span className={className}>
      {text}
      <span className={`inline-block w-[2px] h-[1em] bg-accentGlow ml-1 align-middle transition-opacity duration-100 ${isBlinking ? 'animate-pulse' : ''}`}></span>
    </span>
  );
};

// Particles component
const Particles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 mix-blend-screen">
      {Array.from({ length: 45 }).map((_, i) => {
        const size = Math.random() * 2.5 + 0.5;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const animDuration = 15 + Math.random() * 25;
        const animDelay = Math.random() * 5;
        const color = Math.random() > 0.5 ? '#8b5cf6' : '#ec4899';
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size, height: size, left: `${left}%`, top: `${top}%`,
              backgroundColor: color,
              boxShadow: `0 0 ${size * 2}px ${color}`,
              animation: `float-particle ${animDuration}s linear infinite ${animDelay}s`,
              opacity: Math.random() * 0.7 + 0.2
            }}
          />
        )
      })}
    </div>
  )
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // normalized -1 to 1
  const [rawMousePos, setRawMousePos] = useState({ x: 0, y: 0 }); // for cursor glow
  const [isMobile, setIsMobile] = useState(false);

  const tiltRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)' });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    const handleGlobalMove = (e: globalThis.MouseEvent) => {
      setRawMousePos({ x: e.clientX, y: e.clientY });
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleGlobalMove);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleGlobalMove);
    };
  }, []);

  const handlePhotoHover = (e: MouseEvent<HTMLDivElement>) => {
    if (isMobile || !tiltRef.current) return;
    const rect = tiltRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = x - xc;
    const dy = y - yc;

    const tiltX = (dy / yc) * -12; // 12 deg tilt
    const tiltY = (dx / xc) * 12;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`
    });
  };

  const handlePhotoLeave = () => {
    setTiltStyle({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)' });
  };

  const distFromCenter = Math.min(Math.sqrt(mousePos.x ** 2 + mousePos.y ** 2), 1);
  const glowIntensity = 1 + (1 - distFromCenter) * 0.4;

  const parallaxBg = isMobile ? {} : { transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)` };
  const parallaxFg = isMobile ? {} : { transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)` };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-left px-6 relative z-10 pt-32 pb-40 w-full overflow-hidden cursor-default bg-gradient-to-br from-[#0a0a14] to-[#140a1f]">

      {/* Dynamic Custom Cursor Aura (Desktop Only) */}
      {!isMobile && (
        <div
          className="fixed w-96 h-96 bg-gradient-to-r from-primaryPurple/20 to-secondaryPink/20 rounded-full blur-[120px] pointer-events-none z-50 mix-blend-screen transition-transform duration-300 ease-out"
          style={{ left: rawMousePos.x - 192, top: rawMousePos.y - 192 }}
        />
      )}

      {/* Layer 1: Background (Blobs + Particles) */}
      <Particles />
      <div className="absolute inset-0 pointer-events-none z-0" style={parallaxBg}>
        {/* Central Radial Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[900px] aspect-square bg-gradient-radial from-primaryPurple/10 to-transparent opacity-60 blur-3xl transition-transform duration-300 ease-out"
          style={!isMobile ? { transform: `translate(calc(-50% + ${mousePos.x * 30}px), calc(-50% + ${mousePos.y * 30}px)) scale(${glowIntensity})` } : {}}
        />

        {/* Animated Liquid Blobs */}
        <div className="absolute top-[10%] left-[10%] w-64 h-64 md:w-[400px] md:h-[400px] bg-primaryPurple/15 blur-[60px] md:blur-[80px] animate-blob rounded-full mix-blend-screen" />
        <div className="absolute bottom-[10%] right-[10%] w-72 h-72 md:w-[450px] md:h-[450px] bg-secondaryPink/15 blur-[80px] md:blur-[100px] animate-blob rounded-full mix-blend-screen" style={{ animationDelay: '2s', animationDuration: '9s' }} />
      </div>

      {/* Main Foreground Content */}
      <div className="relative z-20 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto gap-16 lg:gap-8 transition-transform duration-300" style={parallaxFg}>

        {/* LEFT COMPONENT: Text & CTA */}
        <div className="flex-1 w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left shrink-0 order-2 lg:order-1">

          <div className="opacity-0 animate-entry-scale" style={{ animationDelay: '200ms' }}>
            <div className="p-[1px] rounded-full mb-6 inline-block hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-shadow duration-300 bg-gradient-to-r from-primaryPurple to-secondaryPink">
              <span className="bg-gradient-to-r from-accentGlow to-accentPink bg-clip-text px-5 py-1.5 rounded-full font-bold text-[10px] md:text-xs uppercase tracking-widest block bg-[#0a0a14] backdrop-blur-md">
                ⚡ Available for opportunities
              </span>
            </div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-bold mb-6 tracking-tight leading-[1.1]"
            >
              Crafting Intelligent
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryPurple via-secondaryPink to-primaryPurple bg-[length:200%_auto] animate-gradient-shimmer relative inline-block group pb-2">
                Digital Experiences.
                {!isMobile && <div className="absolute -inset-2 bg-gradient-to-r from-primaryPurple/30 to-secondaryPink/30 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10 rounded-xl" />}
              </span>
            </motion.h1>

          <div className="mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <div className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-mono tracking-tighter text-white">
              <ScrambleText text="Arya Pramod Suryavanshi" delay={800} className="hover:text-accentPink transition-all duration-300" />
            </div>
          </div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="max-w-xl mb-10">
              <p className="text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed font-light">
                <TypewriterRotator items={["Electronics & CS Student", "IoT & Hardware Hacker", "AI Integration Specialist"]} delay={1200} />
              </p>
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 font-bold tracking-[0.2em] uppercase mt-4">
                Bridging Hardware, Software, and Artificial Intelligence
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
            <button
              onClick={() => onNavigate('projects')}
              className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-xl border border-primaryPurple/40 hover:border-accentPink transition-all duration-300 w-full sm:w-auto hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(236,72,153,0.4)] backdrop-blur-md"
            >
              <div className="absolute inset-0 w-0 bg-gradient-to-r from-primaryPurple/20 to-secondaryPink/20 transition-all duration-500 ease-out group-hover:w-full opacity-50" />
              <span className="relative flex items-center justify-center gap-2 font-bold tracking-widest text-[10px] uppercase text-white">
                See My Work <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </span>
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="group relative px-8 py-4 bg-gradient-to-r from-primaryPurple to-secondaryPink text-white rounded-xl font-bold shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_40px_rgba(236,72,153,0.7)] hover:scale-[1.03] transition-all duration-300 w-full sm:w-auto overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
              <span className="flex items-center justify-center gap-2 tracking-widest text-[10px] uppercase">
                Contact Me <i className="fa-regular fa-paper-plane group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
              </span>
            </button>
          </div>

          <div className="mt-12 flex gap-8 text-2xl text-gray-500 opacity-0 animate-fade-in-up" style={{ animationDelay: '1200ms' }}>
            <a href="#" className="hover:text-primaryPurple transition-all hover:scale-125 transform"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="hover:text-secondaryPink transition-all hover:scale-125 transform"><i className="fa-brands fa-linkedin"></i></a>
            <a href="#" className="hover:text-white transition-all hover:scale-125 transform"><i className="fa-brands fa-instagram"></i></a>
          </div>

        </div>

        {/* RIGHT COMPONENT: Glowing 3D Glass Profile */}
        <div
          className="w-full lg:w-1/2 flex items-center justify-center relative order-1 lg:order-2 opacity-0 animate-entry-slide-right min-h-[300px] md:min-h-[450px]"
          style={{ animationDelay: '600ms' }}
        >
          {/* High Intensity Gradient Halo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 lg:w-[480px] lg:h-[480px] bg-gradient-to-tr from-primaryPurple/60 via-secondaryPink/40 to-transparent blur-[60px] md:blur-[80px] animate-blob rounded-full z-0 opacity-80" />

          <div
            ref={tiltRef}
            onMouseMove={handlePhotoHover}
            onMouseLeave={handlePhotoLeave}
            className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-[2rem] p-[2px] bg-gradient-to-tr from-primaryPurple via-white/10 to-secondaryPink shadow-[0_0_50px_rgba(139,92,246,0.4)] transition-all duration-500 ease-out group"
            style={tiltStyle}
          >
            {/* Profile Photo Wrapper */}
            <div className="w-full h-full rounded-[1.8rem] overflow-hidden relative bg-[#0a0a14]/90 backdrop-blur-2xl">
              <img src="/profile.png" alt="Arya Profile" className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.15]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14]/80 via-transparent to-transparent" />
            </div>

            {/* Small Code Snippet Card (Desktop Only) */}
            {!isMobile && (
              <div className="absolute -bottom-8 -left-12 glass-panel rounded-xl border border-primaryPurple/30 p-4 font-mono text-xs text-left bg-[#0a0a14]/80 backdrop-blur-3xl shadow-[0_0_30px_rgba(236,72,153,0.3)] animate-float z-20">
                <div className="flex gap-2 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                </div>
                <div className="space-y-1.5 text-gray-300">
                  <p><span className="text-secondaryPink">import</span> <span className="text-white">{'{'}</span> <span className="text-accentGlow">Innovation</span> <span className="text-white">{'}'}</span> <span className="text-secondaryPink">from</span> <span className="text-green-300">'@arya/mind'</span>;</p>
                  <p className="mt-2"><span className="text-primaryPurple">await</span> <span className="text-accentPink">Innovation</span>.execute();<span className="inline-block w-1.5 h-3 bg-white ml-1 animate-pulse align-middle"></span></p>
                </div>
              </div>
            )}

            {/* Tech Icon Floating Badge (Desktop Only) */}
            {!isMobile && (
              <div className="absolute -top-6 -right-6 bg-[#140a1f]/80 backdrop-blur-xl p-4 rounded-xl border border-secondaryPink/40 shadow-[0_0_20px_rgba(236,72,153,0.3)] animate-float" style={{ animationDelay: '1s' }}>
                <i className="fa-brands fa-react text-3xl text-accentGlow animate-[spin_10s_linear_infinite]"></i>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 animate-[fadeIn_1s_ease-out_forwards]" style={{ animationDelay: '2000ms' }}>
        <div className="flex flex-col items-center gap-2 text-primaryPurple animate-bounce">
          <span className="text-[10px] tracking-[0.4em] uppercase font-black text-accentGlow">Discover</span>
          <div className="w-px h-10 bg-gradient-to-b from-primaryPurple to-transparent"></div>
        </div>
      </div>

      <style>{`
        @keyframes float-particle {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
        }
        @keyframes gradient-shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-shimmer {
          animation: gradient-shimmer 4s ease infinite;
        }
        @keyframes entry-scale {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-entry-scale {
          animation: entry-scale 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        @keyframes entry-slide-right {
          0% { opacity: 0; transform: translateX(40px) scale(0.9); filter: blur(10px); }
          100% { opacity: 1; transform: translateX(0) scale(1); filter: blur(0px); }
        }
        .animate-entry-slide-right {
          animation: entry-slide-right 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Home;