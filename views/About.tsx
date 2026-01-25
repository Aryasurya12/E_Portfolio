import React from 'react';

const experiences = [
  {
    role: "Core Technical Member",
    org: "GDG (Google Developer Group)",
    period: "Oct 2025 - Present",
    desc: "Organizing tech events, workshops, and fostering a community of developers. Contributing to technical projects and mentoring peers.",
    icon: "fa-brands fa-google",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10",
    border: "border-blue-500/20",
    hoverBorder: "hover:border-blue-500/50",
    hoverText: "group-hover:text-blue-400",
    watermark: "GDG",
    watermarkColor: "group-hover:text-blue-500/[0.15]"
  },
  {
    role: "Events Co-Head",
    org: "ECSA (Electronics & Computer Science Student Association)",
    period: "July 2025 - Present",
    desc: "Leading the organization of departmental events, hackathons, and seminars. Managing volunteer teams and logistics for large-scale campus activities.",
    icon: "fa-solid fa-calendar-check",
    iconColor: "text-neonCyan",
    iconBg: "bg-neonCyan/10",
    border: "border-neonCyan/20",
    hoverBorder: "hover:border-neonCyan/50",
    hoverText: "group-hover:text-neonCyan",
    watermark: "ECSA",
    watermarkColor: "group-hover:text-neonCyan/[0.15]"
  },
  {
    role: "Core Technical Member",
    org: "ECSA",
    period: "Aug 2024 - May 2025",
    desc: "Developed websites for college events and conducted technical workshops for juniors on web development basics and version control.",
    icon: "fa-solid fa-code",
    iconColor: "text-green-400",
    iconBg: "bg-green-500/10",
    border: "border-green-500/20",
    hoverBorder: "hover:border-green-500/50",
    hoverText: "group-hover:text-green-400",
    watermark: "DEV",
    watermarkColor: "group-hover:text-green-500/[0.15]"
  },
  {
    role: "Volunteer",
    org: "Seva Sahayog & RPG Foundation",
    period: "Aug 2025 - Nov 2025",
    desc: "Contributing to social causes through technology and field work. Helping bridge the digital divide in underprivileged communities through IT literacy drives.",
    icon: "fa-solid fa-hand-holding-heart",
    iconColor: "text-pink-400",
    iconBg: "bg-pink-500/10",
    border: "border-pink-500/20",
    hoverBorder: "hover:border-pink-500/50",
    hoverText: "group-hover:text-pink-400",
    watermark: "VOL",
    watermarkColor: "group-hover:text-pink-500/[0.15]"
  }
];

