import React from 'react';

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
    desc: "Leading the organization of departmental events, hackathons, and seminars. Managing volunteer teams and logistics for large-scale campus activities.",
    icon: "fa-solid fa-calendar-check",
    iconColor: "text-accentPink",
    watermark: "ECSA",
  },
  {
    role: "Core Technical Member",
    org: "ECSA",
    period: "Aug 2024 - May 2025",
    desc: "Developed websites for college events and conducted technical workshops for juniors on web development basics and version control.",
    icon: "fa-solid fa-code",
    iconColor: "text-accentGlow",
    watermark: "DEV",
  },
];

const education = [
  {
    degree: "B.E. in Electronics & Computer Science",
    school: "Institute of Technology",
    period: "2023 - 2027",
    grade: "CGPA: 9.2",
    desc: "Specializing in Software Engineering and Embedded Systems. Building a strong foundation in both hardware and software domains.",
    icon: "fa-solid fa-graduation-cap",
    color: "text-primaryPurple",
  },
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-40 px-6 max-w-7xl mx-auto relative z-10">
      
      {/* Header Section */}
      <div className="text-center mb-20 opacity-0 animate-fade-in-up">
        <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primaryPurple via-accentPink to-secondaryPink">
          System Genesis
        </h2>
        <p className="text-gray-400 mt-6 tracking-[0.2em] font-mono text-xs uppercase italic">Architecting the developer behind the code</p>
        <div className="flex justify-center gap-1 mt-4">
           {[...Array(3)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-accentPink/40" />)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Profile Sidebar */}
        <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
          <div className="glass-panel p-10 rounded-[3rem] border-white/10 relative overflow-hidden group bg-[#0a0a14]/60">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primaryPurple/10 blur-3xl rounded-full" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-48 h-48 rounded-[2.5rem] p-1 bg-gradient-to-tr from-primaryPurple via-white/20 to-secondaryPink mb-8 group-hover:scale-105 transition-transform duration-500 shadow-[0_0_40px_rgba(139,92,246,0.3)]">
                 <div className="w-full h-full rounded-[2.3rem] overflow-hidden bg-[#0a0a14]">
                    <img src="/profile.png" className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
                 </div>
              </div>

              <h3 className="text-3xl font-black text-white mb-2">Arya Suryavanshi</h3>
              <p className="text-accentPink font-bold text-xs uppercase tracking-[0.3em] mb-8">AI & Fullstack Engineer</p>
              
              <div className="w-full space-y-4">
                <div className="flex justify-between items-center text-xs font-mono text-gray-500 border-b border-white/5 pb-2">
                   <span>Location</span>
                   <span className="text-white">Maharashtra, IN</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono text-gray-500 border-b border-white/5 pb-2">
                   <span>Availability</span>
                   <span className="text-accentGlow">Remote / Hybrid</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono text-gray-500">
                   <span>Experience</span>
                   <span className="text-white">2nd Year Undergrad</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-[2.5rem] border-white/10 flex items-center justify-around bg-white/5">
             <a href="#" className="text-gray-500 hover:text-primaryPurple transition-all hover:scale-125 text-2xl"><i className="fa-brands fa-github"></i></a>
             <a href="#" className="text-gray-500 hover:text-accentPink transition-all hover:scale-125 text-2xl"><i className="fa-brands fa-linkedin"></i></a>
             <a href="#" className="text-gray-500 hover:text-accentGlow transition-all hover:scale-125 text-2xl"><i className="fa-brands fa-instagram"></i></a>
             <div className="w-[1px] h-8 bg-white/10"></div>
             <a href="/resume.pdf" className="text-gray-500 hover:text-white transition-all hover:rotate-12 text-2xl"><i className="fa-solid fa-file-pdf"></i></a>
          </div>
        </div>

        {/* Main Details Section */}
        <div className="lg:col-span-8 space-y-16">
          
          {/* Bio Section */}
          <div className="glass-panel p-10 lg:p-14 rounded-[3.5rem] border-white/10 relative overflow-hidden bg-[#0a0a14]/40 animate-fade-in-up">
            <i className="fa-solid fa-terminal absolute top-10 right-10 text-8xl text-white/5" />
            <h3 className="text-3xl font-black text-white mb-8 flex items-center gap-3">
               <div className="w-3 h-3 rounded-full bg-accentPink animate-pulse" />
               Kernel Overview
            </h3>
            <p className="text-gray-300 text-xl font-light leading-relaxed mb-6">
              I am an architect of digital infrastructure. My core focus lies in the intersection of <span className="text-primaryPurple font-bold">intuitive interface design</span> and <span className="text-accentPink font-bold">performant systems architecture</span>. 
            </p>
            <p className="text-gray-400 text-lg font-light leading-relaxed">
              Every line of code I construct is a module in a larger mission: enhancing human-digital interaction through smart automation and seamless AI integration. Currently optimizing my stack in my 2nd year at university.
            </p>
          </div>

          {/* Education & Experience Visual Timeline */}
          <div className="space-y-12">
            <h3 className="text-3xl font-black text-white px-4">System Logistics</h3>
            
            <div className="space-y-6">
               {experiences.map((exp, idx) => (
                 <div 
                   key={idx}
                   className="glass-panel p-8 rounded-[2.5rem] border-white/5 hover:border-accentPink transition-all duration-500 flex flex-col md:flex-row gap-8 group relative bg-[#0a0a14]/60 overflow-hidden"
                 >
                   <div className={`absolute -right-4 -bottom-4 text-9xl font-black text-white/[0.03] transition-all group-hover:text-accentPink/[0.05] pointer-events-none select-none italic`}>{exp.watermark}</div>
                   
                   <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shrink-0 group-hover:scale-110 transition-transform">
                      <i className={`${exp.icon} text-2xl ${exp.iconColor}`}></i>
                   </div>

                   <div className="flex-1 space-y-3 relative z-10">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <h4 className="text-2xl font-black text-white group-hover:text-accentPink transition-colors">{exp.role}</h4>
                        <span className="text-[10px] font-mono text-gray-500 bg-white/5 border border-white/10 px-3 py-1 rounded-full">{exp.period}</span>
                      </div>
                      <p className="text-accentPink text-sm font-black uppercase tracking-widest">{exp.org}</p>
                      <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">{exp.desc}</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default About;