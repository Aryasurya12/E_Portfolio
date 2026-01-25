import React, { useState, useEffect } from 'react';

interface Skill {
  name: string;
  level: number;
  icon: string;
  fullMark: number;
}

interface SkillCategory {
  id: 'frontend' | 'mobile' | 'core';
  title: string;
  icon: string;
  colorClass: string;
  hexColor: string;
  skills: Skill[];
}

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  icon: string;
  colorClass: string;
  hoverBorderClass: string;
  link: string;
}

const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: 'fa-laptop-code',
    colorClass: 'text-neonCyan',
    hexColor: '#00f3ff',
    skills: [
      { name: 'HTML5', level: 95, icon: 'fa-brands fa-html5', fullMark: 100 },
      { name: 'CSS3', level: 95, icon: 'fa-brands fa-css3-alt', fullMark: 100 },
      { name: 'JS', level: 90, icon: 'fa-brands fa-js', fullMark: 100 },
      { name: 'React', level: 85, icon: 'fa-brands fa-react', fullMark: 100 },
      { name: 'Tailwind', level: 90, icon: 'fa-solid fa-wind', fullMark: 100 },
      { name: 'Figma', level: 80, icon: 'fa-brands fa-figma', fullMark: 100 },
    ]
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    icon: 'fa-mobile-screen',
    colorClass: 'text-neonPurple',
    hexColor: '#bc13fe',
    skills: [
      { name: 'Flutter', level: 85, icon: 'fa-solid fa-feather-pointed', fullMark: 100 },
      { name: 'Dart', level: 80, icon: 'fa-solid fa-bullseye', fullMark: 100 },
      { name: 'Firebase', level: 75, icon: 'fa-solid fa-fire', fullMark: 100 },
      { name: 'UI/UX', level: 85, icon: 'fa-solid fa-pen-nib', fullMark: 100 },
    ]
  },
  {
    id: 'core',
    title: 'Core & Tools',
    icon: 'fa-server',
    colorClass: 'text-pink-500',
    hexColor: '#ec4899',
    skills: [
      { name: 'Python', level: 75, icon: 'fa-brands fa-python', fullMark: 100 },
      { name: 'Git', level: 85, icon: 'fa-brands fa-git-alt', fullMark: 100 },
      { name: 'GitHub', level: 85, icon: 'fa-brands fa-github', fullMark: 100 },
      { name: 'VS Code', level: 90, icon: 'fa-solid fa-code', fullMark: 100 },
    ]
  }
];

const certificates: Certificate[] = [
  {
    id: 'gcp-genai',
    title: 'Generative AI Fundamentals',
    issuer: 'Google Cloud',
    date: 'Sep 2024',
    icon: 'fa-brands fa-google',
    colorClass: 'text-blue-400',
    hoverBorderClass: 'hover:border-blue-400/50',
    link: '#'
  },
  {
    id: 'meta-frontend',
    title: 'Meta Front-End Developer',
    issuer: 'Coursera',
    date: 'Dec 2024',
    icon: 'fa-brands fa-meta',
    colorClass: 'text-blue-500',
    hoverBorderClass: 'hover:border-blue-500/50',
    link: '#'
  },
  {
    id: 'flutter-bootcamp',
    title: 'The Complete Flutter Bootcamp',
    issuer: 'Udemy',
    date: 'Aug 2024',
    icon: 'fa-solid fa-mobile-screen-button',
    colorClass: 'text-neonCyan',
    hoverBorderClass: 'hover:border-neonCyan/50',
    link: '#'
  }
];