const education = [
  {
    degree: "B.E. in Electronics & Computer Science",
    school: "Institute of Technology", // Replace with your actual college name
    period: "2023 - 2027",
    grade: "CGPA: 9.2 (Current)",
    desc: "Specializing in Software Engineering and Embedded Systems. Building a strong foundation in both hardware and software domains.",
    courses: ["Data Structures & Algo", "Database Mgmt", "Operating Systems", "Comp. Networks"],
    icon: "fa-solid fa-graduation-cap",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/20"
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    school: "Junior College of Science",
    period: "2021 - 2023",
    grade: "Score: 92%",
    desc: "Core Science stream with focus on Physics, Mathematics and Computer Science.",
    courses: [],
    icon: "fa-solid fa-school",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    border: "border-orange-400/20"
  }
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-32 relative z-10 w-full overflow-hidden">
      
      {/* --- Full-Screen Decorative Background Elements --- */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        
        {/* Large Corner Glows */}
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-neonPurple/5 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-neonCyan/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        
        {/* Perspective Grid Floor */}
        <div className="absolute bottom-0 w-full h-[30vh] bg-gradient-to-t from-neonPurple/5 to-transparent opacity-30 transform perspective-500 rotate-x-60">
           <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        {/* Floating Side Elements for Large Screens */}
        <div className="hidden 2xl:block absolute top-1/3 left-10 text-white/5 text-9xl font-black rotate-90 origin-left select-none">
          PORTFOLIO
        </div>
        <div className="hidden 2xl:block absolute bottom-1/3 right-10 text-white/5 text-9xl font-black -rotate-90 origin-right select-none">
          DEVELOPER
        </div>

        {/* Floating Code Symbols Scattered */}
        <div className="absolute top-40 left-[10%] text-6xl font-mono font-bold text-white/5 rotate-12 animate-blob">
          {`</>`}
        </div>
        <div className="absolute bottom-40 right-[10%] text-8xl font-serif text-white/5 -rotate-12 animate-blob" style={{ animationDelay: '3s' }}>
          {`{ }`}
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up relative">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">About Me</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-neonCyan to-neonPurple mx-auto rounded-full shadow-[0_0_15px_rgba(0,243,255,0.5)]"></div>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
             Beyond the code — my journey, education, and the community work that drives me.
          </p>
        </div>

        {/* Main Grid Layout - 4/8 Split for balanced spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 relative items-start">
          
          {/* Profile Column (Sticky on Desktop) */}
          <div className="lg:col-span-4 flex flex-col gap-6 animate-fade-in-up lg:sticky lg:top-28 h-fit z-30" style={{ animationDelay: '100ms' }}>
            
            {/* Profile Card */}
            <div className="glass-panel rounded-3xl p-8 border-neonPurple/20 flex flex-col items-center text-center relative overflow-hidden group transition-all duration-500 hover:shadow-[0_0_30px_rgba(188,19,254,0.15)]">
              {/* Decorative background glow inside card */}
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-neonPurple/10 to-transparent transition-opacity duration-500 group-hover:opacity-100 opacity-70"></div>
              
              {/* Profile Image Container */}
              <div className="w-48 h-48 mb-6 relative z-10 group-hover:scale-105 transition-transform duration-500">
                 {/* Spinning border effect */}
                 <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-neonCyan via-transparent to-neonPurple animate-[spin_4s_linear_infinite] opacity-70 group-hover:opacity-100 transition-opacity blur-sm"></div>
                 <div className="absolute inset-[3px] rounded-full bg-[#0f172a] z-10"></div>
                 
                 {/* Image Wrapper */}
                 <div className="absolute inset-[6px] rounded-full overflow-hidden border-2 border-white/10 z-20 group-hover:border-white/30 transition-colors cursor-pointer">
                    <img 
                      src="https://picsum.photos/300/300?grayscale" 
                      alt="Arya Pramod Suryavanshi" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0" 
                    />
                    {/* Scanline overlay effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neonCyan/20 to-transparent opacity-0 group-hover:animate-pulse z-30 pointer-events-none mix-blend-overlay"></div>
                 </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-neonCyan transition-colors">Arya P. Suryavanshi</h3>
              <p className="text-neonCyan font-medium mb-6 bg-neonCyan/10 px-6 py-1.5 rounded-full border border-neonCyan/20 shadow-[0_0_10px_rgba(0,243,255,0.1)] text-sm">Frontend & Mobile Developer</p>
              
              <div className="flex flex-wrap justify-center gap-3 w-full">
                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 hover:bg-white/10 transition-colors cursor-default flex items-center">
                  <i className="fa-solid fa-location-dot mr-2 text-neonPurple"></i> India
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 hover:bg-white/10 transition-colors cursor-default flex items-center">
                  <i className="fa-solid fa-graduation-cap mr-2 text-neonCyan"></i> ECS Student
                </span>
              </div>
            </div>

            {/* Socials Quick Links */}
            <div className="glass-panel rounded-2xl p-6 flex justify-around items-center animate-fade-in-up hover:border-white/20 transition-all duration-300" style={{ animationDelay: '200ms' }}>
               <a href="#" className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors group relative p-1">
                 <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 border border-white/5 group-hover:border-white/20 transition-all z-10">
                   <i className="fa-brands fa-github text-xl"></i>
                 </div>
                 <span className="text-[10px] uppercase font-bold tracking-wider opacity-70 group-hover:opacity-100 transition-opacity">GitHub</span>
               </a>
               <a href="#" className="flex flex-col items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors group relative p-1">
                 <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 border border-white/5 group-hover:border-blue-500/30 transition-all z-10">
                   <i className="fa-brands fa-linkedin-in text-xl"></i>
                 </div>
                 <span className="text-[10px] uppercase font-bold tracking-wider opacity-70 group-hover:opacity-100 transition-opacity">LinkedIn</span>
               </a>
               <a href="#" className="flex flex-col items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors group relative p-1">
                 <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-pink-500/20 border border-white/5 group-hover:border-pink-500/30 transition-all z-10">
                   <i className="fa-brands fa-instagram text-xl"></i>
                 </div>
                 <span className="text-[10px] uppercase font-bold tracking-wider opacity-70 group-hover:opacity-100 transition-opacity">Insta</span>
               </a>
            </div>

            {/* Resume Download Button */}
            <a 
              href="/resume.pdf" 
              download="Arya_Suryavanshi_Resume"
              className="group relative w-full py-4 rounded-2xl bg-gradient-to-r from-neonPurple/20 to-neonCyan/20 border border-white/10 hover:border-neonCyan/50 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden shadow-lg shadow-black/20 animate-fade-in-up"
              style={{ animationDelay: '250ms' }}
            >
              <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform relative z-10">
                <i className="fa-solid fa-file-arrow-down text-neonCyan text-lg"></i>
              </div>
              <span className="font-bold text-white tracking-wide relative z-10">Download Resume</span>
            </a>
            
            {/* Quick Stats / Filler Content */}
            <div className="glass-panel p-6 rounded-2xl border-white/5 relative overflow-hidden group animate-fade-in-up" style={{ animationDelay: '300ms' }}>
               <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-white/10 pb-2 flex justify-between items-center">
                 <span>By The Numbers</span>
                 <i className="fa-solid fa-chart-pie text-gray-600"></i>
               </h4>
               <div className="grid grid-cols-2 gap-4">
                   <div className="text-center p-2 rounded-lg bg-white/5 border border-white/5 hover:border-neonCyan/30 transition-colors">
                       <div className="text-xl font-bold text-neonCyan">15+</div>
                       <div className="text-[9px] text-gray-500 uppercase tracking-wide">Projects</div>
                   </div>
                   <div className="text-center p-2 rounded-lg bg-white/5 border border-white/5 hover:border-neonPurple/30 transition-colors">
                       <div className="text-xl font-bold text-neonPurple">450+</div>
                       <div className="text-[9px] text-gray-500 uppercase tracking-wide">Commits</div>
                   </div>
                   <div className="text-center p-2 rounded-lg bg-white/5 border border-white/5 hover:border-pink-500/30 transition-colors">
                       <div className="text-xl font-bold text-pink-500">∞</div>
                       <div className="text-[9px] text-gray-500 uppercase tracking-wide">Coffee</div>
                   </div>
                   <div className="text-center p-2 rounded-lg bg-white/5 border border-white/5 hover:border-yellow-400/30 transition-colors">
                       <div className="text-xl font-bold text-yellow-400">24/7</div>
                       <div className="text-[9px] text-gray-500 uppercase tracking-wide">Uptime</div>
                   </div>
               </div>
            </div>

          </div>

          {/* Bio, Education & Experience Column */}
          <div className="lg:col-span-8 flex flex-col gap-10 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            
            {/* Bio Card */}
            <div className="glass-panel rounded-3xl p-8 lg:p-10 relative overflow-hidden group hover:border-neonCyan/30 transition-colors duration-500">
              {/* Background pattern inside bio */}
              <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-bl from-neonCyan/5 to-transparent rounded-bl-full pointer-events-none"></div>
              
              <i className="fa-solid fa-quote-right absolute top-8 right-8 text-7xl text-white/5 group-hover:text-neonCyan/10 transition-colors duration-500"></i>
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
                Who am I? 
                <span className="w-2.5 h-2.5 rounded-full bg-neonCyan animate-pulse"></span>
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg mb-8 relative z-10">
                I'm a <span className="text-neonCyan font-semibold">2nd Year ECS Student</span> with a relentless passion for technology. 
                My journey involves bridging the gap between design and functionality. 
                I don't just write code; I craft intuitive digital experiences. 
                Whether it's building complex mobile apps with Flutter or responsive web interfaces with React, 
                I aim for <span className="text-neonPurple font-semibold">pixel perfection</span>.
              </p>
              <div className="flex flex-wrap gap-3 relative z-10">
                 <span className="px-5 py-2.5 rounded-xl bg-neonCyan/10 text-neonCyan border border-neonCyan/20 text-sm font-bold flex items-center gap-2 hover:bg-neonCyan/20 transition-colors hover:scale-105 transform duration-200">
                   <i className="fa-solid fa-palette"></i> UI/UX Enthusiast
                 </span>
                 <span className="px-5 py-2.5 rounded-xl bg-neonPurple/10 text-neonPurple border border-neonPurple/20 text-sm font-bold flex items-center gap-2 hover:bg-neonPurple/20 transition-colors hover:scale-105 transform duration-200">
                   <i className="fa-solid fa-mobile-screen"></i> Mobile Dev
                 </span>
                 <span className="px-5 py-2.5 rounded-xl bg-pink-500/10 text-pink-500 border border-pink-500/20 text-sm font-bold flex items-center gap-2 hover:bg-pink-500/20 transition-colors hover:scale-105 transform duration-200">
                   <i className="fa-brands fa-react"></i> React Dev
                 </span>
              </div>
            </div>

            {/* Sections Container */}
            <div className="space-y-12 relative">
               
               {/* Decorative Timeline Line running down the left */}
               <div className="absolute left-[23px] top-12 bottom-12 w-0.5 bg-gradient-to-b from-yellow-400/20 via-neonCyan/20 to-transparent hidden sm:block"></div>

               {/* Education Section */}
               <div className="relative">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-[#0f172a] border border-yellow-400/50 flex items-center justify-center shadow-[0_0_10px_rgba(250,204,21,0.2)] shrink-0">
                      <i className="fa-solid fa-graduation-cap text-yellow-400 text-lg"></i>
                    </div>
                    Education
                  </h3>
                  <div className="space-y-6 sm:pl-20">
                    {education.map((edu, index) => (
                      <div 
                        key={index}
                        className={`glass-panel p-6 lg:p-8 rounded-2xl border ${edu.border} hover:bg-white/5 transition-all group relative`}
                      >
                        {/* Mobile Connector Line */}
                        <div className="absolute left-[-39px] top-8 w-8 h-0.5 bg-yellow-400/20 hidden sm:block"></div>
                        <div className="absolute left-[-43px] top-[29px] w-2.5 h-2.5 rounded-full bg-yellow-400 hidden sm:block shadow-[0_0_8px_rgba(250,204,21,0.6)]"></div>

                        <div className="flex items-start gap-5">
                          <div className={`w-12 h-12 rounded-xl ${edu.bg} flex items-center justify-center ${edu.color} border border-white/5 shrink-0 shadow-lg hidden xs:flex`}>
                            <i className={`${edu.icon} text-xl`}></i>
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                               <h4 className="text-xl font-bold text-white group-hover:text-yellow-200 transition-colors">{edu.degree}</h4>
                               <span className="text-xs font-mono text-gray-400 border border-white/10 px-3 py-1 rounded-full bg-black/20 whitespace-nowrap w-fit">{edu.period}</span>
                            </div>
                            <p className="text-yellow-400/80 text-base font-medium mb-3">{edu.school} • {edu.grade}</p>
                            <p className="text-gray-400 text-sm leading-relaxed mb-4">{edu.desc}</p>
                            
                            {edu.courses.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {edu.courses.map(course => (
                                  <span key={course} className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-white/5 text-gray-400 border border-white/5 hover:text-white transition-colors">
                                    {course}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>

               {/* Experience Section */}
               <div className="relative">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-[#0f172a] border border-neonCyan/50 flex items-center justify-center shadow-[0_0_10px_rgba(0,243,255,0.2)] shrink-0">
                      <i className="fa-solid fa-briefcase text-neonCyan text-lg"></i>
                    </div>
                    Experience & Community
                  </h3>
                  <div className="space-y-6 sm:pl-20">
                    {experiences.map((exp, index) => (
                      <div 
                        key={index}
                        className={`glass-panel p-6 lg:p-8 rounded-2xl flex flex-col sm:flex-row gap-5 sm:items-start hover:bg-white/5 transition-all hover:-translate-y-1 border ${exp.border} ${exp.hoverBorder} group relative overflow-hidden`}
                      >
                         {/* Mobile Connector Line */}
                         <div className="absolute left-[-39px] top-8 w-8 h-0.5 bg-neonCyan/20 hidden sm:block"></div>
                         <div className={`absolute left-[-43px] top-[29px] w-2.5 h-2.5 rounded-full hidden sm:block shadow-[0_0_8px_currentColor] ${exp.iconColor.replace('text-', 'bg-')}`}></div>

                         {/* Watermark */}
                        <div className={`absolute right-0 top-1/2 -translate-y-1/2 text-8xl sm:text-9xl text-white/[0.04] -mr-8 ${exp.watermarkColor} transition-colors font-black pointer-events-none select-none z-0 rotate-12`}>
                          {exp.watermark}
                        </div>

                        <div className={`w-12 h-12 shrink-0 rounded-full ${exp.iconBg} flex items-center justify-center ${exp.iconColor} group-hover:scale-110 transition-transform border border-white/10 z-10 shadow-lg hidden xs:flex`}>
                          <i className={`${exp.icon} text-xl`}></i>
                        </div>
                        
                        <div className="z-10 relative flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 md:gap-4 mb-3">
                            <div>
                              <h4 className={`text-xl font-bold text-white ${exp.hoverText} transition-colors`}>{exp.role}</h4>
                              <p className="text-neonCyan text-sm font-medium">{exp.org}</p>
                            </div>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-gray-300 border border-white/10 whitespace-nowrap h-fit">
                              {exp.period}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {exp.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>

            {/* Footer / Signature decoration */}
            <div className="mt-8 flex justify-center opacity-50">
               <div className="flex gap-2">
                 {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse" style={{ animationDelay: `${i * 200}ms` }}></div>
                 ))}
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default About;