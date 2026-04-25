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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Tilt calculation
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setTilt({ x: x * 10, y: y * -10 });

    // Glow effect position
    setMousePos({ 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top 
    });
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
      className="relative group cursor-pointer perspective-1000 opacity-0 animate-fade-in-up"
      style={{ 
        animationDelay: `${200 + index * 100}ms`,
      }}
    >
      <div 
        className="relative h-full glass-panel rounded-[2rem] overflow-hidden border border-white/10 transition-all duration-500 ease-out"
        style={{ 
          transform: isHovered ? `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.02)` : 'none',
          boxShadow: isHovered ? '0 25px 50px -12px rgba(139, 92, 246, 0.4), 0 0 20px rgba(236, 72, 153, 0.2)' : 'none'
        }}
      >
        {/* Dynamic Glow Effect */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, rgba(236, 72, 153, 0.15), transparent)`
          }}
        />

        {/* Top Section - Image (60%) */}
        <div className="relative h-[280px] overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-[2px]" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/20 to-transparent" />
          
          {/* Floating Category Badge */}
          <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-accentPink">
            {project.category}
          </div>

          {/* View Project CTA */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              View Project <i className="fa-solid fa-arrow-right ml-2 text-accentPink"></i>
            </div>
          </div>
        </div>

        {/* Bottom Section - Content */}
        <div className="p-8 flex flex-col transition-transform duration-500 group-hover:-translate-y-2">
          <h3 className="text-3xl font-black text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primaryPurple group-hover:to-secondaryPink transition-all duration-300">
            {project.title}
          </h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] uppercase font-black px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10 group-hover:border-accentPink/30 transition-colors">
                {tag}
              </span>
            ))}
          </div>

          <p className="text-gray-400 text-sm leading-relaxed line-clamp-1 group-hover:text-gray-300 transition-colors">
            {project.description}
          </p>
        </div>

        {/* Neon Border Glow */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-accentPink/20 rounded-[2rem] transition-colors pointer-events-none" />
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
    
    // Update indicator position
    const target = e.currentTarget as HTMLButtonElement;
    setIndicatorStyle({
      left: `${target.offsetLeft}px`,
      width: `${target.offsetWidth}px`,
    });

    setTimeout(() => {
      setFilter(category);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    // Initial indicator position
    if (filterContainerRef.current) {
      const activeBtn = filterContainerRef.current.querySelector('.active-filter') as HTMLButtonElement;
      if (activeBtn) {
        setIndicatorStyle({
          left: `${activeBtn.offsetLeft}px`,
          width: `${activeBtn.offsetWidth}px`,
        });
      }
    }
  }, []);

  const filteredProjects = projects.filter(p => filter === 'all' || p.category === filter);

  const categories: { id: CategoryType; label: string; icon: string }[] = [
    { id: 'all', label: 'All', icon: 'fa-layer-group' },
    { id: 'mobile', label: 'Mobile', icon: 'fa-mobile-screen' },
    { id: 'web', label: 'Web', icon: 'fa-globe' },
    { id: 'desktop', label: 'Software', icon: 'fa-desktop' },
    { id: 'hardware', label: 'Hardware', icon: 'fa-microchip' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-40 px-6 max-w-7xl mx-auto relative z-10">
      {/* Background Enhancements */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primaryPurple/10 blur-[120px] rounded-full animate-blob"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondaryPink/10 blur-[120px] rounded-full animate-blob delay-2000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] contrast-150 brightness-100"></div>
      </div>

      {/* Section 1: Hero */}
      <div className="text-center mb-24 opacity-0 animate-fade-in-up">
        <h2 className="text-6xl md:text-8xl font-black mb-6 relative inline-block">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryPurple via-accentPink to-secondaryPink">
            System Portfolios
          </span>
          <div className="absolute -bottom-4 left-0 w-full h-1.5 bg-gradient-to-r from-primaryPurple via-accentPink to-secondaryPink rounded-full shadow-[0_0_20px_rgba(236,72,153,0.5)] transform scale-x-0 animate-[scaleIn_0.8s_ease-out_0.5s_forwards]"></div>
        </h2>
        <p className="text-gray-400 mt-8 max-w-2xl mx-auto font-mono uppercase tracking-[0.3em] text-[10px] opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
          — Architecting high-performance digital solutions with precision —
        </p>
      </div>

      {/* Section 3: Filter Bar Upgrade */}
      <div className="flex justify-center mb-24 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
        <div 
          ref={filterContainerRef}
          className="relative glass-panel rounded-2xl p-1.5 flex gap-1 border-white/10"
        >
          {/* Animated Indicator */}
          <div 
            className="absolute top-1.5 bottom-1.5 bg-gradient-to-r from-primaryPurple to-secondaryPink rounded-xl transition-all duration-500 ease-in-out shadow-[0_0_20px_rgba(139,92,246,0.4)]"
            style={indicatorStyle}
          />
          
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={(e) => handleFilterChange(cat.id, e)}
              className={`relative z-10 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300 flex items-center gap-2 group ${
                filter === cat.id ? 'text-white active-filter' : 'text-gray-400 hover:text-white'
              }`}
            >
              <i className={`fa-solid ${cat.icon} transition-transform group-hover:scale-110`}></i>
              {cat.label}
              
              {/* Ripple Hover Effect */}
              {filter !== cat.id && (
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-xl transition-colors" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Section 2: Project Grid */}
      <div 
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 transition-all duration-500 ${
          isAnimating ? 'opacity-0 translate-y-8 scale-[0.98] blur-md' : 'opacity-100 translate-y-0 scale-100 blur-0'
        }`}
      >
        {filteredProjects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index} 
            onClick={() => setSelectedProject(project)} 
          />
        ))}
      </div>

      {/* Section 4: Project Modal (Cinematic Redesign) */}
      {selectedProject && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-[#0a0a14]/95 backdrop-blur-3xl animate-fadeIn" onClick={() => setSelectedProject(null)}></div>
          
          <div className="relative w-full max-w-6xl h-[95vh] md:h-[85vh] bg-[#0a0a14] glass-panel rounded-[2.5rem] border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row animate-modalEntry">
            {/* Sticky Header with Close Button */}
            <div className="absolute top-6 right-6 z-50">
              <button 
                onClick={() => setSelectedProject(null)}
                className="w-12 h-12 rounded-full bg-white/5 hover:bg-secondaryPink flex items-center justify-center transition-all border border-white/10 group backdrop-blur-md"
              >
                <i className="fa-solid fa-xmark text-xl text-white group-hover:rotate-90 transition-transform"></i>
              </button>
            </div>

            {/* Left: Cinematic Media Panel */}
            <div className="w-full md:w-[55%] h-64 md:h-full relative overflow-hidden group">
              <img 
                src={selectedProject.image} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                alt={selectedProject.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0a0a14] via-transparent to-transparent opacity-60" />
              
              {/* Media Controls / Indicators (Mockup) */}
              <div className="absolute bottom-8 left-8 flex gap-2">
                {selectedProject.gallery?.map((_, i) => (
                  <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === 0 ? 'w-8 bg-accentPink' : 'w-2 bg-white/20'}`} />
                ))}
              </div>
            </div>

            {/* Right: Immersive Content Panel */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              <div className="flex-1 p-8 md:p-14 overflow-y-auto custom-scrollbar bg-gradient-to-b from-transparent to-[#0a0a14]/30">
                <div className="max-w-2xl mx-auto md:mx-0">
                  <div className="space-y-2 mb-8">
                    <span className="text-accentPink font-black uppercase tracking-[0.3em] text-[10px] flex items-center gap-2">
                      <span className="w-10 h-[1px] bg-accentPink/50"></span>
                      Project Intelligence
                    </span>
                    <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
                      {selectedProject.title}
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="px-4 py-1.5 rounded-full bg-primaryPurple/10 text-accentGlow border border-primaryPurple/30 text-[10px] font-black uppercase tracking-widest hover:border-accentPink/50 transition-colors cursor-default">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-10">
                    <p className="text-gray-300 leading-relaxed text-lg font-light">
                      {selectedProject.longDescription || selectedProject.description}
                    </p>

                    <div className="space-y-6">
                      <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
                        Core Capabilities
                        <div className="flex-1 h-[1px] bg-white/10"></div>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedProject.features?.map((f, i) => (
                          <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-accentPink/30 transition-all group">
                            <div className="mt-1 w-8 h-8 rounded-lg bg-accentPink/10 flex items-center justify-center shrink-0 group-hover:bg-accentPink/20 transition-colors">
                              <i className="fa-solid fa-bolt-lightning text-accentPink text-xs group-hover:scale-125 transition-transform"></i>
                            </div>
                            <span className="text-gray-300 text-sm font-medium leading-snug">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer - Sticky */}
              <div className="p-8 md:p-10 border-t border-white/5 bg-[#0a0a14]/80 backdrop-blur-xl flex gap-4 shrink-0">
                <a 
                  href={selectedProject.githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-center font-black uppercase tracking-widest text-xs transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 group"
                >
                  <i className="fa-brands fa-github text-lg group-hover:text-accentPink transition-colors"></i> 
                  Source
                </a>
                <a 
                  href={selectedProject.demoLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-primaryPurple to-secondaryPink text-center font-black uppercase tracking-widest text-xs transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_10px_20px_-5px_rgba(236,72,153,0.4)] flex items-center justify-center gap-3 group"
                >
                  <i className="fa-solid fa-rocket animate-pulse group-hover:scale-110 transition-transform"></i> 
                  Launch System
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { 
          from { transform: scaleX(0); opacity: 0; } 
          to { transform: scaleX(1); opacity: 1; } 
        }
        @keyframes modalEntry {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .perspective-1000 { perspective: 1000px; }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(236, 72, 153, 0.3);
        }
      `}</style>
    </div>
  );
};

export default Projects;