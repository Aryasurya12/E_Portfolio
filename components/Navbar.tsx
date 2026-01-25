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
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-[500px]">
      <nav className="glass-panel rounded-full px-4 py-4 flex justify-between items-center shadow-2xl shadow-neonPurple/20">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center transition-all duration-300 relative group min-w-[3rem] ${
              currentSection === item.id ? 'text-neonCyan -translate-y-2' : 'text-gray-400 hover:text-white'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-lg md:text-xl mb-1 transition-transform group-hover:scale-110`}></i>
            <span className={`text-[9px] md:text-[10px] uppercase tracking-wider font-semibold ${currentSection === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity absolute -bottom-4 w-max`}>
              {item.label}
            </span>
            {currentSection === item.id && (
              <span className="absolute -top-2 w-1 h-1 bg-neonPurple rounded-full shadow-[0_0_10px_#bc13fe]"></span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;