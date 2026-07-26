import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, Variants } from 'framer-motion';

const RESUME_URL = "/Assests/Profile/Arya_Suryavanshi_Resume.pdf";

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

const thoughts = [
  {
    type: "EXPLORATION // HEALTHCARE AI",
    title: "Can diabetes screening go beyond retinal images?",
    description:
      "While exploring AI/ML project ideas in healthcare, I came across the growing use of retinal images for diabetic retinopathy detection. It made me interested in whether other measurable signals could contribute to earlier or less invasive diabetes screening.",
    question:
      "Could combining multiple non-invasive signals provide useful information for diabetes risk screening?",
    tags: ["Machine Learning", "Healthcare AI", "Research Exploration"],
    date: "JUL 2026"
  },
  {
    type: "BUILDING // KRUSHIT",
    title: "Can technology make agricultural decisions simpler?",
    description:
      "While working on Krushit, I started thinking about how agricultural technology should do more than just provide data. Farmers may have access to weather, crop and market information, but the real value comes from turning that information into decisions that are simple and useful.",
    question:
      "How can AI transform agricultural data into recommendations that are actually practical for farmers?",
    tags: ["AgriTech", "AI", "Data", "Decision Support"],
    date: "2026"
  },
  {
    type: "BUILDING // SHESPEAKS",
    title: "Building technology for sensitive problems requires more than features",
    description:
      "Working on SheSpeaks made me think about how differently technology needs to be designed when users may be dealing with sensitive situations. Privacy, accessibility and the way information is communicated can become just as important as the technical functionality itself.",
    question:
      "How can we design technology that feels safe and trustworthy while still being useful?",
    tags: ["Human-Centered Tech", "Privacy", "Accessibility", "Social Impact"],
    date: "2026"
  }
];

const currentFocus = [
  {
    status: "BUILDING",
    title: "Krushit",
    description: "Building an AgriTech platform that turns agricultural data into simple, practical insights and decision support for farmers.",
    tags: ["AgriTech", "AI", "Data", "Web"],
    color: "from-primaryPurple"
  },
  {
    status: "BUILDING",
    title: "SheSpeaks",
    description: "Developing a human-centered platform focused on creating a safe, accessible and privacy-conscious digital experience for women.",
    tags: ["Web", "Privacy", "Social Impact", "UI/UX"],
    color: "from-primaryPink"
  },
  {
    status: "LEARNING",
    title: "Machine Learning & Applied AI",
    description: "Strengthening my understanding of ML workflows, model development and practical AI integration.",
    tags: ["Python", "Scikit-learn", "Data", "ML"],
    color: "from-accentPink"
  },
  {
    status: "EXPLORING",
    title: "AI Research & Intelligent Systems",
    description: "Exploring research directions where machine learning can solve meaningful real-world problems.",
    tags: ["AI Research", "Computer Vision", "Intelligent Systems"],
    color: "from-secondaryPink"
  }
];

// Shared Framer Motion Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const ResumeActions: React.FC = () => (
  <div className="flex flex-wrap gap-4 mt-8">
    <a
      href={RESUME_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 hover:-translate-y-1 transition-all group flex items-center gap-2"
    >
      VIEW RESUME <i className="fa-solid fa-arrow-up-right-from-square text-accentPink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"></i>
    </a>
    <a
      href={RESUME_URL}
      download
      className="px-6 py-3 rounded-xl bg-gradient-to-r from-primaryPurple to-secondaryPink text-[10px] font-black uppercase tracking-widest text-white hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:-translate-y-1 transition-all group flex items-center gap-2"
    >
      DOWNLOAD PDF <i className="fa-solid fa-download group-hover:translate-y-0.5 transition-transform"></i>
    </a>
  </div>
);

