import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Background from './components/Background';
import AIChat from './components/AIChat';
import Home from './views/Home';
import Projects from './views/Projects';
import Skills from './views/Skills';
import Competitions from './views/Competitions';
import About from './views/About';
import Contact from './views/Contact';
import Loader from './components/Loader';
import { SectionType } from './types';

const App: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [isAppReady, setIsAppReady] = useState(false);
  const [currentSection, setCurrentSection] = useState<SectionType>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displaySection, setDisplaySection] = useState<SectionType>('home');

  const handleNavigation = (section: SectionType) => {
    if (section === currentSection || isTransitioning) return;

    // Phase 1: Fade out current section
    setIsTransitioning(true);
    setCurrentSection(section);

    // Wait for fade-out duration (matches CSS transition)
    setTimeout(() => {
      // Phase 2: Switch the content and reset scroll
      setDisplaySection(section);
      window.scrollTo({ top: 0, behavior: 'instant' });

      // Phase 3: Trigger fade-in of new section
      // We use a double requestAnimationFrame to ensure the DOM has updated
      // and the browser is ready for the new transition state.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(false);
        });
      });
    }, 450); // Slightly less than the 500ms transition to prevent flickers
  };

  const renderSection = () => {
    switch (displaySection) {
      case 'home': return <Home onNavigate={handleNavigation} />;
      case 'projects': return <Projects />;
      case 'competitions': return <Competitions />;
      case 'skills': return <Skills />;
      case 'about': return <About />;
      case 'contact': return <Contact />;
      default: return <Home onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className={`min-h-screen text-white font-sans selection:bg-neonCyan selection:text-black antialiased overflow-x-hidden ${!isAppReady ? 'h-screen overflow-y-hidden' : ''}`}>
      {showLoader && (
        <Loader 
          onStartFadeOut={() => setIsAppReady(true)} 
          onComplete={() => setShowLoader(false)} 
        />
      )}
      
      <div 
        className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] origin-center ${
          !isAppReady ? 'scale-[1.05] opacity-0 blur-sm pointer-events-none' : 'scale-100 opacity-100 blur-0'
        }`}
      >
        <Background />
        
        {/* AI Assistant Floating UI - Now Context Aware */}
        <AIChat currentSection={displaySection} />
      
      <main 
        className={`transition-all duration-500 transform-gpu will-change-[opacity,transform,filter] ${
          isTransitioning 
            ? 'opacity-0 translate-y-8 scale-[0.98] blur-md ease-in' 
            : 'opacity-100 translate-y-0 scale-100 blur-0 ease-out'
        }`}
        style={{
          // Use a custom cubic-bezier for a more professional, "weighty" feel
          transitionTimingFunction: isTransitioning 
            ? 'cubic-bezier(0.4, 0, 1, 1)' 
            : 'cubic-bezier(0, 0, 0.2, 1)'
        }}
      >
        {renderSection()}
        </main>
  
        <Navbar currentSection={currentSection} onNavigate={handleNavigation} />
      </div>
    </div>
  );
};

export default App;