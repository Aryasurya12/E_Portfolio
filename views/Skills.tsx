import React, { useState, useEffect, useRef } from 'react';

interface Skill {
  name: string;
  level: number;
  icon: string;
  desc: string;
  experience: 'Beginner' | 'Advanced' | 'Expert';
}

interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    id: 'programming',
    title: 'Programming',
    icon: 'fa-code',
    skills: [
      { name: 'Python', level: 90, icon: 'fa-brands fa-python', desc: 'Data & backend logic', experience: 'Advanced' },
      { name: 'Java', level: 85, icon: 'fa-brands fa-java', desc: 'Enterprise architecture', experience: 'Advanced' },
      { name: 'JavaScript', level: 95, icon: 'fa-brands fa-js', desc: 'Full-stack engineering', experience: 'Expert' },
      { name: 'C / C++', level: 80, icon: 'fa-solid fa-c', desc: 'System-level hardware', experience: 'Advanced' },
    ]
  },
  {
    id: 'web',
    title: 'Web',
    icon: 'fa-globe',
    skills: [
      { name: 'React', level: 90, icon: 'fa-brands fa-react', desc: 'Component ecosystems', experience: 'Expert' },
      { name: 'HTML / CSS', level: 95, icon: 'fa-brands fa-html5', desc: 'Semantic layouts & styling', experience: 'Expert' },
      { name: 'Node.js', level: 85, icon: 'fa-brands fa-node-js', desc: 'Scalable backend engines', experience: 'Advanced' },
      { name: 'Supabase', level: 80, icon: 'fa-solid fa-database', desc: 'Backend as a service', experience: 'Advanced' },
    ]
  },
  {
    id: 'electronics',
    title: 'Electronics',
    icon: 'fa-microchip',
    skills: [
      { name: 'Sensors', level: 85, icon: 'fa-solid fa-tower-broadcast', desc: 'Environmental telemetry', experience: 'Advanced' },
      { name: 'Microcontrollers', level: 90, icon: 'fa-solid fa-microchip', desc: 'ESP32, Arduino programming', experience: 'Expert' },
      { name: 'IoT', level: 80, icon: 'fa-solid fa-network-wired', desc: 'Connected hardware systems', experience: 'Advanced' },
      { name: 'Circuit Design', level: 85, icon: 'fa-solid fa-bolt', desc: 'PCB Layout & Schematics', experience: 'Advanced' },
    ]
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: 'fa-screwdriver-wrench',
    skills: [
      { name: 'Git', level: 95, icon: 'fa-brands fa-github', desc: 'Version control systems', experience: 'Expert' },
      { name: 'MATLAB', level: 80, icon: 'fa-solid fa-chart-pie', desc: 'Mathematical modeling', experience: 'Advanced' },
      { name: 'AutoCAD', level: 85, icon: 'fa-solid fa-drafting-compass', desc: '2D & 3D technical drawing', experience: 'Advanced' },
      { name: 'Docker', level: 80, icon: 'fa-brands fa-docker', desc: 'Containerized deployment', experience: 'Advanced' },
    ]
  }
];

const RadialMeter: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const [progress, setProgress] = useState(0);
  const size = 46; // Reduced size for compact horizontal layout
  const strokeWidth = 3;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(skill.level);
    }, 400 + index * 100);
    return () => clearTimeout(timer);
  }, [skill.level, index]);

  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3 group/skill relative cursor-default transition-transform duration-300 hover:scale-105">
      {/* Tooltip */}
      <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-32 p-2 rounded-lg glass-panel bg-[#0a0a14] border-white/10 opacity-0 group-hover/skill:opacity-100 transition-all duration-300 scale-90 group-hover/skill:scale-100 pointer-events-none z-50 shadow-2xl hidden md:block">
        <div className="text-[8px] font-black text-accentPink uppercase tracking-widest mb-1">{skill.experience}</div>
        <div className="text-[9px] text-gray-400 leading-tight">{skill.desc}</div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0a0a14] border-r border-b border-white/10 rotate-45" />
      </div>

      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full -rotate-90 relative z-10">
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-white/5"
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="url(#skillGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            style={{
              strokeDashoffset: offset,
              transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>

        {/* Glow effect for hover */}
        <svg className="w-full h-full -rotate-90 absolute top-0 left-0 z-0 opacity-0 group-hover/skill:opacity-100 blur-[4px] transition-opacity duration-300 pointer-events-none">
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="url(#skillGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            style={{ strokeDashoffset: offset }}
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <i className={`${skill.icon} text-xs text-white/40 group-hover/skill:text-accentPink transition-colors duration-500`}></i>
          <span className="text-[7px] font-black tracking-widest text-white/60 group-hover/skill:text-white transition-colors mt-0.5">{progress}%</span>
        </div>
      </div>
      <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest group-hover/skill:text-white transition-colors text-center">{skill.name}</span>
    </div>
  );
};

const Counter: React.FC<{ target: number; duration: number }> = ({ target, duration }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      }
    }, { threshold: 0.5 });

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <div ref={countRef}>{count}+</div>;
};

const Skills: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-40 px-6 max-w-7xl mx-auto relative z-10">
      {/* Background Depth */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primaryPurple/5 blur-[120px] rounded-full animate-blob"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondaryPink/5 blur-[120px] rounded-full animate-blob delay-2000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] contrast-150 brightness-100"></div>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-24 opacity-0 animate-fade-in-up">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white relative inline-block">
          Tech Arsenal
          <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-primaryPurple via-accentPink to-secondaryPink rounded-full shadow-[0_0_20px_rgba(236,72,153,0.5)]" />
        </h2>
        <p className="text-gray-500 mt-8 tracking-[0.3em] font-mono text-[10px] uppercase italic">Monitoring developer capability modules</p>
      </div>

      {/* 4 Category Skills Grid - Horizontal Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-32 md:mb-40">
        {skillCategories.map((category, catIdx) => (
          <div
            key={category.id}
            className="group glass-panel p-6 rounded-3xl border border-white/10 hover:border-accentPink/50 hover:shadow-[0_0_40px_rgba(236,72,153,0.15)] transition-all duration-500 hover:-translate-y-2 animate-fade-in-up bg-[#0a0a14]/60 relative overflow-hidden"
            style={{ animationDelay: `${200 + catIdx * 150}ms` }}
          >
            {/* Subtle radial glow behind card content */}
            <div className="absolute inset-0 bg-gradient-radial from-primaryPurple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="flex items-center gap-3 mb-8 relative z-10 border-b border-white/5 pb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center border border-white/10 shadow-inner group-hover:border-accentPink/30 transition-colors">
                <i className={`fa-solid ${category.icon} text-sm text-accentGlow group-hover:text-accentPink transition-colors duration-300`}></i>
              </div>
              <h3 className="text-sm font-black text-white tracking-wide uppercase">{category.title}</h3>

              {/* Decorative gradient accent underline */}
              <div className="absolute bottom-[-1px] left-0 w-1/3 h-[1px] bg-gradient-to-r from-primaryPurple via-accentPink to-transparent group-hover:w-full transition-all duration-700" />
            </div>

            <div className="grid grid-cols-2 gap-y-6 gap-x-4 relative z-10">
              {category.skills.map((skill, idx) => (
                <RadialMeter key={skill.name} skill={skill} index={catIdx * 4 + idx} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;