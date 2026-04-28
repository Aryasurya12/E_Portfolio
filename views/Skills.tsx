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
    id: 'frontend',
    title: 'Frontend Tech',
    icon: 'fa-laptop-code',
    skills: [
      { name: 'React', level: 90, icon: 'fa-brands fa-react', desc: 'Component architecture & state management', experience: 'Expert' },
      { name: 'Next.js', level: 85, icon: 'fa-solid fa-n', desc: 'SSR, ISR & modern routing', experience: 'Advanced' },
      { name: 'Tailwind', level: 95, icon: 'fa-solid fa-wind', desc: 'Rapid utility-first UI design', experience: 'Expert' },
      { name: 'TypeScript', level: 85, icon: 'fa-solid fa-t', desc: 'Type-safe system scaling', experience: 'Advanced' },
    ]
  },
  {
    id: 'mobile',
    title: 'Mobile Systems',
    icon: 'fa-mobile-screen',
    skills: [
      { name: 'Flutter', level: 90, icon: 'fa-solid fa-feather-pointed', desc: 'Cross-platform native experiences', experience: 'Expert' },
      { name: 'Dart', level: 85, icon: 'fa-solid fa-bullseye', desc: 'Reactive programming & async logic', experience: 'Advanced' },
      { name: 'Firebase', level: 80, icon: 'fa-solid fa-fire', desc: 'Real-time database & auth flows', experience: 'Advanced' },
    ]
  },
  {
    id: 'backend',
    title: 'Backend & AI',
    icon: 'fa-server',
    skills: [
      { name: 'Node.js', level: 80, icon: 'fa-brands fa-node-js', desc: 'Scalable runtime environments', experience: 'Advanced' },
      { name: 'Python', level: 85, icon: 'fa-brands fa-python', desc: 'Data analysis & system automation', experience: 'Advanced' },
      { name: 'Gemini AI', level: 90, icon: 'fa-solid fa-brain', desc: 'LLM integration & prompt engineering', experience: 'Expert' },
    ]
  }
];

const RadialMeter: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const [progress, setProgress] = useState(0);
  const size = 70; // Slightly smaller for better fit on small screens
  const strokeWidth = 5;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(skill.level);
    }, 800 + index * 100);
    return () => clearTimeout(timer);
  }, [skill.level, index]);

  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3 group relative cursor-default">
      {/* Tooltip - Adjusted for mobile */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 p-3 rounded-xl glass-panel bg-[#0a0a14] border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 pointer-events-none z-50 shadow-2xl hidden md:block">
        <div className="text-[9px] font-black text-accentPink uppercase tracking-widest mb-1">{skill.experience}</div>
        <div className="text-[10px] text-gray-400 leading-tight">{skill.desc}</div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0a0a14] border-r border-b border-white/10 rotate-45" />
      </div>

      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full -rotate-90">
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
        <div className="absolute inset-0 flex flex-col items-center justify-center">
           <i className={`${skill.icon} text-base text-white/40 group-hover:text-accentPink transition-colors duration-500`}></i>
           <span className="text-[9px] font-mono text-white/60 group-hover:text-white transition-colors">{progress}%</span>
        </div>
      </div>
      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors text-center">{skill.name}</span>
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
        <h2 className="text-4xl sm:text-5xl md:text-8xl font-black text-white relative inline-block">
          Tech Arsenal
          <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-primaryPurple via-accentPink to-secondaryPink rounded-full shadow-[0_0_20px_rgba(236,72,153,0.5)]" />
        </h2>
        <p className="text-gray-500 mt-8 tracking-[0.3em] font-mono text-[10px] uppercase italic">Monitoring developer capability modules</p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-32 md:mb-40">
        {skillCategories.map((category, catIdx) => (
          <div 
            key={category.id}
            className="glass-panel p-8 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border-white/10 hover:border-accentPink/40 transition-all duration-700 animate-fade-in-up bg-[#0a0a14]/60 relative overflow-hidden"
            style={{ animationDelay: `${200 + catIdx * 150}ms` }}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                <i className={`fa-solid ${category.icon} text-2xl md:text-3xl text-accentGlow`}></i>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white">{category.title}</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-y-10 gap-x-2">
              {category.skills.map((skill, idx) => (
                <RadialMeter key={skill.name} skill={skill} index={catIdx * 6 + idx} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* SECTION 5: STACK FLOW */}
      <div className="mb-32 md:mb-40">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tighter">Stack Flow Architecture</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primaryPurple to-secondaryPink mx-auto rounded-full" />
        </div>

        <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border-white/10 bg-[#0a0a14]/40 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-between min-w-[700px] md:min-w-0 md:w-full relative py-6">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -translate-y-1/2 z-0" />
            
            {[
              { label: 'Frontend', icon: 'fa-desktop', color: 'bg-primaryPurple' },
              { label: 'API Gateway', icon: 'fa-network-wired', color: 'bg-accentPink' },
              { label: 'Logic Kernel', icon: 'fa-microchip', color: 'bg-accentGlow' },
              { label: 'Data Hub', icon: 'fa-database', color: 'bg-secondaryPink' },
              { label: 'AI Engine', icon: 'fa-brain', color: 'bg-white' }
            ].map((node, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center gap-4 group">
                <div className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl ${node.color} flex items-center justify-center shadow-2xl border-2 md:border-4 border-[#0a0a14] group-hover:scale-110 transition-transform duration-500`}>
                  <i className={`fa-solid ${node.icon} text-lg md:text-2xl ${i === 4 ? 'text-[#0a0a14]' : 'text-white'}`}></i>
                </div>
                <span className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors text-center">{node.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 6: SYSTEM ARCHITECTURE CARD */}
      <div className="glass-panel p-10 md:p-20 rounded-[2.5rem] md:rounded-[4rem] border-white/5 flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-16 relative overflow-hidden group">
         <div className="absolute inset-0 bg-gradient-to-r from-primaryPurple/5 to-secondaryPink/5 opacity-50" />
         
         <div className="space-y-6 text-center lg:text-left relative z-10">
            <h3 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase tracking-tighter">
               Architecting <br className="hidden md:block" />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryPurple via-accentPink to-secondaryPink">Resilient Systems</span>
            </h3>
            <p className="text-gray-500 max-w-lg text-sm md:text-lg font-light leading-relaxed">
               My stack is engineered for performance, scalability, and cinematic user experiences. Every module is synchronized for maximum operational efficiency.
            </p>
         </div>

         <div className="flex flex-wrap justify-center gap-8 md:gap-16 lg:gap-24 relative z-10">
            <div className="text-center space-y-2">
               <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10 group-hover:border-accentPink/50 transition-colors">
                  <i className="fa-solid fa-code-branch text-xl md:text-2xl text-accentPink"></i>
               </div>
               <div className="text-4xl md:text-6xl font-black text-white">
                  <Counter target={30} duration={2000} />
               </div>
               <div className="text-[8px] md:text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">Deployments</div>
            </div>
            <div className="text-center space-y-2">
               <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10 group-hover:border-accentGlow/50 transition-colors">
                  <i className="fa-solid fa-microchip text-xl md:text-2xl text-accentGlow"></i>
               </div>
               <div className="text-4xl md:text-6xl font-black text-white">
                  <Counter target={12} duration={2000} />
               </div>
               <div className="text-[8px] md:text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">Architecture Hubs</div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Skills;