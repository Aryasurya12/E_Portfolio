import React, { useState } from 'react';

// --- DATA MODELS ---
interface Competition {
  id: string;
  name: string;
  organizer: string;
  date: string;
  status: string;
  statusColor: string;
  description: string;
  tags: string[];
  icon: string;
  category: 'achievement' | 'participation';
  rounds?: { name: string; passed: boolean }[];
}

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  status: string;
  description: string;
  tags: string[];
  icon: string;
  link?: string;
}

const competitions: Competition[] = [
  {
    id: 'sih-2025',
    name: 'Smart India Hackathon 2025',
    organizer: 'Govt. of India',
    date: 'Dec 2024',
    status: 'Grand Finalist',
    statusColor: 'text-yellow-400',
    description: 'Developed "EduNexus", a smart attendance system. Qualified through internal college rounds and regional selection to reach the grand finale.',
    tags: ['National', 'Flutter', 'Innovation'],
    icon: 'fa-solid fa-flag-checkered',
    category: 'achievement',
    rounds: [
      { name: 'Internal Round', passed: true },
      { name: 'Idea Submission', passed: true },
      { name: 'Grand Finale', passed: true }
    ]
  },
  {
    id: 'hack-init',
    name: 'HackInit 2.0',
    organizer: 'CodeChef Chapter',
    date: 'Oct 2024',
    status: 'Top 10 Team',
    statusColor: 'text-accentPink',
    description: 'Built an AI-based study planner in a 24-hour sprint. Competed against 50+ teams and cleared the intense evaluation rounds to pitch in the final showcase.',
    tags: ['24h Sprint', 'AI/ML', 'React'],
    icon: 'fa-solid fa-stopwatch',
    category: 'achievement',
    rounds: [
      { name: 'Quiz Qualifier', passed: true },
      { name: 'Prototype Phase', passed: true },
      { name: 'Final Pitch', passed: true }
    ]
  },
  {
    id: 'tech-quest',
    name: 'TechQuest 2024',
    organizer: 'College Tech Fest',
    date: 'March 2024',
    status: 'Runner Up',
    statusColor: 'text-gray-300',
    description: 'A debugging and logic building competition. Cleared multiple elimination rounds to secure the 2nd position among 150+ participants.',
    tags: ['Debugging', 'Logic', 'Campus'],
    icon: 'fa-solid fa-bug-slash',
    category: 'achievement',
    rounds: [
      { name: 'Prelims', passed: true },
      { name: 'Semi-Finals', passed: true },
      { name: 'Finals', passed: true }
    ]
  },
  {
    id: 'code-for-good',
    name: 'Code For Good',
    organizer: 'JP Morgan Chase',
    date: 'Aug 2024',
    status: 'Round 2 Qualified',
    statusColor: 'text-primaryPurple',
    description: 'Participated in the coding challenge series. Successfully cleared the Data Structures & Algorithms coding round with a 100% test case pass rate.',
    tags: ['Competitive Coding', 'DSA', 'Java'],
    icon: 'fa-solid fa-code-branch',
    category: 'participation',
    rounds: [
      { name: 'Coding Round', passed: true },
      { name: 'Hackathon Round', passed: false }
    ]
  },
];

const certifications: Certification[] = [
  {
    id: 'aws-cp',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'Jan 2025',
    status: 'Certified',
    description: 'Validated overall understanding of the AWS Cloud platform, covering basic cloud concepts, security, and architecture.',
    tags: ['Cloud', 'AWS', 'Architecture'],
    icon: 'fa-brands fa-aws',
    link: '#'
  },
  {
    id: 'meta-frontend',
    title: 'Meta Front-End Developer',
    issuer: 'Coursera / Meta',
    date: 'Nov 2024',
    status: 'Completed',
    description: 'Comprehensive professional certificate covering React, UI/UX principles, and advanced JavaScript engineering.',
    tags: ['React', 'Frontend', 'UI/UX'],
    icon: 'fa-brands fa-meta',
    link: '#'
  },
  {
    id: 'gcp-engineer',
    title: 'Google Cloud Engineer',
    issuer: 'Google',
    date: 'Sep 2024',
    status: 'In Progress',
    description: 'Currently preparing for the associate cloud engineer certification focusing on GCP infrastructure deployment.',
    tags: ['GCP', 'Cloud', 'DevOps'],
    icon: 'fa-brands fa-google',
    link: '#'
  }
];

