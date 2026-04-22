import React from 'react';
import { SectionType } from '../types';

interface NavbarProps {
  currentSection: SectionType;
  onNavigate: (section: SectionType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentSection, onNavigate }) => {
  const navItems: { id: SectionType; icon: string; label: string }[] = [
    { id: 'home', icon: 'fa-house', label: 'Home' },
    { id: 'projects', icon: 'fa-code', label: 'Projects' },
    { id: 'competitions', icon: 'fa-trophy', label: 'Achieve' },
    { id: 'skills', icon: 'fa-layer-group', label: 'Skills' },
    { id: 'about', icon: 'fa-user-astronaut', label: 'About' },
    { id: 'contact', icon: 'fa-envelope', label: 'Contact' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-fit px-4">
      <nav className="glass-panel rounded-2xl px-6 py-4 flex justify-center items-center gap-2 md:gap-4 shadow-[0_0_30px_rgba(139,92,246,0.3)] border border-white/10 backdrop-blur-2xl">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center transition-all duration-500 relative group p-2 rounded-xl ${
              currentSection === item.id 
                ? 'text-white bg-primaryPurple/20 shadow-[0_0_15px_rgba(139,92,246,0.4)]' 
                : 'text-gray-400 hover:text-accentPink hover:bg-white/5'
            }`}
          >
            <div className="relative">
              <i className={`fa-solid ${item.icon} text-lg md:text-xl transition-transform duration-500 group-hover:scale-110`}></i>
              {currentSection === item.id && (
                <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-secondaryPink rounded-full shadow-[0_0_8px_#ec4899] animate-pulse"></span>
              )}
            </div>
            
            <span className={`text-[9px] uppercase tracking-widest font-black mt-1 transition-all duration-500 ${
              currentSection === item.id ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden group-hover:opacity-100 group-hover:h-auto'
            }`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;