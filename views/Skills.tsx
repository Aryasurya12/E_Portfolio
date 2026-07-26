import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// DATA ARCHITECTURE
// ============================================================================

type GraphMode = 'ECOSYSTEM' | 'AI / ML' | 'SOFTWARE' | 'TOOLCHAIN';
type NodeType = 'os' | 'domain' | 'core' | 'support';
type DomainId = 'software' | 'aiml' | 'toolchain' | 'none';

interface SkillProof {
  usedFor: string[];
  experience: string[];
  connected: string[];
}

interface SkillNode {
  id: string;
  label: string;
  type: NodeType;
  domain: DomainId;
  baseX: number; // 0-100
  baseY: number; // 0-100
  connections: string[];
  proof?: SkillProof;
}

const NODES: SkillNode[] = [
  // CENTRAL HUB
  { id: 'os', label: 'ARYA.OS', type: 'os', domain: 'none', baseX: 50, baseY: 50, connections: ['dom-soft', 'dom-aiml', 'dom-tool'] },

  // DOMAINS
  { id: 'dom-soft', label: 'SOFTWARE', type: 'domain', domain: 'software', baseX: 25, baseY: 35, connections: ['react', 'js', 'html', 'node', 'fastapi', 'rest', 'supabase', 'python', 'java'] },
  { id: 'dom-aiml', label: 'AI / ML', type: 'domain', domain: 'aiml', baseX: 75, baseY: 35, connections: ['python', 'ml', 'pandas', 'numpy', 'sklearn', 'dataproc', 'modeldev'] },
  { id: 'dom-tool', label: 'TOOLCHAIN', type: 'domain', domain: 'toolchain', baseX: 50, baseY: 80, connections: ['git', 'github', 'docker', 'vscode', 'matlab', 'autocad'] },

  // SHARED FOUNDATIONAL
  {
    id: 'python', label: 'Python', type: 'core', domain: 'aiml', baseX: 50, baseY: 35, connections: ['ml', 'fastapi', 'dataproc'],
    proof: {
      usedFor: ['AI/ML', 'Backend APIs', 'Data Pipelines', 'Automation'],
      experience: ['Machine Learning Models', 'FastAPI Backend', 'Data Processing Scripts'],
      connected: ['Machine Learning', 'FastAPI', 'Pandas', 'NumPy']
    }
  },
  {
    id: 'java', label: 'Java', type: 'core', domain: 'software', baseX: 35, baseY: 45, connections: [],
    proof: { usedFor: ['Object-Oriented Design', 'Enterprise Software'], experience: ['Core Algorithms', 'System Architecture'], connected: ['SOFTWARE'] }
  },
  {
    id: 'js', label: 'JavaScript', type: 'core', domain: 'software', baseX: 15, baseY: 45, connections: ['react', 'node'],
    proof: { usedFor: ['Frontend Logic', 'Backend Runtime', 'Full Stack'], experience: ['React Applications', 'Node.js Services'], connected: ['React', 'Node.js', 'HTML/CSS'] }
  },

  // SOFTWARE
  { id: 'react', label: 'React', type: 'core', domain: 'software', baseX: 10, baseY: 30, connections: ['html'], proof: { usedFor: ['Client-Side UI', 'Component Systems'], experience: ['Portfolio Development', 'Web Apps'], connected: ['JavaScript', 'HTML/CSS'] } },
  { id: 'html', label: 'HTML/CSS', type: 'support', domain: 'software', baseX: 5, baseY: 40, connections: [], proof: { usedFor: ['Semantic Layouts', 'Styling & Animation'], experience: ['Responsive Interfaces'], connected: ['React', 'JavaScript'] } },
  { id: 'node', label: 'Node.js', type: 'core', domain: 'software', baseX: 20, baseY: 20, connections: ['rest'], proof: { usedFor: ['Backend Logic', 'API Gateways'], experience: ['Server Architectures'], connected: ['JavaScript', 'REST APIs'] } },
  { id: 'fastapi', label: 'FastAPI', type: 'core', domain: 'software', baseX: 35, baseY: 25, connections: ['rest'], proof: { usedFor: ['High-Performance APIs', 'Python Backends'], experience: ['Currently Learning', 'Microservices'], connected: ['Python', 'REST APIs'] } },
  { id: 'rest', label: 'REST APIs', type: 'support', domain: 'software', baseX: 25, baseY: 15, connections: ['supabase'], proof: { usedFor: ['System Communication', 'Data Fetching'], experience: ['Backend Integrations'], connected: ['Node.js', 'FastAPI'] } },
  { id: 'supabase', label: 'Supabase', type: 'core', domain: 'software', baseX: 15, baseY: 10, connections: [], proof: { usedFor: ['Database Management', 'Auth', 'BaaS'], experience: ['Application Backends'], connected: ['REST APIs', 'React'] } },

  // AI / ML
  { id: 'ml', label: 'Machine Learning', type: 'core', domain: 'aiml', baseX: 85, baseY: 25, connections: ['sklearn', 'modeldev'], proof: { usedFor: ['Predictive Modeling', 'Pattern Recognition'], experience: ['L&T Project', 'Model Training'], connected: ['Python', 'Scikit-learn'] } },
  { id: 'pandas', label: 'Pandas', type: 'core', domain: 'aiml', baseX: 65, baseY: 25, connections: ['dataproc'], proof: { usedFor: ['Data Manipulation', 'Analysis'], experience: ['Data Cleaning', 'Feature Engineering'], connected: ['Python', 'Data Processing'] } },
  { id: 'numpy', label: 'NumPy', type: 'support', domain: 'aiml', baseX: 70, baseY: 15, connections: ['dataproc'], proof: { usedFor: ['Numerical Computation', 'Matrix Math'], experience: ['Algorithm Optimization'], connected: ['Python', 'Pandas'] } },
  { id: 'sklearn', label: 'Scikit-learn', type: 'core', domain: 'aiml', baseX: 95, baseY: 35, connections: [], proof: { usedFor: ['Standard ML Models', 'Evaluation'], experience: ['Classification', 'Regression Tasks'], connected: ['Machine Learning', 'Model Development'] } },
  { id: 'dataproc', label: 'Data Processing', type: 'support', domain: 'aiml', baseX: 80, baseY: 15, connections: [], proof: { usedFor: ['Pipelines', 'ETL'], experience: ['Data Preparation'], connected: ['Pandas', 'NumPy'] } },
  { id: 'modeldev', label: 'Model Development', type: 'support', domain: 'aiml', baseX: 90, baseY: 45, connections: [], proof: { usedFor: ['Training', 'Validation'], experience: ['Hyperparameter Tuning'], connected: ['Machine Learning', 'Scikit-learn'] } },

  // TOOLCHAIN
  { id: 'git', label: 'Git', type: 'support', domain: 'toolchain', baseX: 35, baseY: 65, connections: ['github'], proof: { usedFor: ['Version Control'], experience: ['Source Management'], connected: ['GitHub'] } },
  { id: 'github', label: 'GitHub', type: 'support', domain: 'toolchain', baseX: 45, baseY: 65, connections: [], proof: { usedFor: ['Collaboration', 'CI/CD'], experience: ['Repository Hosting'], connected: ['Git'] } },
  { id: 'docker', label: 'Docker', type: 'support', domain: 'toolchain', baseX: 65, baseY: 65, connections: [], proof: { usedFor: ['Containerization', 'Deployment'], experience: ['Isolated Environments'], connected: ['TOOLCHAIN'] } },
  { id: 'vscode', label: 'VS Code', type: 'support', domain: 'toolchain', baseX: 55, baseY: 65, connections: [], proof: { usedFor: ['Primary IDE'], experience: ['Code Editing', 'Extensions'], connected: ['TOOLCHAIN'] } },
  { id: 'matlab', label: 'MATLAB', type: 'support', domain: 'toolchain', baseX: 40, baseY: 90, connections: [], proof: { usedFor: ['Mathematical Modeling'], experience: ['Algorithm Simulation'], connected: ['TOOLCHAIN'] } },
  { id: 'autocad', label: 'AutoCAD', type: 'support', domain: 'toolchain', baseX: 60, baseY: 90, connections: [], proof: { usedFor: ['2D/3D Drafting'], experience: ['Hardware Enclosures'], connected: ['TOOLCHAIN'] } },
];

