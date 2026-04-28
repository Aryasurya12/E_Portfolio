import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: 'edunexus',
    title: 'EduNexus',
    category: 'mobile',
    tags: ['Flutter', 'Supabase', 'Mobile'],
    description: 'Smart attendance system with seamless mobile UI. Built for SIH 2025.',
    longDescription: 'EduNexus is a comprehensive attendance management system designed to address the inefficiencies of manual tracking in educational institutions. Leveraging Flutter for a cross-platform mobile experience and Supabase for real-time data synchronization, it provides a seamless interface for both students and faculty.',
    features: [
      'QR Code Attendance Marking',
      'Real-time Analytics Dashboard',
      'Offline Support with Auto-sync',
      'Geo-fencing validation'
    ],
    image: 'https://picsum.photos/800/600?random=1',
    gallery: [
      'https://picsum.photos/800/600?random=1',
      'https://picsum.photos/800/600?random=11',
      'https://picsum.photos/800/600?random=12'
    ],
    githubLink: '#',
    demoLink: '#'
  },
  {
    id: 'codequest',
    title: 'CodeQuest',
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

const ProjectCard: React.FC<{ 
  project: Project; 
  index: number; 
  onClick: () => void 
}> = ({ project, index, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setTilt({ x: x * 8, y: y * -8 });
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-pointer opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${200 + index * 100}ms` }}
    >
      <div 
        className="relative h-full glass-panel rounded-[2rem] overflow-hidden border border-white/10 transition-all duration-500 ease-out"
        style={!isMobile && isHovered ? { 
          transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.02)`,
          boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.4)'
        } : {}}
      >
        <div className="relative h-[240px] md:h-[280px] overflow-hidden">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/20 to-transparent" />
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-black uppercase tracking-widest text-accentPink">
            {project.category}
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-4">
          <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-accentPink transition-colors">{project.title}</h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[9px] uppercase font-black px-2.5 py-1 rounded-full bg-white/5 text-gray-400 border border-white/5">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-gray-400 text-xs md:text-sm leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>
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

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
        ))}
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