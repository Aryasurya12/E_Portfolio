import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(true);

  // Interaction States
  const [hoverState, setHoverState] = useState<'default' | 'clickable' | 'text' | 'drag'>('default');
  const [isClicking, setIsClicking] = useState(false);

  // Global Mouse Positions
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Media query to detect fine pointer (mouse/trackpad) vs coarse (touch)
    const checkMobile = () => {
      const match = window.matchMedia('(pointer: coarse)');
      setIsMobile(match.matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Enable custom cursor styles globally
    document.body.classList.add('custom-cursor-active');

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      
      // The inner dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Determine hover context
      const isClickable = target.closest('a') || target.closest('button') || target.closest('.cursor-pointer') || target.closest('[role="button"]') || target.tagName.toLowerCase() === 'input';
      
      const isText = !isClickable && (
        target.tagName.toLowerCase() === 'p' || 
        target.tagName.toLowerCase() === 'h1' || 
        target.tagName.toLowerCase() === 'h2' || 
        target.tagName.toLowerCase() === 'h3' || 
        target.tagName.toLowerCase() === 'span' ||
        target.tagName.toLowerCase() === 'li'
      );
      
      if (isClickable) {
        setHoverState('clickable');
      } else if (isText) {
        setHoverState('text');
      } else {
        setHoverState('default');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver, true);

    // High-performance animation loop for the outer ring
    let animationFrameId: number;
    const render = () => {
      // Lerp for smooth trailing effect
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver, true);
      cancelAnimationFrame(animationFrameId);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isMobile]);

  if (isMobile) return null;

  // Styling based on state
  const dotClasses = `
    fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[10000]
    bg-gradient-to-tr from-[#8B5CF6] to-[#EC4899]
    transition-all duration-300 ease-out
    ${isClicking ? 'scale-50' : 'scale-100'}
    ${hoverState === 'clickable' ? 'opacity-0 scale-0' : 'opacity-100'}
    ${hoverState === 'text' ? 'scale-50' : ''}
    shadow-[0_0_10px_rgba(236,72,153,0.8)]
  `;

  const ringClasses = `
    fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999]
    border-[1.5px] border-[#8B5CF6]/50
    transition-all duration-300 ease-out
    ${isClicking ? 'scale-75 bg-[#8B5CF6]/10' : 'scale-100'}
    ${hoverState === 'clickable' ? 'w-12 h-12 border-[#EC4899] shadow-[0_0_20px_rgba(236,72,153,0.4)] bg-[#EC4899]/5' : ''}
    ${hoverState === 'text' ? 'w-6 h-6 border-white/30' : ''}
  `;

  return (
    <>
      {/* 
        Inject styles to hide native cursor globally, 
        but only when the custom cursor is active.
      */}
      <style>{`
        body.custom-cursor-active,
        body.custom-cursor-active * {
          cursor: none !important;
        }
      `}</style>
      <div ref={ringRef} className={ringClasses} style={{ willChange: 'transform' }} />
      <div ref={dotRef} className={dotClasses} style={{ willChange: 'transform' }} />
    </>
  );
};

export default CustomCursor;
