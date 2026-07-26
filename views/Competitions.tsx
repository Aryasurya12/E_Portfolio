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
    id: 'break-the-loop',
    name: 'Break the Loop',
    organizer: 'GDG On Campus',
    date: '2026',
    status: '1st Prize',
    statusColor: 'text-yellow-400',
    description: 'Built an anonymous incident detection and reporting platform designed to provide a safer and more accessible way to report sensitive incidents. Secured 1st place in the hackathon.',
    tags: ['Hackathon', 'Social Impact', 'Web Development'],
    icon: 'fa-solid fa-trophy',
    category: 'achievement',
    rounds: [
      { name: 'Idea & Problem Statement', passed: true },
      { name: 'Prototype Development', passed: true },
      { name: 'Final Presentation', passed: true }
    ]
  },
  {
    id: 'robotics-project-expo',
    name: 'Robotics Project Expo',
    organizer: 'College Project Expo',
    date: '2025',
    status: '3rd Place',
    statusColor: 'text-accentPink',
    description: 'Designed and presented a robotics-based project at a project exhibition, demonstrating practical implementation of electronics, robotics and automation concepts. Secured 3rd place in the competition.',
    tags: ['Robotics', 'Hardware', 'Innovation'],
    icon: 'fa-solid fa-robot',
    category: 'achievement',
    rounds: [
      { name: 'Project Development', passed: true },
      { name: 'Technical Evaluation', passed: true },
      { name: 'Project Expo', passed: true }
    ]
  },
  {
    id: 'inter-college-hackathons',
    name: 'Inter-College Hackathons',
    organizer: 'Multiple Institutions',
    date: '2025 - 2026',
    status: 'Finalist',
    statusColor: 'text-primaryPurple',
    description: 'Participated in multiple inter-college hackathons and progressed through competitive evaluation rounds. Built working prototypes while gaining hands-on experience in rapid development, teamwork and technical problem-solving.',
    tags: ['Hackathons', 'Problem Solving', 'Teamwork'],
    icon: 'fa-solid fa-code',
    category: 'achievement',
    rounds: [
      { name: 'Idea Selection', passed: true },
      { name: 'Prototype Round', passed: true },
      { name: 'Finalist Stage', passed: true }
    ]
  },
  {
    id: 'mit-agriculture',
    name: 'Agriculture Innovation Project',
    organizer: 'MIT WPU Pune',
    date: '2025',
    status: 'Final Stage',
    statusColor: 'text-gray-300',
    description: 'Advanced to the final stage of an agriculture-focused innovation initiative, exploring technology-driven approaches to solving practical challenges in the agricultural domain.',
    tags: ['Innovation', 'Agriculture', 'Research'],
    icon: 'fa-solid fa-seedling',
    category: 'achievement',
    rounds: [
      { name: 'Initial Selection', passed: true },
      { name: 'Project Evaluation', passed: true },
      { name: 'Final Stage', passed: true }
    ]
  },
  {
    id: 'sih-internal-2025',
    name: 'Smart India Hackathon – Internal Round',
    organizer: 'College Internal SIH Selection',
    date: '2025',
    status: 'Qualified',
    statusColor: 'text-primaryPurple',
    description: 'Cleared the college-level internal selection round for Smart India Hackathon, progressing through the idea evaluation and presentation stage with our proposed solution.',
    tags: ['Hackathon', 'Innovation', 'Problem Solving'],
    icon: 'fa-solid fa-lightbulb',
    category: 'achievement',
    rounds: [
      { name: 'Idea Submission', passed: true },
      { name: 'Internal Evaluation', passed: true },
      { name: 'Internal Selection', passed: true }
    ]
  },
];

const certifications: Certification[] = [
  {
    id: 'lt-ml-python',
    title: 'Machine Learning with Python',
    issuer: 'L&T Skill Trainers Academy',
    date: 'Jun 2026',
    status: 'Completed',
    description: 'Completed a 60-hour residential Credit Transfer Program focused on Machine Learning with Python, combining intensive technical training with practical ML implementation.',
    tags: ['Machine Learning', 'Python', 'AI/ML'],
    icon: 'fa-solid fa-brain',
    link: 'https://drive.google.com/file/d/15UtJyjsK5zkIDF7EjkBa3mlvroKP-ZIa/view?usp=sharing'
  },

  {
    id: 'udemy-dsa-cpp',
    title: 'Mastering Data Structures & Algorithms',
    issuer: 'Udemy',
    date: 'Oct 2025',
    status: 'Completed',
    description: 'Completed 76 hours of in-depth training in Data Structures and Algorithms using C and C++, covering core problem-solving and algorithmic concepts.',
    tags: ['DSA', 'C++', 'Algorithms'],
    icon: 'fa-solid fa-code',
    link: 'https://drive.google.com/file/d/1IA3haGBJUKbjH0Ejp7LXgW-JJDnBMcU1/view?usp=sharing'
  },

  {
    id: 'gen-ai-study-jam',
    title: 'Gen AI Study Jam 2024',
    issuer: 'GDG On Campus • VIT',
    date: 'Nov 2024',
    status: 'Completed',
    description: 'Successfully completed all 15 skill badges and an Arcade game as part of the Gen AI Study Jam organized by GDG On Campus at VIT Mumbai.',
    tags: ['Generative AI', 'Google Cloud', 'AI'],
    icon: 'fa-brands fa-google',
    link: 'https://drive.google.com/file/d/1NmG_MXKUV_ChW1xvcBLegsqBGUdn22qA/view?usp=sharing'
  },

  {
    id: 'ai-responsive-web-apps',
    title: 'Building Secure, AI-Responsive Web Apps',
    issuer: 'VIT • ISTE',
    date: 'Mar 2025',
    status: 'Completed',
    description: 'Completed an ISTE-approved value-added course covering secure and AI-responsive web development using MERN Stack, Docker, Kubernetes and Golang.',
    tags: ['MERN', 'Docker', 'Kubernetes'],
    icon: 'fa-solid fa-layer-group',
    link: 'https://drive.google.com/file/d/1sy1cYg9qYIk4yCrL4H4ro757ux_cmwJI/view?usp=sharing#'
  },

  {
    id: 'fullstack-bootcamp',
    title: 'Full-Stack Web Development Bootcamp',
    issuer: 'Udemy • Dr. Angela Yu',
    date: 'Ongoing',
    status: 'In Progress',
    description: 'Currently strengthening full-stack development skills across modern frontend and backend technologies through a comprehensive web development bootcamp.',
    tags: ['Full Stack', 'React', 'Web Dev'],
    icon: 'fa-solid fa-laptop-code',
    link: '#'
  },

  {
    id: 'fastapi-course',
    title: 'FastAPI – The Complete Course 2026',
    issuer: 'Udemy',
    date: 'Ongoing',
    status: 'In Progress',
    description: 'Currently learning backend API development with FastAPI, focusing on building modern, high-performance APIs using Python.',
    tags: ['FastAPI', 'Python', 'Backend'],
    icon: 'fa-solid fa-server',
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
    <div className="min-h-screen pt-24 md:pt-32 pb-24 md:pb-40 px-6 max-w-7xl mx-auto relative z-10">

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
          DECODING MILESTONES, COMPETITIONS & CREDENTIALS
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