import React, { useEffect, useState } from 'react';
import { SectionType } from '../types';

interface NotFoundProps {
  onNavigate: (section: SectionType) => void;
}

const NotFound: React.FC<NotFoundProps> = ({ onNavigate }) => {
  const [isGlitching, setIsGlitching] = useState(true);

  useEffect(() => {
    // Prevent indexing of the 404 page
    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute('content', 'noindex, follow');
    }

    // Handle reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsGlitching(false);
    } else {
      // Glitch effect for 500ms
      const timer = setTimeout(() => {
        setIsGlitching(false);
      }, 500);
      return () => clearTimeout(timer);
    }

    return () => {
      // Revert robots meta when leaving 404
      if (metaRobots) {
        metaRobots.setAttribute('content', 'index, follow');
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-6 relative z-10">
      <div className="max-w-2xl w-full flex flex-col items-center text-center">
        
        {/* Top Header */}
        <div className="font-mono text-accentPink text-sm font-bold tracking-widest mb-8">
          ERROR // 404
        </div>

        {/* 404 Glitch Text */}
        <div className="relative mb-6">
          {/* Node connections background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
            <div className="w-[120%] h-[1px] bg-white/30 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white"></div>
              <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white/50"></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-mono">X</div>
              <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white/50"></div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white"></div>
            </div>
          </div>

          <h1 className="text-8xl md:text-[150px] font-black text-white tracking-tighter leading-none relative">
            <span className={isGlitching ? 'animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-neonCyan via-white to-accentPink translate-x-1' : ''}>
              404
            </span>
            {isGlitching && (
              <span className="absolute inset-0 text-neonCyan -translate-x-2 opacity-70 mix-blend-screen">404</span>
            )}
            {isGlitching && (
              <span className="absolute inset-0 text-accentPink translate-x-2 opacity-70 mix-blend-screen">404</span>
            )}
          </h1>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase mb-12">
          Sector Not Found
        </h2>

        {/* Terminal Output */}
        <div className="w-full max-w-md bg-[#0a0a14]/50 border border-white/10 rounded-xl p-6 font-mono text-left text-sm md:text-base text-gray-400 mb-12 shadow-xl backdrop-blur-sm">
          <div className="mb-2"><span className="text-accentPink">&gt;</span> requested route does not exist</div>
          <div className="mb-2"><span className="text-accentPink">&gt;</span> route lookup failed</div>
          <div className="mb-6"><span className="text-accentPink">&gt;</span> recovery protocol available<span className="animate-pulse">_</span></div>
          
          <div className="flex flex-col gap-1 text-xs md:text-sm">
            <div className="flex"><span className="w-32 text-gray-500">ERROR_CODE</span> <span className="text-red-400">ROUTE_NOT_FOUND</span></div>
            <div className="flex"><span className="w-32 text-gray-500">SYSTEM_STATUS</span> <span className="text-neonCyan">STABLE</span></div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <button
            onClick={() => onNavigate('home')}
            className="group relative px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-mono text-sm uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:-translate-y-1"
          >
            [ Return Home ]
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-primaryPurple to-secondaryPink scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </button>

          <button
            onClick={() => onNavigate('projects')}
            className="px-8 py-4 text-gray-400 hover:text-white font-mono text-sm uppercase tracking-widest transition-colors duration-300"
          >
            [ View Projects ]
          </button>
        </div>

        {/* Footer */}
        <div className="mt-20 font-mono text-xs text-gray-600 uppercase tracking-[0.3em]">
          ARYA.OS // RECOVERY INTERFACE
        </div>

      </div>
    </div>
  );
};

export default NotFound;
