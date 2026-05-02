import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: 'home-automation',
    title: 'Home Automation System',
    category: 'hardware',
    tags: ['IoT', 'AI', 'ESP32', 'Python'],
    description: 'Intelligent home automation integrating IoT hardware with AI-driven predictive logic.',
    longDescription: 'A comprehensive smart home ecosystem bridging the gap between physical hardware and cloud-based AI. Utilizing ESP32 microcontrollers and a Python-based intelligent backend, the system learns user habits and preemptively adjusts environmental controls, optimizing both comfort and energy efficiency.',
    features: [
      'Predictive AI Automation',
      'Real-time IoT Sensor Telemetry',
      'Secure Local Network Fallback',
      'Custom Mobile Dashboard'
    ],
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop',
    gallery: [],
    githubLink: '#',
    demoLink: '#'
  },
  {
    id: 'break-the-loop',
    title: 'Break the Loop',
    category: 'web',
    tags: ['React', 'Node.js', 'Hackathon'],
    description: 'Award-winning hackathon project focusing on developer productivity.',
    longDescription: 'Developed during a 48-hour competitive hackathon, Break the Loop is an innovative productivity tool designed specifically for developers. It analyzes coding patterns and intercepts infinite loops or deep rabbit-hole debugging sessions, prompting breaks and providing AI-assisted pair-programming insights.',
    features: [
      'IDE Extension Integration',
      'Pattern Recognition Engine',
      'Gamified Focus Metrics',
      'Real-time Code Analysis'
    ],
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop',
    gallery: [],
    githubLink: '#',
    demoLink: '#'
  },
  {
    id: 'edunexus',
    title: 'EduNexus',
    category: 'web',
    tags: ['React', 'TypeScript', 'Gemini API'],
    description: 'Gamified Python learning platform using Gemini API for AI-driven feedback.',
    longDescription: 'CodeQuest revolutionizes coding education by turning it into an RPG adventure. Built with React and TypeScript, it integrates Google\'s Gemini API to provide intelligent, context-aware code reviews and personalized hints, helping students overcome roadblocks without giving away the solution.',
    features: [
      'AI-Powered Code Analysis',
      'Gamified Progression System',
      'Interactive Code Editor',
      'Daily Coding Challenges'
    ],
    image: 'https://picsum.photos/800/600?random=2',
    gallery: [
      'https://picsum.photos/800/600?random=2',
      'https://picsum.photos/800/600?random=21',
      'https://picsum.photos/800/600?random=22'
    ],
    githubLink: '#',
    demoLink: '#'
  },
  {
    id: 'flightres',
    title: 'Flight UI',
    category: 'desktop',
    tags: ['Java Swing', 'C', 'Desktop'],
    description: 'Desktop interface for ticket reservation exploring complex data structures.',
    longDescription: 'A robust desktop application simulating a real-world airline reservation system. This project bridges the gap between low-level C data structures for performance-critical backend operations and a user-friendly Java Swing frontend.',
    features: [
      'B-Tree Indexing for Search',
      'Graphical Seat Map Selection',
      'Multi-threaded Transactions',
      'PDF Ticket Generation'
    ],
    image: 'https://picsum.photos/800/600?random=3',
    gallery: [
      'https://picsum.photos/800/600?random=3',
      'https://picsum.photos/800/600?random=31'
    ],
    githubLink: '#',
    demoLink: '#'
  },
  {
    id: 'iot-weather',
    title: 'IoT Weather Station',
    category: 'hardware',
    tags: ['ESP32', 'IoT', 'C++', 'Sensors'],
    description: 'Real-time weather monitoring system sending data to cloud via MQTT.',
    longDescription: 'A compact, low-power weather station prototype built on the ESP32 platform. It interfaces with DHT11 and BMP180 sensors to capture temperature, humidity, and atmospheric pressure, transmitting telemetry to a HiveMQ broker.',
    features: [
      'Power Optimization',
      'MQTT Data Telemetry',
      'OLED Status Display',
      '3D Printed Enclosure'
    ],
    image: 'https://picsum.photos/800/600?random=4',
    gallery: [
      'https://picsum.photos/800/600?random=4',
      'https://picsum.photos/800/600?random=41'
    ],
    githubLink: '#',
    demoLink: '#'
  }
];

type CategoryType = 'all' | 'mobile' | 'web' | 'desktop' | 'hardware';

type CardType = 'feature' | 'standard' | 'compact';

