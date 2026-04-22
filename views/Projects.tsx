import React, { useState, useEffect } from 'react';
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
    image: 'https://picsum.photos/600/400?random=1',
    gallery: [
      'https://picsum.photos/600/400?random=1',
      'https://picsum.photos/600/400?random=11',
      'https://picsum.photos/600/400?random=12'
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
      'Gamified Progression System (XP/Badges)',
      'Interactive Code Editor',
      'Daily Coding Challenges'
    ],
    image: 'https://picsum.photos/600/400?random=2',
    gallery: [
      'https://picsum.photos/600/400?random=2',
      'https://picsum.photos/600/400?random=21',
      'https://picsum.photos/600/400?random=22'
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
      'B-Tree Indexing for Fast Search',
      'Graphical Seat Map Selection',
      'Multi-threaded Transaction Handling',
      'PDF Ticket Generation'
    ],
    image: 'https://picsum.photos/600/400?random=3',
    gallery: [
      'https://picsum.photos/600/400?random=3',
      'https://picsum.photos/600/400?random=31'
    ],
    githubLink: '#',
    demoLink: '#'
  },
  {
    id: 'iot-weather',
    title: 'IoT Weather Station',
    category: 'hardware',
    tags: ['ESP32', 'IoT', 'C++', 'Sensors'],
    description: 'Real-time weather monitoring system sending environmental data to the cloud via MQTT.',
    longDescription: 'A compact, low-power weather station prototype built on the ESP32 platform. It interfaces with DHT11 and BMP180 sensors to capture temperature, humidity, and atmospheric pressure, transmitting telemetry to a HiveMQ broker for visualization.',
    features: [
      'Deep Sleep Power Optimization',
      'MQTT Data Telemetry',
      'OLED Status Display',
      'Custom 3D Printed Enclosure'
    ],
    image: 'https://picsum.photos/600/400?random=4',
    gallery: [
      'https://picsum.photos/600/400?random=4',
      'https://picsum.photos/600/400?random=41'
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
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setTilt({ x: x * 10, y: y * -10 });
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
      className="relative glass-panel rounded-3xl overflow-hidden group cursor-pointer transition-all duration-300 border border-white/10 hover:border-accentPink animate-fade-in-up opacity-0"
      style={{ 
        animationDelay: `${200 + index * 100}ms`,
        transform: isHovered ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.02)` : 'none',
        boxShadow: isHovered ? '0 0 30px rgba(236, 72, 153, 0.3)' : 'none'
      }}
    >
      {/* Image Overlay */}
      <div className="relative h-60 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-transparent to-transparent opacity-90" />
        
        {/* Glow Halo behind card when hovered */}
        <div className={`absolute -inset-10 bg-gradient-to-r from-primaryPurple/30 to-secondaryPink/30 blur-[40px] rounded-full z-0 pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      <div className="p-6 relative z-10 flex flex-col h-full bg-gradient-to-b from-transparent to-[#0a0a14]/60">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-2xl font-bold text-white group-hover:text-accentPink transition-colors">{project.title}</h3>
          <span className="px-3 py-1 rounded-full bg-primaryPurple/20 text-[10px] font-black uppercase text-accentGlow border border-primaryPurple/40 backdrop-blur-md">
            {project.category}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="text-[10px] uppercase font-black px-2 py-0.5 rounded-md bg-white/5 text-gray-300 border border-white/10">
              {tag}
            </span>
          ))}
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
          {project.description}
        </p>

        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex -space-x-2">
             <div className="w-8 h-8 rounded-full bg-primaryPurple/20 border border-white/10 flex items-center justify-center text-xs"><i className="fa-solid fa-code"></i></div>
             <div className="w-8 h-8 rounded-full bg-secondaryPink/20 border border-white/10 flex items-center justify-center text-xs"><i className="fa-solid fa-brain"></i></div>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold text-accentPink group-hover:translate-x-1 transition-transform">
            Explore <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<CategoryType>('all');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFilterChange = (category: CategoryType) => {
    if (filter === category) return;
    setIsAnimating(true);
    setTimeout(() => {
      setFilter(category);
      setIsAnimating(false);
    }, 300);
  };

  const filteredProjects = projects.filter(p => filter === 'all' || p.category === filter);

  const categories: { id: CategoryType; label: string; icon: string }[] = [
    { id: 'all', label: 'All', icon: 'fa-layer-group' },
    { id: 'mobile', label: 'Mobile', icon: 'fa-mobile-screen' },
    { id: 'web', label: 'Web', icon: 'fa-globe' },
    { id: 'desktop', label: 'Software', icon: 'fa-desktop' },
    { id: 'hardware', label: 'Hardware', icon: 'fa-microchip' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-40 px-6 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16 opacity-0 animate-fade-in-up">
        <h2 className="text-5xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primaryPurple via-accentPink to-secondaryPink">
          System Portfolios
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primaryPurple to-secondaryPink mx-auto rounded-full" />
        <p className="text-gray-400 mt-6 max-w-2xl mx-auto font-mono uppercase tracking-[0.2em] text-xs">Architecting high-performance digital solutions</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-20 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleFilterChange(cat.id)}
            className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-500 border flex items-center gap-2 ${
              filter === cat.id
                ? 'bg-gradient-to-r from-primaryPurple to-secondaryPink text-white border-transparent shadow-[0_0_20px_rgba(139,92,246,0.3)] scale-105'
                : 'bg-white/5 text-gray-400 border-white/10 hover:border-accentPink/50 hover:text-white'
            }`}
          >
            <i className={`fa-solid ${cat.icon}`}></i>
            {cat.label}
          </button>
        ))}
      </div>

      <div 
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 transition-all duration-500 ${
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

      {/* Modal - Redesigned */}
      {selectedProject && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0a0a14]/90 backdrop-blur-xl animate-fadeIn" onClick={() => setSelectedProject(null)}></div>
          
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0a0a14] glass-panel rounded-[2rem] border-white/20 shadow-2xl overflow-hidden flex flex-col animate-fade-in-up">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/5 hover:bg-secondaryPink flex items-center justify-center transition-all border border-white/10 group"
            >
              <i className="fa-solid fa-xmark text-white group-hover:rotate-90 transition-transform"></i>
            </button>

            <div className="flex flex-col lg:flex-row h-full">
              <div className="w-full lg:w-1/2 h-64 lg:h-full relative overflow-hidden shrink-0">
                <img src={selectedProject.image} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0a0a14] via-transparent to-transparent" />
              </div>

              <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-accentPink font-black uppercase tracking-widest text-[10px]">Project Analysis</span>
                    <h2 className="text-4xl md:text-5xl font-black text-white">{selectedProject.title}</h2>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-primaryPurple/10 text-accentGlow border border-primaryPurple/30 text-[10px] font-bold uppercase tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-300 leading-relaxed text-lg font-light">
                    {selectedProject.longDescription || selectedProject.description}
                  </p>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondaryPink rounded-full shadow-[0_0_8px_#ec4899]" />
                      Core Capabilities
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedProject.features?.map((f, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-400 text-sm bg-white/5 p-3 rounded-xl border border-white/5">
                           <i className="fa-solid fa-bolt text-accentPink"></i>
                           {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-4 pt-8">
                    <a href={selectedProject.githubLink} className="flex-1 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-center font-bold transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                      <i className="fa-brands fa-github text-xl"></i> Source
                    </a>
                    <a href={selectedProject.demoLink} className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-primaryPurple to-secondaryPink text-center font-bold transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] flex items-center justify-center gap-2">
                      <i className="fa-solid fa-rocket"></i> Launch
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default Projects;