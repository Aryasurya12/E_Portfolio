import React, { useEffect, useState } from 'react';

const Background: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position from center to create a subtle offset
      // Dividing by larger numbers reduces the movement scale
      const x = (e.clientX - window.innerWidth / 2) / 40;
      const y = (e.clientY - window.innerHeight / 2) / 40;
      setMousePos({ x, y });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Gradient Blobs with Parallax Wrappers */}
      
      {/* Top Left - Moves down with scroll, reacts inversely to mouse X */}
      <div 
        className="absolute top-[-10%] left-[-20%] md:left-[-10%] will-change-transform transition-transform duration-100 ease-out"
        style={{ 
          transform: `translate3d(${mousePos.x * -1.5}px, calc(${offsetY * 0.2}px + ${mousePos.y * -1.5}px), 0)` 
        }}
      >
        <div className="w-64 h-64 md:w-96 md:h-96 bg-purple-600/30 rounded-full mix-blend-multiply filter blur-[60px] md:blur-3xl opacity-70 animate-blob"></div>
      </div>

      {/* Top Right - Moves up against scroll, follows mouse X */}
      <div 
        className="absolute top-[-5%] right-[-20%] md:top-[-10%] md:right-[-10%] will-change-transform transition-transform duration-100 ease-out"
        style={{ 
          transform: `translate3d(${mousePos.x * 1.2}px, calc(${offsetY * -0.1}px + ${mousePos.y * 1.2}px), 0)` 
        }}
      >
        <div className="w-64 h-64 md:w-96 md:h-96 bg-cyan-600/30 rounded-full mix-blend-multiply filter blur-[60px] md:blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>

      {/* Bottom Left - Moves down with scroll, slight inverse reaction */}
      <div 
        className="absolute -bottom-20 left-[-10%] md:-bottom-32 md:left-20 will-change-transform transition-transform duration-100 ease-out"
        style={{ 
          transform: `translate3d(${mousePos.x * -0.8}px, calc(${offsetY * 0.15}px + ${mousePos.y * -0.8}px), 0)` 
        }}
      >
        <div className="w-64 h-64 md:w-96 md:h-96 bg-pink-600/30 rounded-full mix-blend-multiply filter blur-[60px] md:blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
    </div>
  );
};

export default Background;