const About: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

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
    const x = (clientX / innerWidth - 0.5) * 15;
    const y = (clientY / innerHeight - 0.5) * 15;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0a14] relative overflow-hidden" onMouseMove={handleMouseMove}>

      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div style={{ y: y1 }} className="absolute top-0 -left-20 w-[500px] h-[500px] bg-primaryPurple/5 blur-[120px] rounded-full" />
        <motion.div style={{ y: y2 }} className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-secondaryPink/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-32 pb-40 space-y-24 md:space-y-32">

        {/* HERO / IDENTITY */}
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          <motion.div variants={fadeInUp} className="lg:col-span-5 relative group order-2 lg:order-1" style={{ perspective: 1000 }}>
            <motion.div
              style={!isMobile ? { rotateX: mouseY, rotateY: mouseX } : {}}
              className="relative w-full aspect-[4/5] md:aspect-square rounded-[3rem] border border-white/10 bg-white/[0.02] overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.1)]"
            >
              <img src="/Assests/Profile/Profile_pic.png" className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 scale-105 group-hover:scale-100" alt="Arya" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/40 to-transparent opacity-90" />

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
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp} className="lg:col-span-7 order-1 lg:order-2 space-y-8">
            <h2 className="text-sm font-black text-gray-500 uppercase tracking-[0.4em]">BEHIND THE SYSTEM</h2>
            <div className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
              <div className="flex flex-col gap-2">
                <span className="text-white">Curiosity <span className="text-gray-600">→</span></span>
                <span className="text-white">Code <span className="text-gray-600">→</span></span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryPurple to-secondaryPink">Intelligent Systems</span>
              </div>
            </div>
            <p className="text-lg text-gray-400 font-light leading-relaxed max-w-xl">
              I enjoy turning ideas into systems — from software and intelligent models to connected hardware.
            </p>
            <div className="py-4 border-y border-white/5 max-w-md">
              <div className="text-[11px] font-mono text-gray-400 leading-loose">
                <span className="text-white font-bold">Electronics & Computer Science Student</span><br />
                Developer · AI/ML Explorer · IoT Builder
              </div>
            </div>
            <ResumeActions />
          </motion.div>
        </motion.div>

        {/* 01 // ABOUT */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <h3 className="text-[10px] font-mono text-accentPink uppercase tracking-widest mb-4">01 // ABOUT</h3>
              <h2 className="text-3xl md:text-4xl font-black text-white">MORE THAN A STACK</h2>
            </div>
            <div className="lg:col-span-8 space-y-6 text-gray-400 text-sm md:text-base leading-relaxed font-light">
              <p>
                I'm Arya, an <span className="text-white font-medium">Electronics & Computer Science</span> student interested in building systems where <span className="text-white font-medium">software, AI and electronics</span> intersect.
              </p>
              <p>
                I enjoy moving between different layers of technology — developing applications, experimenting with machine learning, working with IoT systems, and understanding how these pieces can solve practical problems.
              </p>
              <p>
                Currently, I'm especially interested in <span className="text-white font-medium">AI/ML</span>, <span className="text-white font-medium">intelligent systems</span>, <span className="text-white font-medium">full-stack development</span> and <span className="text-white font-medium">IoT</span>.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 02 // SIGNAL FEED */}
        <div className="pt-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="mb-12">
            <h3 className="text-[10px] font-mono text-accentPink uppercase tracking-widest mb-4">02 // SIGNAL FEED</h3>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">WHAT I'VE BEEN EXPLORING</h2>
            <p className="text-gray-400 text-sm">Notes, questions and perspectives from the technology I read about.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {thoughts.map((thought, idx) => (
              <motion.div
                key={idx}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
                className="glass-panel p-8 rounded-[2rem] border border-white/5 bg-[#0a0a14]/60 hover:bg-white/[0.02] hover:border-white/20 transition-all group flex flex-col relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primaryPurple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-6 flex justify-between items-center relative z-10">
                  <span className="text-primaryPurple group-hover:text-accentPink transition-colors">{thought.type}</span>
                  <span>{thought.date}</span>
                </div>

                <h4 className="text-xl font-black text-white mb-4 leading-tight relative z-10">{thought.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-6 flex-1 relative z-10">{thought.description}</p>

                <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/5 relative z-10">
                  <div className="text-[8px] font-black uppercase text-gray-500 mb-2 tracking-widest">QUESTION GENERATED:</div>
                  <div className="text-xs text-accentPink font-medium leading-relaxed">{thought.question}</div>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                  {thought.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-gray-500 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 group-hover:border-white/10 group-hover:text-gray-300 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 03 // CURRENTLY */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <h3 className="text-[10px] font-mono text-accentPink uppercase tracking-widest mb-4">03 // CURRENTLY</h3>
              <h2 className="text-3xl md:text-4xl font-black text-white">WHAT I'M WORKING TOWARD</h2>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 gap-6">
              {currentFocus.map((focus, idx) => (
                <div key={idx} className="glass-panel p-6 md:p-8 rounded-[2rem] border border-white/5 bg-[#0a0a14]/60 flex flex-col md:flex-row gap-6 items-start group hover:border-white/10 transition-all">
                  <div className="flex items-center gap-3 shrink-0 md:w-32 pt-1">
                    <div className="w-2 h-2 rounded-full bg-white group-hover:animate-ping" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-white transition-colors">{focus.status}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-black text-white mb-2">{focus.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4">{focus.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {focus.tags.map(tag => (
                        <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-gray-500 bg-white/5 px-2.5 py-1 rounded border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 04 // JOURNEY */}
        <div className="pt-10">
          <div className="text-center mb-16">
            <h3 className="text-[10px] font-mono text-accentPink uppercase tracking-widest mb-4">04 // JOURNEY</h3>
            <h2 className="text-3xl md:text-4xl font-black text-white">BEYOND THE CODE</h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Central Timeline Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 md:-translate-x-1/2">
              <motion.div
                initial={{ height: 0 }} whileInView={{ height: "100%" }} transition={{ duration: 1.5, ease: "easeInOut" }} viewport={{ once: true }}
                className="w-full bg-gradient-to-b from-primaryPurple via-accentPink to-secondaryPink shadow-[0_0_15px_#ec4899]"
              />
            </div>

            <div className="space-y-12">
              {experiences.map((exp, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
                    key={idx}
                    className={`relative flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    <div className="absolute left-8 md:left-1/2 w-3 h-3 rounded-full bg-[#0a0a14] border-[2px] border-accentPink shadow-[0_0_10px_#ec4899] md:-translate-x-1/2 z-20 -translate-x-[4.5px]" />
                    <div className="hidden md:block md:w-1/2" />

                    <div className="w-full md:w-1/2 pl-16 md:pl-0">
                      <div className={`glass-panel p-6 md:p-8 rounded-[2rem] border border-white/5 hover:border-accentPink/30 transition-all duration-500 group relative overflow-hidden bg-[#0a0a14]/80 hover:-translate-y-1 ${isEven ? 'md:mr-8' : 'md:ml-8'}`}>
                        <div className={`absolute -bottom-4 text-5xl md:text-7xl font-black text-white/[0.02] italic pointer-events-none ${isEven ? 'right-4 text-right' : 'left-4'}`}>
                          {exp.watermark}
                        </div>
                        <div className="flex items-center gap-4 mb-4 relative z-10">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                            <i className={`${exp.icon} text-lg ${exp.iconColor}`}></i>
                          </div>
                          <div>
                            <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">{exp.period}</div>
                            <p className="text-accentPink text-[10px] font-black uppercase tracking-[0.2em]">{exp.org}</p>
                          </div>
                        </div>
                        <h4 className="text-lg font-black text-white mb-2 relative z-10">{exp.role}</h4>
                        <p className="text-gray-400 text-xs leading-relaxed relative z-10">{exp.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 05 // PROFILE */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="pt-10 border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-[10px] font-mono text-accentPink uppercase tracking-widest mb-4">05 // PROFILE</h3>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">THE FULL PICTURE</h2>
              <p className="text-gray-400 text-sm font-light leading-relaxed mb-8">
                Projects show what I build. The resume connects the rest — capturing education, experience, and the comprehensive scope of my technical involvement.
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {['Education', 'Experience', 'Projects', 'Technical Skills', 'Certifications', 'Leadership'].map(item => (
                  <span key={item} className="px-3 py-1.5 rounded-lg bg-white/5 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                    {item}
                  </span>
                ))}
              </div>
              <ResumeActions />
            </div>
          </div>
        </motion.div>

        {/* FINAL CTA */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="pt-10 pb-10">
          <div className="glass-panel p-10 md:p-16 rounded-[3rem] border border-white/10 bg-gradient-to-b from-primaryPurple/5 to-[#0a0a14] relative overflow-hidden text-center group">
            <div className="absolute inset-0 bg-gradient-to-r from-primaryPurple/10 to-secondaryPink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 relative z-10">
              Let's build something<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryPurple to-secondaryPink">impactful.</span>
            </h2>

            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <a href="/projects" className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-colors">
                View Projects
              </a>
              <a href="/contact" className="px-8 py-4 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-colors">
                Contact Me
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;