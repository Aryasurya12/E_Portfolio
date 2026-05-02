import React, { useState, useEffect } from 'react';
import { SectionType } from '../types';
import Logo from './Logo';

interface NavbarProps {
  currentSection: SectionType;
  onNavigate: (section: SectionType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentSection, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: SectionType; icon: string; label: string }[] = [
    { id: 'home', icon: 'fa-house', label: 'Home' },
    { id: 'projects', icon: 'fa-code', label: 'Projects' },
    { id: 'competitions', icon: 'fa-trophy', label: 'Achieve' },
    { id: 'skills', icon: 'fa-layer-group', label: 'Skills' },
    { id: 'about', icon: 'fa-user-astronaut', label: 'About' },
    { id: 'contact', icon: 'fa-envelope', label: 'Contact' },
  ];

  const handleNavClick = (id: SectionType) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Desktop & Mobile Navbar Container */}
      <div 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-4 ${
          scrolled ? 'bg-[#0a0a14]/80 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo / Brand */}
          <div onClick={() => handleNavClick('home')} className="hidden sm:block">
            <Logo variant="horizontal" size="sm" />
          </div>
          <div onClick={() => handleNavClick('home')} className="block sm:hidden">
            <Logo variant="icon" size="sm" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 glass-panel rounded-2xl p-1 border-white/10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2 group ${
                  currentSection === item.id 
                    ? 'text-white bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)]' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <i className={`fa-solid ${item.icon} text-xs transition-transform group-hover:scale-110 ${currentSection === item.id ? 'text-accentPink' : ''}`}></i>
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-12 h-12 rounded-xl glass-panel border-white/10 flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`fixed inset-0 z-[110] bg-[#0a0a14]/60 backdrop-blur-sm md:hidden transition-opacity duration-500 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Drawer Menu */}
      <div 
        className={`fixed top-0 right-0 bottom-0 w-[80%] max-w-[400px] z-[120] bg-[#0a0a14] border-l border-white/5 md:hidden transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-8 h-full flex flex-col">
          <div className="flex justify-between items-center mb-12">
             <span className="text-xl font-black text-white tracking-tighter">NAVIGATION</span>
             <button onClick={() => setIsMenuOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <i className="fa-solid fa-xmark text-2xl"></i>
             </button>
          </div>

          <div className="flex-1 space-y-4">
             {navItems.map((item, i) => (
               <button
                 key={item.id}
                 onClick={() => handleNavClick(item.id)}
                 className={`w-full p-6 rounded-2xl flex items-center gap-6 transition-all duration-500 group relative overflow-hidden ${
                   currentSection === item.id 
                     ? 'bg-primaryPurple/10 border border-primaryPurple/30' 
                     : 'bg-white/5 border border-white/5 hover:border-white/10'
                 }`}
                 style={{ transitionDelay: `${i * 50}ms` }}
               >
                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                   currentSection === item.id ? 'bg-primaryPurple/20 text-white' : 'bg-white/5 text-gray-500'
                 }`}>
                    <i className={`fa-solid ${item.icon} text-xl`}></i>
                 </div>
                 <div className="text-left">
                    <div className={`text-xs font-black uppercase tracking-[0.2em] mb-1 ${
                      currentSection === item.id ? 'text-white' : 'text-gray-400'
                    }`}>{item.label}</div>
                    <div className="text-[10px] text-gray-600 font-mono italic">
                      {item.id === 'home' && 'Return to Base'}
                      {item.id === 'projects' && 'System Portfolios'}
                      {item.id === 'competitions' && 'Mission Reports'}
                      {item.id === 'skills' && 'Tech Arsenal'}
                      {item.id === 'about' && 'System Genesis'}
                      {item.id === 'contact' && 'Establish Link'}
                    </div>
                 </div>
                 {currentSection === item.id && (
                   <div className="absolute right-6 w-2 h-2 rounded-full bg-accentPink shadow-[0_0_10px_#ec4899] animate-pulse" />
                 )}
               </button>
             ))}
          </div>

          <div className="pt-8 border-t border-white/5 mt-auto">
             <div className="text-[10px] font-mono text-gray-600 text-center uppercase tracking-widest">
                ARYA.OS v2.0 // RESPONSIVE CORE
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;