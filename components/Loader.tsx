import React, { useEffect, useRef, useState } from 'react';

interface LoaderProps {
  onStartFadeOut: () => void;
  onComplete: () => void;
}

export default function Loader({ onStartFadeOut, onComplete }: LoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [skip, setSkip] = useState(false);

  // Text Animation States
  const [textLines, setTextLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [progress, setProgress] = useState(0);

  const lines = [
    "> Initializing Arya.OS_",
    "> Loading Modules...",
    "PROGRESS_BAR",
    "> Web Systems ✓\n> AI Engine ✓\n> Automation Layer ✓\n> UI Renderer ✓",
    "> Training Interface...\n> Optimizing Experience...",
    "> Launching Interface..."
  ];

  useEffect(() => {
    let unmounted = false;
    
    const runSequence = async () => {
      await new Promise(r => setTimeout(r, 150)); // Initial pause
      
      for (let i = 0; i < lines.length; i++) {
        if (unmounted || skip) return;
        setCurrentLineIndex(i);
        
        if (lines[i] === "PROGRESS_BAR") {
          for(let p = 0; p <= 100; p += 10) { // faster progress
            if (unmounted || skip) return;
            setProgress(p);
            await new Promise(r => setTimeout(r, 15));
          }
          if (unmounted || skip) return;
          setTextLines(prev => [...prev, "PROGRESS_BAR"]);
        } else {
          const lineText = lines[i];
          let typed = "";
          // To save time, type chunks or much faster
          for(let c = 0; c < lineText.length; c++) {
            if (unmounted || skip) return;
            typed += lineText[c];
            setTypingText(typed);
            await new Promise(r => setTimeout(r, 5 + Math.random() * 5)); // 5-10ms per char
          }
          if (unmounted || skip) return;
          setTextLines(prev => [...prev, lineText]);
          setTypingText("");
          await new Promise(r => setTimeout(r, 100)); // Pause after line
        }
      }

      if (!unmounted && !skip) {
        finishSequence();
      }
    };

    runSequence();
    
    return () => {
      unmounted = true;
    };
  }, [skip]);

  const finishSequence = () => {
    setIsFadingOut(true);
    onStartFadeOut();
    setTimeout(() => {
      onComplete();
    }, 800); // 800ms fade/zoom out transition
  };

  const handleSkip = () => {
    if (isFadingOut) return;
    setSkip(true);
    finishSequence();
  };

  // Canvas Network Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    const isMobile = width < 768;
    const numNodes = isMobile ? 35 : 80;
    
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseRadius: number;
      pulseRate: number;
      pulseAngle: number;
    }

    const nodes: Node[] = Array.from({ length: numNodes }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      baseRadius: Math.random() * 1.5 + 0.5,
      radius: 0,
      pulseRate: Math.random() * 0.05 + 0.02,
      pulseAngle: Math.random() * Math.PI * 2
    }));

    let animationFrameId: number;

    const render = () => {
      // Dark background with deep purple gradient effect via drawing
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#0a0a14');
      gradient.addColorStop(1, '#140a1f');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw nodes and lines
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        node.pulseAngle += node.pulseRate;
        node.radius = node.baseRadius + Math.sin(node.pulseAngle) * 0.5;

        // Subtle glowing effect using shadow
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#8b5cf6';
        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(0.1, node.radius), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${0.6 + Math.sin(node.pulseAngle) * 0.4})`;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset for lines

        // Connections
        for (let j = i + 1; j < nodes.length; j++) {
          const neighbor = nodes[j];
          const dx = neighbor.x - node.x;
          const dy = neighbor.y - node.y;
          const distSq = dx * dx + dy * dy;
          const maxDist = isMobile ? 120 : 180;
          
          if (distSq < maxDist * maxDist) {
            const distance = Math.sqrt(distSq);
            // Adding a dynamic ripple effect based on distance and time
            const time = Date.now() / 1000;
            const ripple = Math.sin(distance * 0.05 - time * 2) * 0.5 + 0.5;
            
            const baseOpacity = 1 - distance / maxDist;
            const opacity = baseOpacity * (0.3 + ripple * 0.3); // occasional pulse
            
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(neighbor.x, neighbor.y);
            // Deep neon purple line
            ctx.strokeStyle = i % 2 === 0 ? `rgba(139, 92, 246, ${opacity})` : `rgba(236, 72, 153, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const renderProgressBar = (prog: number) => {
    const validProg = Math.min(100, Math.max(0, prog));
    const blocksWidth = 20; 
    const blocks = Math.floor((validProg / 100) * blocksWidth);
    const emptyBlocks = blocksWidth - blocks;
    return `[${'█'.repeat(blocks)}${'░'.repeat(emptyBlocks)}] ${validProg}%`;
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer overflow-hidden ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      onClick={handleSkip}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />
      
      {/* Flash effect overlay when transitioning */}
      <div 
        className={`absolute inset-0 bg-white/10 z-10 transition-opacity duration-300 pointer-events-none mix-blend-overlay ${
          isFadingOut ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Terminal Container */}
      <div className="z-20 p-6 md:p-8 rounded-2xl glass-panel md:border border-purple-500/20 md:bg-[#0f0f1a]/40 bg-transparent backdrop-blur-sm max-w-2xl w-full min-h-[360px] flex flex-col justify-end mx-4 shadow-[0_0_40px_rgba(139,92,246,0.1)] transition-transform duration-500">
        <div className="font-mono text-sm md:text-base text-purple-200 leading-relaxed tracking-wide">
          {textLines.map((line, idx) => (
            <div key={idx} className="mb-2 opacity-90 whitespace-pre-wrap translate-y-0 animate-fade-in-up">
              {line === "PROGRESS_BAR" ? (
                <span className="text-secondaryPink font-bold drop-shadow-[0_0_10px_rgba(236,72,153,0.6)]">
                  {renderProgressBar(100)}
                </span>
              ) : (
                <span>{line}</span>
              )}
            </div>
          ))}
          
          {/* Active typing line */}
          {currentLineIndex < lines.length && (
            <div className="mb-2 opacity-100 whitespace-pre-wrap">
              {lines[currentLineIndex] === "PROGRESS_BAR" ? (
                <span className="text-secondaryPink font-bold drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]">
                  {renderProgressBar(progress)}
                </span>
              ) : (
                <span>
                  {typingText}
                  <span className="inline-block w-2 bg-secondaryPink ml-1 animate-pulse">|</span>
                </span>
              )}
            </div>
          )}
        </div>
        
        {/* Subtle skip prompt */}
        <div className="absolute bottom-4 right-6 text-[10px] text-white/30 uppercase tracking-widest pointer-events-none animate-pulse-slow">
          Click anywhere to skip
        </div>
      </div>
    </div>
  );
}
