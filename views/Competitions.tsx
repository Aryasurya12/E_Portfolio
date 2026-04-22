import React from 'react';

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

const CompetitionCard: React.FC<{ comp: Competition; index: number }> = ({ comp, index }) => {
  return (
    <div 
      className="glass-panel p-8 rounded-[2rem] border-white/10 hover:border-accentPink transition-all duration-500 animate-fade-in-up group relative overflow-hidden"
      style={{ animationDelay: `${200 + index * 150}ms` }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accentPink/10 to-transparent rounded-bl-[4rem]" />
      
      <div className="flex items-start gap-5 mb-8 relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl text-accentPink shadow-[0_0_20px_rgba(236,72,153,0.2)] group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all">
          <i className={comp.icon}></i>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-2xl font-black text-white group-hover:text-accentPink transition-colors">{comp.name}</h3>
            <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/10 h-fit">{comp.date}</span>
          </div>
          <p className="text-gray-400 font-mono tracking-tighter uppercase text-[10px] mt-1">{comp.organizer}</p>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        <div className={`flex items-center gap-2 font-black uppercase tracking-tighter text-sm ${comp.statusColor}`}>
           <i className="fa-solid fa-medal animate-pulse"></i>
           {comp.status}
        </div>
        <p className="text-gray-300 text-sm leading-relaxed font-light">
          {comp.description}
        </p>

        {comp.rounds && (
          <div className="p-5 bg-white/5 rounded-2xl border border-white/5 space-y-4">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-500">
               <span>System Progress</span>
               <span className="text-accentGlow">{comp.rounds.filter(r => r.passed).length}/{comp.rounds.length} Modules Passed</span>
            </div>
            <div className="flex gap-2">
               {comp.rounds.map((r, i) => (
                 <div key={i} className={`h-2 flex-1 rounded-full transition-all duration-[1s] ${r.passed ? 'bg-gradient-to-r from-primaryPurple via-accentPink to-secondaryPink shadow-[0_0_10px_rgba(236,72,153,0.3)]' : 'bg-white/10'}`} />
               ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-4">
          {comp.tags.map(tag => (
            <span key={tag} className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 text-gray-500 border border-white/5 rounded-full hover:border-accentPink transition-colors cursor-default">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Interactive Bottom Accent */}
      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primaryPurple via-accentPink to-secondaryPink w-0 group-hover:w-full transition-all duration-1000 ease-in-out" />
    </div>
  );
};

const Competitions: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-40 px-6 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16 opacity-0 animate-fade-in-up">
        <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primaryPurple via-accentPink to-secondaryPink inline-flex items-center gap-4">
           Systems History
        </h2>
        <p className="text-gray-400 mt-6 tracking-[0.25em] font-mono text-xs uppercase">Decyphering competitive milestones and achievements</p>
        <div className="w-32 h-1 bg-gradient-to-r from-primaryPurple to-secondaryPink mx-auto mt-6 rounded-full opacity-60" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
        {competitions.map((comp, index) => (
          <CompetitionCard key={comp.id} comp={comp} index={index} />
        ))}
      </div>

      {/* Interactive Visual Filler */}
      <div className="mt-24 p-12 glass-panel rounded-[3rem] border-white/5 flex flex-col items-center justify-center text-center animate-fade-in-up" style={{ animationDelay: '800ms' }}>
         <i className="fa-solid fa-trophy text-6xl text-accentPink opacity-20 mb-6" />
         <h3 className="text-3xl font-black text-white/40 uppercase tracking-widest">More Missions In Progress</h3>
      </div>
    </div>
  );
};

export default Competitions;