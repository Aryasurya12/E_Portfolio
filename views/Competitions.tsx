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
    statusColor: 'text-neonCyan',
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
    statusColor: 'text-neonPurple',
    description: 'Participated in the coding challenge series. Successfully cleared the Data Structures & Algorithms coding round with a 100% test case pass rate.',
    tags: ['Competitive Coding', 'DSA', 'Java'],
    icon: 'fa-solid fa-code-branch',
    category: 'participation',
    rounds: [
      { name: 'Coding Round', passed: true },
      { name: 'Hackathon Round', passed: false }
    ]
  },
  {
    id: 'flipkart-grid',
    name: 'Flipkart GRiD 6.0',
    organizer: 'Flipkart',
    date: 'July 2024',
    status: 'Level 2 Qualified',
    statusColor: 'text-orange-400',
    description: 'Software Development Challenge. Cleared the initial quiz round assessing technical knowledge to qualify for the problem statement phase.',
    tags: ['Challenge', 'Logic'],
    icon: 'fa-brands fa-searchengin',
    category: 'participation',
    rounds: [
      { name: 'Level 1 Quiz', passed: true },
      { name: 'Level 2 Submission', passed: false }
    ]
  }
];

const Competitions: React.FC = () => {
  const achievements = competitions.filter(c => c.category === 'achievement');
  const participations = competitions.filter(c => c.category === 'participation');

  const renderCard = (comp: Competition, index: number) => (
    <div 
      key={comp.id}
      className="glass-panel rounded-3xl p-6 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 animate-fade-in-up flex flex-col h-full hover:shadow-[0_0_30px_rgba(0,243,255,0.15)]"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-[100px] transition-all duration-500 group-hover:from-white/10"></div>
      
      <div className="flex items-start gap-4 mb-4 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl text-white shadow-inner group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300 shrink-0">
          <i className={comp.icon}></i>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-xl font-bold text-white group-hover:text-neonCyan transition-colors truncate">{comp.name}</h3>
            <span className="text-xs font-mono text-gray-500 border border-white/10 px-2 py-1 rounded bg-black/20 shrink-0">{comp.date}</span>
          </div>
          <p className="text-sm text-gray-400 font-medium">{comp.organizer}</p>
        </div>
      </div>

      <div className="mb-6 relative z-10 flex-1">
        <div className={`text-sm font-bold mb-2 flex items-center gap-2 ${comp.statusColor}`}>
          <i className="fa-solid fa-medal animate-pulse"></i> {comp.status}
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">
          {comp.description}
        </p>
      </div>

      {comp.rounds && (
          <div className="mb-6 bg-black/40 rounded-xl p-4 border border-white/5 mt-auto shadow-inner">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-500 uppercase font-black tracking-widest">Progress Trace</span>
              <span className="text-[10px] text-neonPurple font-mono bg-neonPurple/10 px-2 py-0.5 rounded border border-neonPurple/20">
                {comp.rounds.filter(r => r.passed).length}/{comp.rounds.length} COMPLETED
              </span>
            </div>
            <div className="flex gap-1.5 h-1.5 w-full mb-1">
              {comp.rounds.map((round, rIndex) => (
                <div 
                  key={rIndex} 
                  className={`h-full flex-1 rounded-full transition-all duration-500 ${round.passed ? 'bg-gradient-to-r from-neonCyan to-neonPurple shadow-[0_0_8px_#00f3ff]' : 'bg-gray-800'}`}
                ></div>
              ))}
            </div>
          </div>
      )}

      <div className="flex flex-wrap gap-2 relative z-10 mt-auto">
        {comp.tags.map(tag => (
          <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 text-gray-400 border border-white/5 hover:border-white/20 hover:text-white transition-all cursor-default">
            #{tag}
          </span>
        ))}
      </div>
      
      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-neonCyan via-neonPurple to-transparent w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 max-w-6xl mx-auto relative z-10">
      
      {/* Page Header */}
      <div className="text-center mb-16 animate-fade-in-up">
        <div className="inline-block p-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-4 animate-bounce">
           <i className="fa-solid fa-trophy text-yellow-500 text-2xl drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]"></i>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-white to-yellow-200">
            Hackathons & Events
          </span>
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto rounded-full mb-6 shadow-[0_0_15px_rgba(234,179,8,0.5)]"></div>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Showcasing my competitive spirit. From sleepless coding sprints to complex problem-solving arenas.
        </p>
      </div>

      {/* Section: Achievements */}
      <div className="mb-20">
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 animate-fade-in-up">
          <div className="w-2 h-8 bg-gradient-to-b from-neonCyan to-neonPurple rounded-full"></div>
          Podium & Finalists
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 border border-white/10 px-3 py-1 rounded-full ml-4 bg-black/20">Hall of Fame</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((comp, index) => renderCard(comp, index))}
        </div>
      </div>

      {/* Section: Participated In */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <div className="w-2 h-8 bg-neonPurple/50 rounded-full"></div>
          Participated In
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 border border-white/10 px-3 py-1 rounded-full ml-4 bg-black/20">Qualifiers</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {participations.map((comp, index) => renderCard(comp, index + 3))}
        </div>
      </div>
      
      {/* Decorative footer */}
      <div className="mt-16 text-center animate-pulse-slow opacity-30">
        <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">End of Journey Log</span>
            <i className="fa-solid fa-angles-down text-white/20 text-xl"></i>
        </div>
      </div>
    </div>
  );
};

export default Competitions;