// ============================================================================
// HELPER LOGIC
// ============================================================================

const getModeStyles = (node: SkillNode, mode: GraphMode) => {
  if (mode === 'ECOSYSTEM') return { x: node.baseX, y: node.baseY, opacity: 1, scale: 1 };

  const isMatch = (mode === 'SOFTWARE' && node.domain === 'software') ||
    (mode === 'AI / ML' && node.domain === 'aiml') ||
    node.type === 'os';

  const isSharedCore = node.id === 'python' && (mode === 'SOFTWARE' || mode === 'AI / ML');

  if (isMatch || isSharedCore) {
    // Pull towards center slightly for focus
    const dx = 50 - node.baseX;
    const dy = 50 - node.baseY;
    return { x: node.baseX + (dx * 0.2), y: node.baseY + (dy * 0.2), opacity: 1, scale: 1.1 };
  } else {
    // Push away and dim
    const dx = node.baseX - 50;
    const dy = node.baseY - 50;
    return { x: node.baseX + (dx * 0.3), y: node.baseY + (dy * 0.3), opacity: 0.15, scale: 0.8 };
  }
};

const getConnectedIds = (nodeId: string, links: any[]) => {
  const connected = new Set<string>();
  links.forEach(l => {
    if (l.source.id === nodeId) connected.add(l.target.id);
    if (l.target.id === nodeId) connected.add(l.source.id);
  });
  return connected;
};