// --- Custom Radar Chart Component ---
const RadarChartSVG: React.FC<{ 
  skills: Skill[]; 
  hexColor: string; 
  size?: number 
}> = ({ skills, hexColor, size = 300 }) => {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const radius = size / 2 - 40; // Leave padding for labels
  const center = size / 2;
  const numScales = 4;
  const angleStep = (Math.PI * 2) / skills.length;

  const getCoordinates = (value: number, index: number, maxRadius: number) => {
    const angle = index * angleStep - Math.PI / 2; // Start from top
    return {
      x: center + (maxRadius * (value / 100)) * Math.cos(angle),
      y: center + (maxRadius * (value / 100)) * Math.sin(angle)
    };
  };

  const levels = Array.from({ length: numScales }, (_, i) => (i + 1) * (100 / numScales));

  // Construct polygon path string
  const dataPoints = skills.map((skill, i) => getCoordinates(skill.level, i, radius));
  const polyPath = dataPoints.map((p, i) => (i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`)).join(' ') + ' Z';

  // Background polygon (100%)
  const fullPoints = skills.map((_, i) => getCoordinates(100, i, radius));
  const fullPath = fullPoints.map((p, i) => (i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`)).join(' ') + ' Z';

  return (
    <div className="relative flex justify-center items-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Shape */}
        <path d={fullPath} fill={hexColor} fillOpacity="0.05" stroke="none" />

        {/* Grid Circles (Polygons) */}
        {levels.map((level, i) => {
          const levelPoints = skills.map((_, idx) => getCoordinates(level, idx, radius));
          const path = levelPoints.map((p, idx) => (idx === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`)).join(' ') + ' Z';
          return (
            <path 
              key={i} 
              d={path} 
              fill="transparent" 
              stroke="rgba(255,255,255,0.1)" 
              strokeWidth="1" 
              className="transition-opacity duration-1000"
              style={{ opacity: mounted ? 1 : 0 }}
            />
          );
        })}

        {/* Axes */}
        {skills.map((_, i) => {
          const end = getCoordinates(100, i, radius);
          return (
            <line 
              key={i} 
              x1={center} 
              y1={center} 
              x2={end.x} 
              y2={end.y} 
              stroke="rgba(255,255,255,0.1)" 
              strokeWidth="1" 
            />
          );
        })}

        {/* Data Polygon with Entrance Animation */}
        <g className={`transition-all duration-1000 ease-out origin-center ${mounted ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
            <path 
            d={polyPath} 
            fill={hexColor} 
            fillOpacity="0.3" 
            stroke={hexColor} 
            strokeWidth="2" 
            className="drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]"
            />
            
            {/* Interactive Points in the same group to scale with it */}
            {skills.map((skill, i) => {
                const pointPos = getCoordinates(skill.level, i, radius); 
                return (
                    <circle 
                    key={i}
                    cx={pointPos.x} 
                    cy={pointPos.y} 
                    r="4" 
                    fill={hexColor}
                    className="transition-all duration-300 hover:r-6 cursor-pointer hover:stroke-white hover:stroke-2"
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    />
                );
            })}
        </g>

        {/* Labels (Static) */}
        {skills.map((skill, i) => {
          const pos = getCoordinates(115, i, radius); // Label position
          
          // Calculate text alignment based on position
          const isLeft = pos.x < center - 10;
          const isRight = pos.x > center + 10;
          const textAnchor = isLeft ? 'end' : isRight ? 'start' : 'middle';
          
          return (
             <text 
                key={i}
                x={pos.x} 
                y={pos.y} 
                fill="#9ca3af" 
                fontSize="11" 
                fontWeight="600" 
                textAnchor={textAnchor}
                dominantBaseline="middle"
                className="uppercase tracking-wider"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
              >
                {skill.name}
              </text>
          );
        })}
      </svg>
      
      {/* Tooltip */}
      {hoveredSkill && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 animate-fade-in-up">
           <div className="glass-panel px-4 py-3 rounded-xl border border-white/20 shadow-2xl backdrop-blur-xl bg-black/80 flex flex-col items-center min-w-[100px]">
              <span className="text-white font-bold text-sm tracking-wide mb-1">{hoveredSkill.name}</span>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: hexColor }}></div>
                 <span className="text-lg font-mono font-bold" style={{ color: hexColor }}>{hoveredSkill.level}%</span>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const Skills: React.FC = () => {
  const [viewMode, setViewMode] = useState<'chart' | 'list'>('chart');

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 max-w-6xl mx-auto relative z-10">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-neonCyan to-neonPurple animate-fade-in-up">
        Technical Arsenal
      </h2>
      <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        A comprehensive collection of tools, technologies, and frameworks I use to bring digital ideas to life.
      </p>

      {/* View Toggle */}
      <div className="flex justify-center mb-12 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
        <div className="bg-white/5 p-1 rounded-full border border-white/10 flex relative">
          <button
            onClick={() => setViewMode('chart')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
              viewMode === 'chart' 
                ? 'bg-neonPurple text-white shadow-lg shadow-neonPurple/20' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <i className="fa-solid fa-chart-radar"></i> Chart
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
              viewMode === 'list' 
                ? 'bg-neonCyan text-black shadow-lg shadow-neonCyan/20' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <i className="fa-solid fa-list-ul"></i> List
          </button>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {skillCategories.map((category, index) => (
          <div 
            key={category.id}
            className="glass-panel rounded-2xl p-6 border-white/5 hover:border-white/20 transition-all duration-300 animate-fade-in-up group hover:-translate-y-1 flex flex-col"
            style={{ animationDelay: `${200 + index * 100}ms` }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${category.colorClass} border border-white/5`}>
                <i className={`fa-solid ${category.icon} text-lg`}></i>
              </div>
              <h3 className="text-xl font-bold text-white">{category.title}</h3>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center">
              {viewMode === 'chart' ? (
                <div className="w-full flex justify-center py-4">
                  <RadarChartSVG 
                    skills={category.skills} 
                    hexColor={category.hexColor}
                    size={280}
                  />
                </div>
              ) : (
                <div className="w-full space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-1 text-sm">
                        <span className="text-gray-300 flex items-center gap-2">
                          <i className={`${skill.icon} w-4 text-center text-gray-500`}></i> 
                          {skill.name}
                        </span>
                        <span className="text-gray-500 font-mono text-xs">{skill.level}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-700/30 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ease-out`}
                          style={{ 
                            width: `${skill.level}%`,
                            backgroundColor: category.hexColor
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Certificates Section */}
      <div className="animate-fade-in-up" style={{ animationDelay: '500ms' }}>
        <h3 className="text-3xl font-bold mb-8 text-center text-white flex items-center justify-center gap-3">
          <i className="fa-solid fa-award text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]"></i>
          Certifications & Achievements
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div 
              key={cert.id}
              className={`glass-panel p-6 rounded-2xl flex flex-col items-center text-center hover:bg-white/5 transition-all duration-300 hover:scale-105 border border-white/5 ${cert.hoverBorderClass} group`}
            >
              <div className={`w-16 h-16 rounded-full bg-white/5 flex items-center justify-center ${cert.colorClass} text-3xl mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-black/20`}>
                <i className={cert.icon}></i>
              </div>
              
              <h4 className="text-lg font-bold text-white mb-1 group-hover:text-white transition-colors">{cert.title}</h4>
              <p className="text-gray-400 text-sm mb-1">{cert.issuer}</p>
              <span className="text-xs text-gray-500 font-mono mb-4 block border border-white/10 px-2 py-0.5 rounded bg-black/20">{cert.date}</span>
              
              <a 
                href={cert.link}
                className={`mt-auto text-sm font-semibold ${cert.colorClass} opacity-80 hover:opacity-100 flex items-center gap-1 group/link`}
              >
                View Credential <i className="fa-solid fa-external-link-alt text-xs transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"></i>
              </a>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Skills;