import React from 'react';

type LogoProps = {
  variant?: 'horizontal' | 'stacked' | 'icon';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

const Logo: React.FC<LogoProps> = ({ variant = 'horizontal', className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24',
  };

  const svgIcon = (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-auto drop-shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:scale-105 transition-transform duration-500 cursor-pointer"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="neonLogo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>

      <g stroke="url(#neonLogo)" strokeLinecap="round" strokeLinejoin="round">
        {/* Outer System Circle */}
        <circle
          cx="50" cy="50" r="42"
          strokeWidth="4"
          strokeDasharray="214 50"
          transform="rotate(130 50 50)"
        />

        {/* Left Leg */}
        <path d="M 28 68 L 50 18" strokeWidth="5" />
        <circle cx="28" cy="68" r="4.5" fill="url(#neonLogo)" stroke="none" />

        {/* Right Leg (Thicker) */}
        <path d="M 50 18 L 76 75" strokeWidth="12" />

        {/* Crossbar */}
        <path d="M 68 55 L 45 70" strokeWidth="10" />

        {/* Code Symbol </> */}
        <path d="M 41 78 L 34 85 L 41 92" strokeWidth="3.5" />
        <path d="M 53 76 L 47 94" strokeWidth="3.5" />
        <path d="M 59 78 L 66 85 L 59 92" strokeWidth="3.5" />
      </g>
    </svg>
  );

  if (variant === 'icon') {
    return <div className={`${sizeClasses[size]} ${className}`}>{svgIcon}</div>;
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
        <div className={sizeClasses[size]}>{svgIcon}</div>
        <div className="text-center">
          <div className="text-3xl font-black tracking-widest text-white leading-none">
            ARYA<span className="text-accentPink">.OS</span>
          </div>
          <div className="text-[9px] font-bold tracking-[0.3em] text-primaryPurple uppercase mt-2">
            CURIOSITY COMPILED INTO CODE
          </div>
        </div>
      </div>
    );
  }

  // Horizontal (Default)
  return (
    <div className={`flex items-center gap-4 ${className} group cursor-pointer`}>
      <div className={sizeClasses[size]}>{svgIcon}</div>
      <div className="flex flex-col justify-center">
        <div className="text-2xl font-black tracking-[0.15em] text-white leading-none mb-1">
          ARYA<span className="text-accentPink">.OS</span>
        </div>
        <div className="text-[8px] font-bold tracking-[0.3em] text-primaryPurple uppercase">
          CURIOSITY COMPILED INTO CODE
        </div>
      </div>
    </div>
  );
};

export default Logo;