// --- COMPONENTS ---

const HighlightCard: React.FC<{ comp: Competition; inTimeline?: boolean }> = ({ comp, inTimeline }) => (
  <div className={`relative group w-full ${!inTimeline ? 'max-w-4xl mx-auto mb-20 opacity-0 animate-fade-in-up' : ''}`} style={!inTimeline ? { animationDelay: '200ms' } : {}}>
    {/* Animated Background Glow */}
    <div className="absolute inset-0 bg-gradient-to-r from-primaryPurple via-accentPink to-secondaryPink rounded-[2rem] blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-700 animate-pulse" />
    
    <div className="relative glass-panel p-6 md:p-8 rounded-[2rem] border border-white/20 bg-[#0a0a14]/80 backdrop-blur-2xl flex flex-col xl:flex-row gap-6 items-center overflow-hidden transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(236,72,153,0.3)]">
      {/* Decorative Ribbon */}
      <div className="absolute -right-12 top-8 bg-gradient-to-r from-accentPink to-secondaryPink text-white text-[10px] font-black uppercase tracking-[0.3em] py-2 px-16 rotate-45 shadow-[0_0_20px_rgba(236,72,153,0.5)]">
        Featured
      </div>

      <div className="w-20 h-20 shrink-0 rounded-full bg-gradient-to-tr from-primaryPurple to-accentPink p-[2px]">
        <div className="w-full h-full rounded-full bg-[#0a0a14] flex items-center justify-center">
          <i className={`${comp.icon} text-3xl text-transparent bg-clip-text bg-gradient-to-tr from-primaryPurple to-accentPink`} />
        </div>
      </div>
      
      <div className="flex-1 text-center xl:text-left z-10">
        <div className="flex flex-col xl:flex-row xl:items-center gap-2 mb-2">
          <h3 className="text-2xl font-black text-white">{comp.name}</h3>
          <span className="text-[10px] font-mono text-gray-400 bg-white/10 px-3 py-1 rounded-full border border-white/10 w-fit mx-auto xl:mx-0">
            {comp.date}
          </span>
        </div>
        <p className={`text-xs font-black uppercase tracking-widest mb-3 ${comp.statusColor}`}>
          <i className="fa-solid fa-trophy mr-2"></i>{comp.status}
        </p>
        <p className="text-gray-300 leading-relaxed font-light mb-4 text-xs md:text-sm">
          {comp.description}
        </p>
        <div className="flex flex-wrap gap-2 justify-center xl:justify-start">
          {comp.tags.map(tag => (
            <span key={tag} className="text-[9px] font-bold uppercase tracking-widest px-3 py-1 bg-white/5 text-white border border-white/10 rounded-lg shadow-inner">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const TimelineNode = () => (
  <div className="absolute left-[-5px] md:left-[-33px] top-8 w-4 h-4 rounded-full bg-[#0a0a14] border-[3px] border-accentPink shadow-[0_0_15px_#ec4899] group-hover:scale-150 group-hover:bg-accentPink transition-all duration-300 z-20" />
);

const JourneyCard: React.FC<{ item: any; type: 'hackathon' | 'cert'; index: number }> = ({ item, type, index }) => {
  const isHackathon = type === 'hackathon';
  
  return (
    <div className="relative pl-6 md:pl-0 w-full group opacity-0 animate-fade-in-up" style={{ animationDelay: `${400 + index * 150}ms` }}>
      <TimelineNode />
      
      <div className="glass-panel p-6 rounded-2xl border-white/10 hover:border-accentPink/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(236,72,153,0.3)] bg-gradient-to-b from-white/[0.03] to-transparent relative overflow-hidden">
        {/* Glow Hover effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primaryPurple/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div className="flex items-center gap-3">
             <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isHackathon ? 'bg-primaryPurple/20 text-primaryPurple' : 'bg-secondaryPink/20 text-secondaryPink'}`}>
                <i className={`${item.icon} text-lg`}></i>
             </div>
             <div>
               <h4 className="text-lg md:text-xl font-black text-white leading-tight group-hover:text-accentPink transition-colors">{item.title || item.name}</h4>
               <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{item.organizer || item.issuer} • {item.date}</p>
             </div>
          </div>
          
          {!isHackathon && item.link && (
            <a href={item.link} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-colors group/link" title="View Certificate">
               <i className="fa-solid fa-arrow-up-right-from-square text-[10px] group-hover/link:scale-110 transition-transform"></i>
            </a>
          )}
        </div>

        <div className="space-y-4 relative z-10">
          <p className={`text-[10px] font-black uppercase tracking-widest ${item.statusColor || (item.status === 'Certified' ? 'text-green-400' : 'text-accentPink')}`}>
             {item.status}
          </p>
          <p className="text-xs text-gray-400 leading-relaxed">
            {item.description}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-2">
             {item.tags.map((tag: string) => (
               <span key={tag} className="text-[8px] font-black uppercase tracking-wider px-2 py-1 bg-black/40 text-gray-400 border border-white/5 rounded-md">
                 {tag}
               </span>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Competitions: React.FC = () => {
  const featured = competitions.find(c => c.id === 'sih-2025');
  const remainingHackathons = competitions.filter(c => c.id !== 'sih-2025');

  return (
    <div className="min-h-screen pt-32 pb-40 px-6 max-w-7xl mx-auto relative z-10">
      
      {/* Background Enhancements */}
      <div className="absolute top-1/4 left-0 w-full h-[500px] bg-gradient-radial from-primaryPurple/5 to-transparent blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-full h-[500px] bg-gradient-radial from-secondaryPink/5 to-transparent blur-[100px] pointer-events-none" />

      {/* Hero Section */}
      <div className="text-center mb-24 opacity-0 animate-fade-in-up">
        <h2 className="text-5xl md:text-7xl font-black text-white relative inline-block">
          Systems History
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accentPink to-transparent opacity-80" />
        </h2>
        <p className="text-gray-400 mt-8 tracking-[0.3em] font-mono text-xs md:text-sm uppercase animate-pulse">
           Decyphering competitive milestones & certifications
        </p>
      </div>

      {/* Dual Timeline Structure */}
      <div className="flex flex-col md:flex-row gap-12 md:gap-8 lg:gap-16 max-w-5xl mx-auto mt-20">
        
        {/* LEFT COLUMN: Hackathons */}
        <div className="flex-1 relative">
           <div className="mb-10 flex items-center gap-3">
              <i className="fa-solid fa-code text-primaryPurple text-xl"></i>
              <h3 className="text-2xl font-black text-white tracking-widest uppercase">Missions</h3>
           </div>
           
           {/* Timeline Track */}
           <div className="absolute left-[3px] md:left-[-25px] top-[70px] bottom-0 w-[2px] bg-white/5">
              <div className="w-full h-1/2 bg-gradient-to-b from-primaryPurple via-accentPink to-transparent animate-pulse" />
           </div>

           <div className="space-y-10">
              {featured && (
                <div className="relative pl-6 md:pl-0 w-full group opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                  <TimelineNode />
                  <HighlightCard comp={featured} inTimeline={true} />
                </div>
              )}
              {remainingHackathons.map((comp, i) => (
                 <JourneyCard key={comp.id} item={comp} type="hackathon" index={i + 1} />
              ))}
           </div>
        </div>

        {/* RIGHT COLUMN: Certifications */}
        <div className="flex-1 relative mt-16 md:mt-0">
           <div className="mb-10 flex items-center gap-3">
              <i className="fa-solid fa-certificate text-secondaryPink text-xl"></i>
              <h3 className="text-2xl font-black text-white tracking-widest uppercase">Credentials</h3>
           </div>
           
           {/* Timeline Track */}
           <div className="absolute left-[3px] md:left-[-25px] top-[70px] bottom-0 w-[2px] bg-white/5">
              <div className="w-full h-1/2 bg-gradient-to-b from-secondaryPink via-primaryPurple to-transparent animate-pulse" />
           </div>

           <div className="space-y-10">
              {certifications.map((cert, i) => (
                 <JourneyCard key={cert.id} item={cert} type="cert" index={i + remainingHackathons.length} />
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default Competitions;