// ============================================================================
// COMPONENTS
// ============================================================================

const Skills: React.FC = () => {
  const [mode, setMode] = useState<GraphMode>('ECOSYSTEM');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedProof, setSelectedProof] = useState<SkillNode | null>(null);

  // Precompute symmetric connections
  const links = useMemo(() => {
    const lines: { source: SkillNode; target: SkillNode; id: string }[] = [];
    const processed = new Set<string>();
    NODES.forEach(node => {
      node.connections.forEach(targetId => {
        const target = NODES.find(n => n.id === targetId);
        if (target) {
          const linkId = [node.id, targetId].sort().join('-');
          if (!processed.has(linkId)) {
            lines.push({ source: node, target, id: linkId });
            processed.add(linkId);
          }
        }
      });
    });
    return lines;
  }, []);

  const hoveredConnections = hoveredNode ? getConnectedIds(hoveredNode, links) : new Set();

  return (
    <div className="min-h-screen bg-[#05050a] text-white pt-24 pb-12 px-6 flex flex-col items-center relative overflow-hidden font-sans">
      {/* Background Environment */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] bg-primaryPurple/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] bg-accentPink/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
      </div>

      <div className="w-full max-w-7xl relative z-10 flex flex-col items-center">

        {/* HERO HEADER */}
        <div className="w-full text-center mb-8 animate-fade-in-up">
          <h2 className="text-primaryPurple font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase mb-2">Tech Arsenal</h2>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white/90">Engineering Capability Map</h1>
        </div>

        {/* MODES FILTERS */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 z-20">
          {(['ECOSYSTEM', 'AI / ML', 'SOFTWARE'] as GraphMode[]).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setSelectedProof(null); }}
              className={`px-5 py-2 rounded font-mono text-[10px] md:text-xs tracking-widest uppercase transition-all duration-300 border 
                ${mode === m
                  ? 'bg-primaryPurple/20 border-primaryPurple text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30 hover:text-white'}`}
            >
              [ {m} ]
            </button>
          ))}
        </div>

        {/* GRAPH CONTAINER */}
        <div className="w-full h-[60vh] md:h-[65vh] relative mb-16 bg-[#0a0a14]/40 border border-white/5 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm group/graph">

          <svg className="w-full h-full absolute inset-0 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="glow-node">
                <feGaussianBlur stdDeviation="0.8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* LINKS */}
            {links.map((link) => {
              const srcStyle = getModeStyles(link.source, mode);
              const tgtStyle = getModeStyles(link.target, mode);

              const isHovered = hoveredNode === link.source.id || hoveredNode === link.target.id;
              const isDimmed = srcStyle.opacity < 1 || tgtStyle.opacity < 1;

              const strokeColor = isHovered ? '#ec4899' : '#8b5cf6';
              const strokeOpacity = isHovered ? 0.8 : (isDimmed ? 0.05 : 0.2);
              const strokeWidth = isHovered ? 0.3 : 0.1;

              return (
                <motion.line
                  key={link.id}
                  animate={{
                    x1: srcStyle.x, y1: srcStyle.y,
                    x2: tgtStyle.x, y2: tgtStyle.y,
                    strokeOpacity, strokeWidth, stroke: strokeColor
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="pointer-events-none"
                />
              );
            })}

            {/* NODES */}
            {NODES.map((node) => {
              const style = getModeStyles(node, mode);

              const isHovered = hoveredNode === node.id;
              const isDomainHovered = hoveredNode && NODES.find(n => n.id === hoveredNode)?.type === 'domain' && NODES.find(n => n.id === hoveredNode)?.domain === node.domain;
              const isConnected = hoveredConnections.has(node.id);
              const isActiveHover = isHovered || isConnected || isDomainHovered;

              const finalOpacity = hoveredNode ? (isActiveHover ? 1 : 0.1) : style.opacity;

              const radius = node.type === 'os' ? 3 : (node.type === 'domain' ? 2 : (node.type === 'core' ? 1.2 : 0.8));
              const finalScale = style.scale * (isHovered ? 1.3 : (isConnected ? 1.1 : 1));

              const color = node.type === 'os' ? '#ffffff' : (node.domain === 'software' ? '#60a5fa' : (node.domain === 'aiml' ? '#ec4899' : '#8b5cf6'));

              return (
                <g
                  key={node.id}
                  className={`cursor-pointer transition-opacity duration-300 ${finalOpacity < 0.3 ? 'pointer-events-none' : ''}`}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => node.proof && setSelectedProof(node)}
                >
                  <motion.circle
                    animate={{ cx: style.x, cy: style.y, r: radius * finalScale, opacity: finalOpacity }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    fill={color}
                    fillOpacity={node.type === 'domain' || node.type === 'os' ? 0.2 : 0.8}
                    stroke={color}
                    strokeWidth={0.2}
                    filter={isActiveHover || node.type === 'os' ? 'url(#glow-node)' : 'none'}
                  />

                  <motion.text
                    animate={{ x: style.x, y: style.y + (radius * finalScale) + 1.5, opacity: finalOpacity > 0.5 ? 1 : 0 }}
                    transition={{ duration: 0.8 }}
                    textAnchor="middle"
                    fill={isHovered ? '#ffffff' : '#9ca3af'}
                    fontSize={node.type === 'os' ? 1.8 : (node.type === 'domain' ? 1.2 : 0.9)}
                    fontWeight={isHovered || node.type === 'os' ? 'bold' : 'normal'}
                    className="font-mono uppercase pointer-events-none drop-shadow-md tracking-wider"
                  >
                    {node.label}
                  </motion.text>
                </g>
              );
            })}
          </svg>

          {/* SKILL PROOF SIDE PANEL */}
          <AnimatePresence>
            {selectedProof && (
              <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute top-0 right-0 h-full w-full max-w-sm bg-[#05050a]/95 backdrop-blur-xl border-l border-white/10 p-6 md:p-8 flex flex-col z-50 shadow-2xl overflow-y-auto"
              >
                <button onClick={() => setSelectedProof(null)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
                  <i className="fa-solid fa-xmark text-xl"></i>
                </button>

                <div className="font-mono text-[10px] text-accentPink tracking-[0.3em] uppercase mb-2">Skill Proof</div>
                <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-8 border-b border-white/10 pb-4">{selectedProof.label}</h3>

                <div className="space-y-6 flex-grow">
                  <div>
                    <h4 className="font-mono text-[10px] text-gray-500 tracking-widest uppercase mb-3">Used For</h4>
                    <ul className="space-y-2">
                      {selectedProof.proof?.usedFor.map(item => (
                        <li key={item} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-primaryPurple mt-1 text-[10px]">▶</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-mono text-[10px] text-gray-500 tracking-widest uppercase mb-3">Experience Through</h4>
                    <ul className="space-y-2">
                      {selectedProof.proof?.experience.map(item => (
                        <li key={item} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-accentPink mt-1 text-[10px]">▶</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-mono text-[10px] text-gray-500 tracking-widest uppercase mb-3">Connected</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProof.proof?.connected.map(item => (
                        <span key={item} className="px-2 py-1 text-[10px] font-mono border border-white/10 bg-white/5 rounded text-gray-400">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primaryPurple text-xs font-mono uppercase tracking-widest transition-all text-white rounded flex items-center justify-center gap-2">
                    View Projects <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ENGINEERING PROFILE - COMPACT GRID */}
        <div className="w-full mb-16">
          <h2 className="text-sm md:text-base font-bold tracking-[0.2em] uppercase text-white/80 mb-6 border-b border-white/10 pb-2">Engineering Profile</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

            {/* 01 BUILD */}
            <div className="bg-white/5 border border-white/5 rounded-xl p-6">
              <div className="font-mono text-[10px] text-gray-500 tracking-widest mb-1">01 / BUILD</div>
              <h3 className="font-bold text-white uppercase tracking-tight mb-4 text-sm">Software Engineering</h3>
              <ul className="space-y-2 font-mono text-xs text-gray-400">
                <li>React</li><li>JavaScript</li><li>Node.js</li><li>FastAPI</li><li>REST APIs</li><li>Supabase</li>
              </ul>
            </div>

            {/* 02 INTELLIGENCE */}
            <div className="bg-white/5 border border-white/5 rounded-xl p-6">
              <div className="font-mono text-[10px] text-gray-500 tracking-widest mb-1">02 / INTELLIGENCE</div>
              <h3 className="font-bold text-white uppercase tracking-tight mb-4 text-sm">AI & Machine Learning</h3>
              <ul className="space-y-2 font-mono text-xs text-gray-400">
                <li>Python</li><li>Pandas</li><li>NumPy</li><li>Scikit-learn</li><li>Machine Learning</li><li>Data Processing</li>
              </ul>
            </div>

            {/* 03 TOOLCHAIN */}
            <div className="bg-white/5 border border-white/5 rounded-xl p-6">
              <div className="font-mono text-[10px] text-gray-500 tracking-widest mb-1">03 / TOOLCHAIN</div>
              <h3 className="font-bold text-white uppercase tracking-tight mb-4 text-sm">Engineering Environment</h3>
              <ul className="space-y-2 font-mono text-xs text-gray-400">
                <li>Git</li><li>GitHub</li><li>Docker</li><li>VS Code</li><li>MATLAB</li><li>AutoCAD</li>
              </ul>
            </div>

          </div>
        </div>

        {/* ACTIVE LEARNING TERMINAL */}
        <div className="w-full max-w-3xl mb-16">
          <div className="bg-[#020205] border border-white/10 rounded-xl p-6 shadow-inner font-mono relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primaryPurple to-accentPink" />
            <div className="text-green-400 text-[10px] md:text-xs mb-6">$ learning --status</div>

            <div className="text-gray-300 text-xs md:text-sm tracking-widest mb-4">ACTIVE MODULES</div>

            <div className="space-y-5 mb-8">
              <div className="pl-4 border-l-2 border-primaryPurple">
                <div className="text-white font-bold flex items-center gap-2 text-sm"><span className="text-primaryPurple text-[8px]">●</span> FastAPI</div>
                <div className="text-gray-500 text-[10px] mt-1">Backend Engineering • Building modern Python APIs</div>
              </div>
              <div className="pl-4 border-l-2 border-primaryPurple">
                <div className="text-white font-bold flex items-center gap-2 text-sm"><span className="text-primaryPurple text-[8px]">●</span> Full-Stack Web Development</div>
                <div className="text-gray-500 text-[10px] mt-1">Software Engineering • Expanding end-to-end application development</div>
              </div>
              <div className="pl-4 border-l-2 border-primaryPurple">
                <div className="text-white font-bold flex items-center gap-2 text-sm"><span className="text-primaryPurple text-[8px]">●</span> Applied Machine Learning</div>
                <div className="text-gray-500 text-[10px] mt-1">AI/ML • Models • Evaluation • Data Pipelines</div>
              </div>
            </div>

            <div className="text-[10px] md:text-xs flex items-center gap-2 text-gray-400">
              STATUS: <span className="text-white">ACTIVE</span><span className="w-1.5 h-3 bg-white animate-pulse inline-block" />
            </div>
          </div>
        </div>

        {/* SYSTEM FOOTER */}
        <div className="w-full border-t border-white/10 pt-6 font-mono text-[9px] md:text-[10px] tracking-widest text-gray-500 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8">

          <div>
            <div className="text-white mb-3">ARYA.OS / CAPABILITY MATRIX</div>
            <div className="grid grid-cols-[60px_200px_60px] gap-2">
              <div className="text-primaryPurple">CORE</div><div>Software Engineering</div><div className="text-green-400">ACTIVE</div>
              <div className="text-primaryPurple">CORE</div><div>AI / Machine Learning</div><div className="text-accentPink">EXPANDING</div>
              <div className="text-gray-600">FOCUS</div><div className="text-gray-400">Backend Engineering</div><div className="text-gray-400">LOADING</div>
            </div>
          </div>

          <div className="text-right">
            LAST SYSTEM UPDATE <br /> <span className="text-white mt-1 inline-block">JUL 2026</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Skills;