import React, { useState, useEffect, useRef } from 'react';

const experiences = [
  {
    role: "Core Technical Member",
    org: "GDG (Google Developer Group)",
    period: "Oct 2025 - Present",
    desc: "Organizing tech events, workshops, and fostering a community of developers. Contributing to technical projects and mentoring peers.",
    icon: "fa-brands fa-google",
    iconColor: "text-primaryPurple",
    watermark: "GDG",
  },
  {
    role: "Events Co-Head",
    org: "ECSA",
    period: "July 2025 - Present",
    desc: "Leading the organization of departmental events, hackathons, and seminars. Managing volunteer teams and logistics for campus activities.",
    icon: "fa-solid fa-calendar-check",
    iconColor: "text-accentPink",
    watermark: "ECSA",
  },
  {
    role: "Core Technical Member",
    org: "ECSA",
    period: "Aug 2024 - May 2025",
    desc: "Developed websites for college events and conducted technical workshops for juniors on web development and version control.",
    icon: "fa-solid fa-code",
    iconColor: "text-accentGlow",
    watermark: "DEV",
  },
];

const Counter: React.FC<{ target: number; duration: number }> = ({ target, duration }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      }
    }, { threshold: 0.5 });

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <div ref={countRef}>{count}</div>;
};

const About: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    
    handleResize();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a14] relative overflow-hidden">
      
      {/* BACKGROUND ENHANCEMENT */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-primaryPurple/5 blur-[140px] rounded-full animate-blob"
          style={!isMobile ? { transform: `translateY(${scrollY * 0.1}px)` } : {}}
        />
        <div 
          className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-secondaryPink/5 blur-[140px] rounded-full animate-blob delay-1000"
          style={!isMobile ? { transform: `translateY(${scrollY * -0.1}px)` } : {}}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-40">
        
        {/* 🌟 SECTION 1: SYSTEM GENESIS (HERO) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24 md:mb-32">
          
          <div className="lg:col-span-5 relative group opacity-0 animate-fade-in-up order-2 lg:order-1">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primaryPurple/20 to-secondaryPink/20 blur-2xl group-hover:opacity-100 opacity-0 transition-opacity duration-700" />
            <div 
              className="relative glass-panel p-2 rounded-[2.5rem] md:rounded-[3.5rem] border-white/10 overflow-hidden transition-all duration-700 hover:shadow-[0_0_50px_rgba(139,92,246,0.2)]"
              style={!isMobile ? { transform: `perspective(1000px) rotateY(${(scrollY * 0.01) % 10}deg)` } : {}}
            >
              <div className="relative aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden">
                <img src="/profile.png" className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000" alt="Arya" />
                <div className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                   <span className="text-[8px] md:text-[10px] font-black text-white uppercase tracking-widest">Active / Building</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-left">
                   <div className="text-[8px] md:text-[10px] font-black text-accentPink uppercase tracking-[0.3em] mb-1 text-left">Identity Node</div>
                   <div className="text-2xl md:text-3xl font-black text-white text-left">Arya.OS</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8 md:gap-10 order-1 lg:order-2 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white relative inline-block">
                System Genesis
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primaryPurple via-accentPink to-secondaryPink rounded-full shadow-[0_0_20px_#ec4899]" />
              </h1>
              <p className="text-gray-500 font-mono text-[10px] md:text-sm tracking-[0.2em] uppercase italic">Architecting the bridge between precision and scale</p>
            </div>

            <div className="glass-panel p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border-white/10 bg-white/[0.02] relative group overflow-hidden">
               <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primaryPurple to-secondaryPink opacity-50" />
               <p className="text-gray-300 text-lg md:text-2xl font-light leading-relaxed group-hover:text-white transition-colors">
                 "I design systems that bridge <span className="text-primaryPurple font-bold italic">intelligent automation</span> with <span className="text-accentPink font-bold italic">real-world usability</span>."
               </p>
            </div>
          </div>
        </div>

        {/* 🧠 SECTION 2: KERNEL OVERVIEW */}
        <div className="max-w-4xl mb-32 md:mb-40 space-y-8 opacity-0 animate-fade-in-up text-center lg:text-left mx-auto lg:mx-0">
           <div className="flex items-center justify-center lg:justify-start gap-4 text-accentPink font-mono text-[10px] md:text-xs uppercase tracking-[0.4em]">
              <i className="fa-solid fa-terminal animate-pulse"></i>
              Kernel Log Overview
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-left">
              <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light">
                I am an architect of digital infrastructure. My core focus lies in the intersection of <span className="text-white font-bold text-glow-shimmer">intuitive interface design</span> and performant systems.
              </p>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed font-light">
                Every line of code I construct is a module in a larger mission: enhancing human-digital interaction through <span className="text-white font-bold text-glow-shimmer">smart automation</span> and AI integration.
              </p>
           </div>
        </div>

        {/* 💡 SECTION 3: THINKING LAYER */}
        <div className="mb-32 md:mb-40 space-y-12">
           <h3 className="text-[10px] md:text-sm font-black text-gray-500 uppercase tracking-[0.5em] text-center">Thinking Layer</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Systems Over Features', desc: 'Focus on the ecosystem, not just isolated components.', icon: 'fa-microchip' },
                { title: 'Real-World First', desc: 'Solving tangible problems through digital logic.', icon: 'fa-earth-americas' },
                { title: 'Scalability Mindset', desc: 'Engineering for the growth of tomorrow.', icon: 'fa-arrow-up-right-dots' },
                { title: 'Build → Test → Improve', desc: 'Iterative refinement as a core development loop.', icon: 'fa-rotate' }
              ].map((thought, i) => (
                <div key={i} className="glass-panel p-8 rounded-3xl border-white/5 hover:border-accentPink transition-all duration-500 group relative">
                   <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                      <i className={`fa-solid ${thought.icon} text-lg text-primaryPurple group-hover:text-accentPink transition-colors`}></i>
                   </div>
                   <h4 className="text-lg font-black text-white mb-2">{thought.title}</h4>
                   <p className="text-gray-500 text-[11px] leading-relaxed">{thought.desc}</p>
                </div>
              ))}
           </div>
        </div>

        {/* 🚀 SECTION 4: CURRENT SYSTEM STATE */}
        <div className="mb-32 md:mb-40 space-y-12">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                { title: 'Building', task: 'AI + IoT Home Automation', tags: ['Python', 'MQTT', 'LLM'], color: 'bg-primaryPurple' },
                { title: 'Learning', task: 'Backend + ML Integration', tags: ['FastAPI', 'PyTorch'], color: 'bg-accentPink' },
                { title: 'Exploring', task: 'System-Level Design Thinking', tags: ['UI/UX', 'Architecture'], color: 'bg-accentGlow' }
              ].map((state, i) => (
                <div key={i} className="glass-panel p-8 md:p-10 rounded-[2.5rem] border-white/10 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-6 opacity-10">
                      <div className={`w-3 h-3 rounded-full ${state.color} animate-ping`} />
                   </div>
                   <h4 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-4 ${state.color.replace('bg-', 'text-')}`}>{state.title}</h4>
                   <div className="text-xl md:text-2xl font-black text-white mb-6 leading-tight">{state.task}</div>
                   <div className="flex flex-wrap gap-2">
                      {state.tags.map((tag, j) => (
                        <span key={j} className="text-[9px] font-mono text-gray-500 bg-white/5 border border-white/10 px-3 py-1 rounded-full">{tag}</span>
                      ))}
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* 📈 SECTION 5: GROWTH SNAPSHOT */}
        <div className="mb-32 md:mb-48 space-y-16">
           <h3 className="text-[10px] md:text-sm font-black text-gray-500 uppercase tracking-[0.5em] text-center">Growth Snapshot</h3>
           <div className="relative max-w-4xl mx-auto px-4">
              <div className="absolute top-0 md:top-1/2 left-4 md:left-0 w-[2px] md:w-full h-full md:h-[2px] bg-white/5 z-0" />
              <div className="absolute top-0 md:top-1/2 left-4 md:left-0 w-[2px] md:w-full h-full md:h-[2px] bg-gradient-to-b md:bg-gradient-to-r from-primaryPurple via-accentPink to-transparent z-0 opacity-40 md:animate-glow-sweep" />
              
              <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-0">
                 {[
                   { step: 'Foundation', desc: 'Core Engineering Basics' },
                   { step: 'Development', desc: 'Fullstack Mastery' },
                   { step: 'System Thinking', desc: 'Architectural Scale' }
                 ].map((stage, i) => (
                   <div key={i} className="flex md:flex-col items-center gap-6 group relative z-10">
                      <div className="w-5 h-5 rounded-full bg-[#0a0a14] border-2 border-white/20 group-hover:border-accentPink group-hover:scale-125 transition-all">
                         <div className="absolute inset-0 rounded-full bg-accentPink blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-left md:text-center">
                         <div className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest mb-1 group-hover:text-accentPink transition-colors">{stage.step}</div>
                         <div className="text-[9px] md:text-[10px] text-gray-500 font-mono italic">{stage.desc}</div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* ⚙️ SECTION 6: SYSTEM LOGISTICS */}
        <div className="mb-32 md:mb-40 space-y-12">
           <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">System Logistics</h3>
              <div className="w-16 h-1 bg-gradient-to-r from-primaryPurple to-accentPink mx-auto mt-4 rounded-full" />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {experiences.map((exp, idx) => (
                <div key={idx} className="glass-panel p-8 md:p-10 rounded-[2.5rem] border-white/5 hover:border-accentPink transition-all duration-500 group relative bg-[#0a0a14]/60 overflow-hidden">
                   <div className="absolute -right-4 -bottom-4 text-7xl md:text-9xl font-black text-white/[0.03] italic pointer-events-none">{exp.watermark}</div>
                   <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors mb-8">
                      <i className={`${exp.icon} text-xl md:text-2xl ${exp.iconColor}`}></i>
                   </div>
                   <div className="space-y-4 relative z-10 text-left">
                      <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">{exp.period}</div>
                      <h4 className="text-xl md:text-2xl font-black text-white group-hover:text-accentPink transition-colors leading-tight">{exp.role}</h4>
                      <p className="text-accentPink text-[10px] font-black uppercase tracking-[0.2em]">{exp.org}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* ⚡ SECTION 7: IMPACT SIGNALS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 md:mb-48">
           {[
             { label: 'Projects Built', value: 30, icon: 'fa-code-merge' },
             { label: 'Hackathons', value: 5, icon: 'fa-trophy' },
             { label: 'Core Committees', value: 3, icon: 'fa-users' },
             { label: 'Systems Logic', value: 12, icon: 'fa-gears' }
           ].map((stat, i) => (
             <div key={i} className="text-center group">
                <div className="text-primaryPurple text-lg md:text-xl mb-4 group-hover:text-accentPink">
                   <i className={`fa-solid ${stat.icon}`}></i>
                </div>
                <div className="text-3xl md:text-5xl font-black text-white mb-2 group-hover:text-accentPink transition-colors">
                   <Counter target={stat.value} duration={2000} />+
                </div>
                <div className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em]">{stat.label}</div>
             </div>
           ))}
        </div>

        {/* 🎯 SECTION 9: STRONG CTA */}
        <div className="text-center space-y-10 relative py-20 overflow-hidden">
           <div className="absolute inset-0 bg-primaryPurple/5 blur-[80px] rounded-full scale-150 animate-pulse" />
           <div className="relative z-10 space-y-8 px-4">
              <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[1.1]">
                Let's build something <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryPurple via-accentPink to-secondaryPink">impactful.</span>
              </h2>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <button onClick={() => window.scrollTo(0,0)} className="px-8 py-4 rounded-xl bg-gradient-to-r from-primaryPurple to-accentPink text-white font-black uppercase tracking-widest text-[10px] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all active:scale-95">
                    View Projects
                 </button>
                 <button className="px-8 py-4 rounded-xl border border-white/10 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all active:scale-95">
                    Contact Me
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default About;