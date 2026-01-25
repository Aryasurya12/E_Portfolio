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

// --- Carousel Component ---
const ProjectCarousel: React.FC<{ 
  images: string[]; 
  title: string; 
  onImageClick?: () => void;
}> = ({ images, title, onImageClick }) => {
  const [curr, setCurr] = useState(0);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurr((c) => (c === 0 ? images.length - 1 : c - 1));
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurr((c) => (c === images.length - 1 ? 0 : c + 1));
  };

  return (
    <div className="relative h-56 overflow-hidden group/carousel">
      {/* Slides Container */}
      <div 
        className="flex transition-transform duration-500 ease-out h-full w-full" 
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={i} className="min-w-full h-full relative" onClick={onImageClick}>
             <img 
              src={src} 
              alt={`${title} view ${i + 1}`} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover/carousel:scale-110 cursor-pointer" 
            />
          </div>
        ))}
      </div>
      
      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80 pointer-events-none"></div>

      {/* Controls (Only if multiple images) */}
      {images.length > 1 && (
        <>
            <button 
                onClick={prev} 
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/80 flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 backdrop-blur-sm border border-white/10 z-20 hover:scale-110"
                aria-label="Previous image"
            >
                <i className="fa-solid fa-chevron-left text-xs"></i>
            </button>
            <button 
                onClick={next} 
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/80 flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 backdrop-blur-sm border border-white/10 z-20 hover:scale-110"
                aria-label="Next image"
            >
                <i className="fa-solid fa-chevron-right text-xs"></i>
            </button>

            {/* Indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 pointer-events-none">
                {images.map((_, i) => (
                    <div 
                        key={i} 
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 shadow-sm ${curr === i ? 'bg-neonCyan w-4' : 'bg-white/50'}`} 
                    />
                ))}
            </div>
        </>
      )}
    </div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<CategoryType>('all');
  const [isAnimating, setIsAnimating] = useState(false);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const handleFilterChange = (category: CategoryType) => {
    if (filter === category) return;
    setIsAnimating(true);
    setTimeout(() => {
      setFilter(category);
      setIsAnimating(false);
    }, 300);
  };

  // Cleanup overflow style on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const filteredProjects = projects.filter(p => filter === 'all' || p.category === filter);

  const categories: { id: CategoryType; label: string; icon: string }[] = [
    { id: 'all', label: 'All Projects', icon: 'fa-layer-group' },
    { id: 'mobile', label: 'Mobile Apps', icon: 'fa-mobile-screen' },
    { id: 'web', label: 'Web Dev', icon: 'fa-globe' },
    { id: 'desktop', label: 'Software', icon: 'fa-desktop' },
    { id: 'hardware', label: 'Hardware/IoT', icon: 'fa-microchip' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 max-w-7xl mx-auto relative z-10">
      <h2 className="text-4xl font-bold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-neonCyan to-neonPurple animate-fade-in-up">
        Featured Projects
      </h2>
      <p className="text-center text-gray-400 mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>Some things I've built</p>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleFilterChange(cat.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border flex items-center gap-2 ${
              filter === cat.id
                ? 'bg-neonCyan text-black border-neonCyan shadow-[0_0_15px_rgba(0,243,255,0.4)] scale-105'
                : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            <i className={`fa-solid ${cat.icon}`}></i>
            {cat.label}
          </button>
        ))}
      </div>

      <div 
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4 sm:px-0 transition-all duration-300 ${
          isAnimating ? 'opacity-0 translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'
        }`}
      >
        {filteredProjects.map((project, index) => (
          <div 
            key={project.id} 
            onClick={() => openModal(project)}
            className="glass-panel rounded-2xl overflow-hidden group hover:border-neonCyan/50 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1 hover:shadow-lg hover:shadow-neonCyan/10 cursor-pointer animate-fade-in-up opacity-0"
            style={{ animationDelay: `${200 + index * 100}ms` }}
          >
            {/* Carousel Section */}
            <ProjectCarousel 
              images={project.gallery || [project.image]} 
              title={project.title}
            />
            
            {/* Category Badge overlay */}
            <div className="absolute top-4 right-4 z-20 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-wider text-neonCyan shadow-lg">
                  {project.category}
                </span>
            </div>

            {/* Title Overlay on Image Bottom */}
            <div className="absolute top-[11rem] left-6 right-6 z-20 pointer-events-none translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-white group-hover:text-neonCyan transition-colors drop-shadow-md">{project.title}</h3>
            </div>
            
            <div className="p-6 flex-1 flex flex-col bg-gradient-to-b from-transparent to-black/20 pt-2">
              <div className="flex flex-wrap gap-2 mb-4 mt-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md bg-white/5 text-neonCyan border border-white/10 shadow-sm backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-1 opacity-90">
                {project.description}
              </p>
              <div className="mt-auto">
                <button 
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-neonCyan/30 transition-all duration-300 text-sm font-semibold flex items-center justify-center gap-2 group/btn"
                  type="button"
                >
                  <span>View Details</span>
                  <i className="fa-solid fa-arrow-right text-neonCyan group-hover/btn:translate-x-1 transition-transform"></i> 
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
         <div className="text-center py-20 animate-fade-in-up">
           <div className="inline-block p-4 rounded-full bg-white/5 mb-4 text-gray-500">
             <i className="fa-solid fa-folder-open text-3xl"></i>
           </div>
           <p className="text-gray-400">No projects found in this category yet.</p>
         </div>
      )}

      {/* Project Details Modal - Moved to Portal to fix stacking context issues */}
      {selectedProject && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
          ></div>
          
          {/* Modal Container - Responsive adjustments */}
          <div className="relative w-full max-w-3xl max-h-[85vh] sm:max-h-[90vh] flex flex-col glass-panel rounded-2xl border-neonPurple/20 shadow-2xl shadow-neonPurple/10 animate-fade-in-up bg-[#0f172a]/95 overflow-hidden shadow-black/50">
            
            {/* Close Button - Positioned absolutely */}
            <button 
              onClick={closeModal}
              className="absolute top-3 right-3 z-50 w-8 h-8 rounded-full bg-black/50 hover:bg-white/20 flex items-center justify-center transition-colors border border-white/10 backdrop-blur-md"
            >
              <i className="fa-solid fa-xmark text-white text-sm"></i>
            </button>

            {/* Modal Header Image - Responsive height */}
            <div className="relative h-40 sm:h-64 md:h-72 w-full overflow-hidden shrink-0 group">
               <img 
                 src={selectedProject.image} 
                 alt={selectedProject.title} 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent"></div>
               <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-8 pr-4">
                 <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-2 text-glow leading-tight">{selectedProject.title}</h2>
                 <div className="flex flex-wrap gap-1.5 sm:gap-2">
                   {selectedProject.tags.map(tag => (
                     <span key={tag} className="text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full bg-neonPurple/20 text-neonPurple border border-neonPurple/30 backdrop-blur-sm">
                       {tag}
                     </span>
                   ))}
                 </div>
               </div>
            </div>

            {/* Modal Content Body - Scrollable Area */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 overscroll-contain bg-gradient-to-b from-[#0f172a] to-transparent">
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-bold text-neonCyan mb-2 sm:mb-3 flex items-center gap-2">
                  <i className="fa-solid fa-circle-info text-sm"></i> Overview
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
                  {selectedProject.longDescription || selectedProject.description}
                </p>
              </div>

              {selectedProject.features && (
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-bold text-neonCyan mb-2 sm:mb-3 flex items-center gap-2">
                     <i className="fa-solid fa-star text-sm"></i> Key Features
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {selectedProject.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300 text-sm sm:text-base p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <i className="fa-solid fa-check text-neonPurple mt-1 shrink-0"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Gallery Preview */}
              {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                <div className="mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-bold text-neonCyan mb-2 sm:mb-3 flex items-center gap-2">
                       <i className="fa-solid fa-images text-sm"></i> Gallery
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                        {selectedProject.gallery.map((img, i) => (
                            <div key={i} className="aspect-video rounded-lg overflow-hidden border border-white/10 hover:border-neonCyan/50 transition-colors group/img cursor-pointer">
                                <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110" />
                            </div>
                        ))}
                    </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 border-t border-white/10 mt-4 sm:mt-auto">
                <a 
                  href={selectedProject.githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-center font-semibold flex items-center justify-center gap-2 text-sm sm:text-base group/git"
                >
                  <i className="fa-brands fa-github text-lg group-hover/git:rotate-12 transition-transform"></i>
                  Source Code
                </a>
                <a 
                  href={selectedProject.demoLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl bg-neonCyan/10 hover:bg-neonCyan/20 border border-neonCyan/30 hover:border-neonCyan/50 transition-colors text-neonCyan text-center font-semibold flex items-center justify-center gap-2 text-sm sm:text-base group/live"
                >
                  <i className="fa-solid fa-rocket group-hover/live:-translate-y-1 group-hover/live:translate-x-1 transition-transform"></i>
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Projects;