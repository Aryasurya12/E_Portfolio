import React, { useState, useEffect } from 'react';

interface Skill {
  name: string;
  level: number;
  icon: string;
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
      { name: 'HTML5', level: 95, icon: 'fa-brands fa-html5' },
      { name: 'CSS3', level: 95, icon: 'fa-brands fa-css3-alt' },
      { name: 'React', level: 90, icon: 'fa-brands fa-react' },
      { name: 'Next.js', level: 85, icon: 'fa-solid fa-n' },
      { name: 'Tailwind', level: 90, icon: 'fa-solid fa-wind' },
      { name: 'TypeScript', level: 85, icon: 'fa-solid fa-t' },
    ]
  },
  {
    id: 'mobile',
    title: 'Mobile Systems',
    icon: 'fa-mobile-screen',
    skills: [
      { name: 'Flutter', level: 90, icon: 'fa-solid fa-feather-pointed' },
      { name: 'Dart', level: 85, icon: 'fa-solid fa-bullseye' },
      { name: 'Firebase', level: 80, icon: 'fa-solid fa-fire' },
      { name: 'Native Android', level: 70, icon: 'fa-brands fa-android' },
    ]
  },
  {
    id: 'backend',
    title: 'Backend & AI',
    icon: 'fa-server',
    skills: [
      { name: 'Node.js', level: 80, icon: 'fa-brands fa-node-js' },
      { name: 'Python', level: 85, icon: 'fa-brands fa-python' },
      { name: 'Supabase', level: 85, icon: 'fa-solid fa-database' },
      { name: 'Gemini AI', level: 90, icon: 'fa-solid fa-brain' },
    ]
  }
];

const SkillBar: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(skill.level);
    }, 500 + index * 100);
    return () => clearTimeout(timer);
  }, [skill.level, index]);

  return (
    <div className="space-y-2 group">
      <div className="flex justify-between items-center px-1">
        <span className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2">
          <i className={`${skill.icon} text-accentPink`}></i>
          {skill.name}
        </span>
        <span className="text-accentGlow font-mono text-xs">{skill.level}%</span>
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
        <div 
          className="h-full bg-gradient-to-r from-primaryPurple to-secondaryPink transition-all duration-[1.5s] ease-out relative"
          style={{ width: `${width}%` }}
        >
          {/* Animated glow on the bar */}
          <div className="absolute top-0 right-0 h-full w-4 bg-white/40 blur-sm animate-sweep" />
        </div>
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-40 px-6 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-20 opacity-0 animate-fade-in-up">
        <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primaryPurple via-accentPink to-secondaryPink">
          Tech Arsenal
        </h2>
        <p className="text-gray-400 mt-6 tracking-[0.2em] font-mono text-xs uppercase">Decyphering my technical capabilities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, catIdx) => (
          <div 
            key={category.id}
            className="glass-panel p-8 rounded-[2rem] border-white/10 hover:border-accentPink/50 transition-all duration-500 animate-fade-in-up group flex flex-col h-full bg-[#0a0a14]/40"
            style={{ animationDelay: `${200 + catIdx * 150}ms` }}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primaryPurple/20 to-secondaryPink/20 flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                <i className={`fa-solid ${category.icon} text-2xl text-accentGlow group-hover:scale-110 transition-transform`}></i>
              </div>
              <h3 className="text-2xl font-black text-white group-hover:text-accentPink transition-colors">{category.title}</h3>
            </div>

            <div className="space-y-8 flex-1">
              {category.skills.map((skill, idx) => (
                <SkillBar key={skill.name} skill={skill} index={catIdx * 6 + idx} />
              ))}
            </div>

            <div className="mt-12 pt-6 border-t border-white/5">
               <div className="text-[10px] text-gray-500 font-mono flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span>Module Synchronized</span>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative glass elements */}
      <div className="mt-32 glass-panel p-10 rounded-[3rem] border-white/5 flex flex-col md:flex-row items-center justify-between gap-12 bg-gradient-to-r from-primaryPurple/5 to-secondaryPink/5 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
         <div className="space-y-4 text-center md:text-left">
            <h3 className="text-3xl font-black text-white">System Architecture</h3>
            <p className="text-gray-400 max-w-md">Specializing in building robust, high-performance systems with clean code and futuristic interfaces.</p>
         </div>
         <div className="flex gap-12 text-center">
            <div>
               <div className="text-4xl font-black text-accentPink">30+</div>
               <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Projects</div>
            </div>
            <div>
               <div className="text-4xl font-black text-accentGlow">12+</div>
               <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Systems</div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Skills;