const ProjectCard: React.FC<{ 
  project: Project; 
  index: number; 
  onClick: () => void;
  type: CardType;
}> = ({ project, index, onClick, type }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 }); // For proximity glow

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePos({ x, y });

    if (!isMobile) {
      const tiltX = ((x / rect.width) * 2 - 1) * 4; // reduced tilt for elegance
      const tiltY = ((y / rect.height) * 2 - 1) * -4;
      setTilt({ x: tiltX, y: tiltY });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    // Keep glow smoothly fading out by moving it offscreen or letting opacity handle it
  };

  const isFeature = type === 'feature';
  const isCompact = type === 'compact';

  // Grid spanning classes based on type
  const spanClasses = isFeature 
    ? 'md:col-span-2 lg:col-span-2' 
    : isCompact 
      ? 'md:col-span-1 lg:col-span-1'
      : 'md:col-span-1 lg:col-span-1'; // standard

  return (
    <div 
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative group cursor-pointer opacity-0 animate-fade-in-up flex flex-col ${spanClasses}`}
      style={{ animationDelay: `${150 + index * 100}ms` }}
    >
      <div 
        className={`relative h-full w-full glass-panel overflow-hidden border border-white/10 transition-all duration-500 ease-out flex flex-col
          ${isFeature ? 'rounded-[2.5rem]' : 'rounded-[2rem]'}
        `}
        style={!isMobile && isHovered ? { 
          transform: `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.02) translateY(-8px)`,
          boxShadow: isFeature 
            ? '0 30px 60px -15px rgba(139, 92, 246, 0.4), 0 0 40px rgba(236,72,153,0.2)'
            : '0 20px 40px -10px rgba(139, 92, 246, 0.2)'
        } : {}}
      >
        {/* Proximity Glow Background */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 mix-blend-screen"
          style={{
            background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139,92,246,0.15), transparent 40%)`,
            opacity: isHovered ? 1 : 0
          }}
        />

        {isFeature ? (
          // --- FEATURE CARD (Large) ---
          <div className="flex flex-col md:flex-row h-full w-full relative z-10">
             <div className="w-full md:w-[55%] h-[250px] md:h-full relative overflow-hidden order-1 md:order-2 shrink-0">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0a0a14] via-[#0a0a14]/60 to-transparent" />
             </div>
             <div className="w-full md:w-[45%] p-8 md:p-12 flex flex-col justify-center order-2 md:order-1 relative z-10 bg-gradient-to-r from-[#0a0a14] to-transparent">
                <div className="mb-4 flex items-center justify-between">
                  <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-accentPink backdrop-blur-md">
                    {project.category}
                  </div>
                  <i className="fa-solid fa-arrow-up-right-from-square text-gray-500 group-hover:text-white transition-colors text-sm"></i>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primaryPurple group-hover:to-accentPink transition-all duration-300 mb-4 tracking-tight">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed line-clamp-3 mb-6 font-light">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
             </div>
          </div>
        ) : isCompact ? (
          // --- COMPACT CARD (Small) ---
          <div className="p-8 h-full flex flex-col relative z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primaryPurple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-accentPink transition-colors">
                 <i className="fa-solid fa-code text-sm"></i>
              </div>
              <i className="fa-solid fa-arrow-up-right-from-square text-gray-600 group-hover:text-white transition-colors text-xs"></i>
            </div>
            <h3 className="text-2xl font-black text-white mb-3 group-hover:text-accentPink transition-colors">{project.title}</h3>
            <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-6">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {project.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-[8px] uppercase font-black px-2 py-1 rounded bg-black/40 text-gray-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ) : (
          // --- STANDARD CARD (Medium) ---
          <div className="h-full flex flex-col relative z-10">
            <div className="relative h-[200px] overflow-hidden shrink-0">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] to-transparent" />
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-black uppercase tracking-widest text-primaryPurple">
                {project.category}
              </div>
            </div>
            <div className="p-8 flex flex-col flex-1 bg-gradient-to-b from-[#0a0a14] to-transparent">
              <h3 className="text-2xl font-black text-white group-hover:text-accentPink transition-colors mb-3">{project.title}</h3>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed line-clamp-2 mb-6">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-[9px] uppercase font-black px-2.5 py-1 rounded-full bg-white/5 text-gray-400 border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<CategoryType>('all');
  const [isAnimating, setIsAnimating] = useState(false);
  const filterContainerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  const handleFilterChange = (category: CategoryType, e: React.MouseEvent) => {
    if (filter === category) return;
    setIsAnimating(true);
    const target = e.currentTarget as HTMLButtonElement;
    setIndicatorStyle({ left: `${target.offsetLeft}px`, width: `${target.offsetWidth}px` });
    setTimeout(() => {
      setFilter(category);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    if (filterContainerRef.current) {
      const activeBtn = filterContainerRef.current.querySelector('.active-filter') as HTMLButtonElement;
      if (activeBtn) setIndicatorStyle({ left: `${activeBtn.offsetLeft}px`, width: `${activeBtn.offsetWidth}px` });
    }
  }, []);

  const filteredProjects = projects.filter(p => filter === 'all' || p.category === filter);

  return (
    <div className="min-h-screen pt-32 pb-40 px-6 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-20 opacity-0 animate-fade-in-up">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryPurple via-accentPink to-secondaryPink">
            System Portfolios
          </span>
        </h2>
        <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.4em]">Architecting high-performance digital systems</p>
      </div>

      {/* Filter Bar */}
      <div className="flex justify-center mb-16 overflow-x-auto no-scrollbar py-4">
        <div ref={filterContainerRef} className="relative glass-panel rounded-2xl p-1.5 flex gap-1 border-white/10 whitespace-nowrap">
          <div className="absolute top-1.5 bottom-1.5 bg-gradient-to-r from-primaryPurple to-secondaryPink rounded-xl transition-all duration-500" style={indicatorStyle} />
          {['all', 'mobile', 'web', 'desktop', 'hardware'].map((cat) => (
            <button
              key={cat}
              onClick={(e) => handleFilterChange(cat as CategoryType, e)}
              className={`relative z-10 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors ${
                filter === cat ? 'text-white active-filter' : 'text-gray-500 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetric Grid Layout */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-6 md:gap-8 transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
        {filteredProjects.map((project, index) => {
          // Determine layout type based on index to create an asymmetric grid
          let type: CardType = 'standard';
          if (index % 4 === 0) type = 'feature';
          else if (index % 4 === 1) type = 'standard';
          else if (index % 4 === 2) type = 'compact';
          else if (index % 4 === 3) type = 'standard'; // standard will span 1 col. Wait, if 0 is col-span-2, 1 is col-span-1 (row 1 is 3 cols). 2 is col-span-1, 3 is col-span-2. Let's make index 3 'feature' to complete the 3 cols!
          
          if (index % 4 === 3) type = 'feature'; // Makes it col-span-2. So row 2 is compact(1) + feature(2).

          return (
            <ProjectCard key={project.id} project={project} index={index} type={type} onClick={() => setSelectedProject(project)} />
          );
        })}
      </div>

      {/* Responsive Modal */}
      {selectedProject && createPortal(
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-8">
          <div className="absolute inset-0 bg-[#0a0a14]/90 backdrop-blur-3xl" onClick={() => setSelectedProject(null)} />
          <div className="relative w-full h-full md:max-w-6xl md:h-[85vh] bg-[#0a0a14] md:rounded-[3rem] border-white/10 overflow-hidden flex flex-col md:flex-row animate-modalEntry">
            <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 z-[210] w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-secondaryPink transition-colors">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>

            <div className="w-full md:w-[50%] h-64 md:h-auto shrink-0 relative">
              <img src={selectedProject.image} className="w-full h-full object-cover" alt={selectedProject.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-transparent to-transparent md:hidden" />
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-5xl font-black text-white">{selectedProject.title}</h2>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-primaryPurple/10 border border-primaryPurple/30 text-[9px] font-black uppercase text-accentGlow">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm md:text-lg leading-relaxed font-light">
                    {selectedProject.longDescription || selectedProject.description}
                  </p>
                  
                  <div className="space-y-4 pt-4">
                     <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">System Features</h4>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedProject.features?.map((f, i) => (
                          <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                             <i className="fa-solid fa-circle-check text-accentPink text-xs"></i>
                             <span className="text-xs text-gray-300 font-medium">{f}</span>
                          </div>
                        ))}
                     </div>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-white/5 bg-[#0a0a14]/80 backdrop-blur-xl flex gap-4">
                <a href={selectedProject.githubLink} className="flex-1 py-4 rounded-xl bg-white/5 border border-white/10 text-center text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all">Source</a>
                <a href={selectedProject.demoLink} className="flex-1 py-4 rounded-xl bg-gradient-to-r from-primaryPurple to-secondaryPink text-center text-[10px] font-black uppercase tracking-widest text-white shadow-lg transition-all hover:scale-105">Launch</a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes modalEntry {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Projects;