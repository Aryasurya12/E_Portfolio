import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, Variants } from 'framer-motion';

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

  return <span ref={countRef}>{count}</span>;
};

// Motion variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const About: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax Setup
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Mouse Parallax for Hero
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mouseX = useSpring(0, { stiffness: 100, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20; // max rotation degrees
    const y = (clientY / innerHeight - 0.5) * 20;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0a14] relative overflow-hidden" onMouseMove={handleMouseMove}>

      {/* 🌌 BACKGROUND ENHANCEMENT */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div style={{ y: y1 }} className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-primaryPurple/5 blur-[140px] rounded-full animate-blob" />
        <motion.div style={{ y: y2 }} className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-secondaryPink/5 blur-[140px] rounded-full animate-blob delay-1000" />

        {/* Subtle Network Lines Background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-40 space-y-32 md:space-y-48">

        {/* 🟣 SECTION 1: IDENTITY SYSTEM (HERO) */}
        <motion.div
          initial="hidden" animate="visible" variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          <motion.div variants={fadeInUp} className="lg:col-span-5 relative group order-2 lg:order-1" style={{ perspective: 1000 }}>
            {/* 3D Tilt Container */}
            <motion.div
              style={!isMobile ? { rotateX: mouseY, rotateY: mouseX } : {}}
              className="relative w-full aspect-[4/5] md:aspect-square rounded-[3rem] border border-white/10 bg-white/[0.02] overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.1)]"
            >
              <img src="/Assests/Profile/Profile_pic.png" className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 scale-105 group-hover:scale-100" alt="Arya" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/40 to-transparent opacity-90" />

              {/* Floating UI Overlays */}
              <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                <span className="text-[9px] font-black text-white uppercase tracking-widest">Active</span>
              </div>

              <div className="absolute bottom-8 left-8">
                <div className="text-[10px] font-black text-accentPink uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                  <i className="fa-solid fa-microchip"></i> Identity Node
                </div>
                <div className="text-4xl font-black text-white tracking-tight">Arya.OS</div>
              </div>

              {/* Floating Code Snippet */}
              <motion.div
                animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-1/4 -left-4 md:-left-8 glass-panel p-3 rounded-xl border-white/10 backdrop-blur-xl hidden md:block shadow-2xl"
              >
                <pre className="text-[8px] font-mono text-accentGlow"><code>{`const SYS = {
  status: "Optimized",
  layer: "Frontend"
};`}</code></pre>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div variants={staggerContainer} className="lg:col-span-7 space-y-8 order-1 lg:order-2 text-center lg:text-left">
            <motion.div variants={fadeInUp} className="space-y-4">
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white relative inline-block">
                System Genesis
                <motion.div
                  initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primaryPurple via-accentPink to-transparent rounded-full"
                />
              </h1>
              <p className="text-gray-500 font-mono text-[10px] md:text-sm tracking-[0.2em] uppercase italic">
                Architecting the bridge between precision and scale
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="glass-panel p-6 md:p-8 rounded-3xl border-white/10 relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primaryPurple to-secondaryPink" />
              <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed">
                "I design systems that bridge <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryPurple to-accentPink font-black italic">intelligent automation</span> with <span className="text-white font-black italic shadow-white/50">real-world usability</span>."
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* 🟣 SECTION 2: TERMINAL PANEL */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
          className="relative max-w-5xl mx-auto"
        >
          <div className="glass-panel rounded-3xl border border-white/10 bg-[#0a0a14]/80 backdrop-blur-3xl overflow-hidden relative group">
            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] opacity-20" />

            <div className="flex items-center gap-2 px-6 py-4 bg-white/[0.02] border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
              <div className="ml-4 text-[10px] font-mono text-gray-500 uppercase tracking-widest">kernel_log.sh</div>
            </div>

            <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              <p className="text-gray-400 font-mono text-sm leading-loose">
                <span className="text-accentPink">&gt;</span> Initiating profile...<br />
                <span className="text-accentPink">&gt;</span> I’m Arya, an Electronics & Computer Science student passionate about building intelligent systems combining <span className="text-white font-bold bg-white/10 px-1 rounded">hardware, software, and AI.</span>
              </p>
              <p className="text-gray-400 font-mono text-sm leading-loose">
                <span className="text-accentGlow">&gt;</span> Analyzing focus parameters...<br />
                <span className="text-accentGlow">&gt;</span> My primary objectives lie in <span className="text-white font-bold border-b border-primaryPurple">IoT Systems</span>, Web Development, and AI Integration.
                <span className="animate-pulse inline-block w-2 h-4 bg-white ml-2 align-middle" />
              </p>
            </div>
          </div>
        </motion.div>


        {/* 🟣 SECTION 4: JOURNEY FLOW */}
        <div className="space-y-16 py-10">
          <h3 className="text-[10px] md:text-xs font-black text-gray-500 uppercase tracking-[0.5em] text-center">Current System State</h3>

          <div className="relative max-w-5xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-8 lg:gap-4">
            {/* Connecting Background Line */}
            <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-primaryPurple via-accentPink to-secondaryPink opacity-30 -translate-y-1/2 z-0" />

            {[
              { title: 'Building', task: 'AI + IoT Automation', tags: ['Python', 'MQTT'], color: 'from-primaryPurple', offset: 'lg:-translate-y-12' },
              { title: 'Learning', task: 'ML Integration', tags: ['FastAPI', 'PyTorch'], color: 'from-accentPink', offset: 'lg:translate-y-12' },
              { title: 'Exploring', task: 'Architecture Systems', tags: ['UI/UX', 'Design'], color: 'from-secondaryPink', offset: 'lg:-translate-y-12' }
            ].map((state, i) => (
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                key={i}
                className={`flex-1 w-full glass-panel p-8 rounded-3xl border border-white/10 relative z-10 group hover:scale-105 transition-transform duration-500 ${state.offset} bg-[#0a0a14]`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${state.color} to-transparent opacity-5 rounded-3xl group-hover:opacity-10 transition-opacity`} />

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-white group-hover:animate-ping" />
                  <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 group-hover:text-white transition-colors">{state.title}</h4>
                </div>

                <div className="text-xl md:text-2xl font-black text-white mb-6 leading-tight">{state.task}</div>

                <div className="flex flex-wrap gap-2">
                  {state.tags.map((tag, j) => (
                    <span key={j} className="text-[9px] font-black uppercase tracking-widest text-white/50 bg-white/5 px-3 py-1 rounded-lg group-hover:text-white group-hover:bg-white/10 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        {/* 🟣 SECTION 6: TIMELINE EXPERIENCE (ZIG-ZAG) */}
        <div className="space-y-20 max-w-5xl mx-auto">
          <div className="text-center">
            <h3 className="text-[10px] md:text-xs font-black text-gray-500 uppercase tracking-[0.5em] mb-4">System Logistics</h3>
            <div className="w-16 h-1 bg-gradient-to-r from-primaryPurple to-accentPink mx-auto rounded-full" />
          </div>

          <div className="relative">
            {/* Central Timeline Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 md:-translate-x-1/2">
              <motion.div
                initial={{ height: 0 }} whileInView={{ height: "100%" }} transition={{ duration: 2, ease: "easeInOut" }} viewport={{ once: true }}
                className="w-full bg-gradient-to-b from-primaryPurple via-accentPink to-secondaryPink shadow-[0_0_15px_#ec4899]"
              />
            </div>

            <div className="space-y-16">
              {experiences.map((exp, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
                    key={idx}
                    className={`relative flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-[#0a0a14] border-[3px] border-accentPink shadow-[0_0_15px_#ec4899] md:-translate-x-1/2 z-20 -translate-x-1/2" />

                    {/* Empty Space for Grid Balancing */}
                    <div className="hidden md:block md:w-1/2" />

                    {/* Content Card */}
                    <div className="w-full md:w-1/2 pl-20 md:pl-0">
                      <div className={`glass-panel p-8 rounded-3xl border border-white/5 hover:border-accentPink/30 transition-all duration-500 group relative overflow-hidden bg-[#0a0a14]/80 hover:-translate-y-2 ${isEven ? 'md:mr-12' : 'md:ml-12'}`}>
                        {/* Watermark */}
                        <div className={`absolute -bottom-4 text-6xl md:text-8xl font-black text-white/[0.02] italic pointer-events-none ${isEven ? 'right-4 text-right' : 'left-4'}`}>
                          {exp.watermark}
                        </div>

                        <div className="flex items-center gap-4 mb-6 relative z-10">
                          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                            <i className={`${exp.icon} text-xl ${exp.iconColor}`}></i>
                          </div>
                          <div>
                            <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">{exp.period}</div>
                            <p className="text-accentPink text-[10px] font-black uppercase tracking-[0.2em]">{exp.org}</p>
                          </div>
                        </div>

                        <h4 className="text-xl md:text-2xl font-black text-white mb-4 relative z-10 group-hover:text-accentPink transition-colors">{exp.role}</h4>
                        <p className="text-sm text-gray-400 font-light leading-relaxed relative z-10">{exp.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 🟣 SECTION 7: LIVE METRICS PANEL */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
          {[
            { label: 'Projects Built', value: 30, icon: 'fa-code-merge' },
            { label: 'Hackathons', value: 5, icon: 'fa-trophy' },
            { label: 'Core Committees', value: 3, icon: 'fa-users' },
            { label: 'Systems Logic', value: 12, icon: 'fa-gears' }
          ].map((stat, i) => (
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              key={i} className="glass-panel p-8 rounded-3xl border border-white/5 text-center group hover:border-accentPink/50 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-primaryPurple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-4 group-hover:border-accentPink transition-colors">
                  <i className={`fa-solid ${stat.icon} text-gray-400 group-hover:text-accentPink transition-colors`}></i>
                </div>
                <div className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-accentPink transition-all">
                  <Counter target={stat.value} duration={2000} />+
                </div>
                <div className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 🟣 SECTION 8: IMPACT PANEL (CTA) */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="relative max-w-4xl mx-auto overflow-hidden rounded-[3rem] p-1 glass-panel border-none"
        >
          {/* Animated Background Wave */}
          <div className="absolute inset-0 bg-gradient-to-br from-primaryPurple via-accentPink to-secondaryPink opacity-20 animate-pulse" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />

          <div className="relative z-10 bg-[#0a0a14]/90 backdrop-blur-2xl rounded-[2.9rem] px-8 py-20 md:py-32 text-center border border-white/10">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-12">
              Let's build something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryPurple via-accentPink to-secondaryPink animate-glow-sweep inline-block">impactful.</span>
            </h2>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button onClick={() => window.scrollTo(0, 0)} className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-primaryPurple to-accentPink text-white font-black uppercase tracking-widest text-[10px] transition-all hover:scale-105 active:scale-95 overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                <span className="relative z-10">View Projects</span>
              </button>
              <button className="px-8 py-4 rounded-xl border border-white/20 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all hover:border-white/40 active:scale-95">
                Contact Me
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;