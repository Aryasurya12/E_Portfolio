import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    await new Promise(r => setTimeout(r, 2000));
    setStatus('sent');
    setFormState({ name: '', email: '', message: '' });
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="min-h-screen pt-32 pb-40 px-6 max-w-7xl mx-auto relative z-10 flex flex-col justify-center">
      <div className="text-center mb-16 opacity-0 animate-fade-in-up">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primaryPurple via-accentPink to-secondaryPink">
          Establish Link
        </h2>
        <p className="text-gray-500 mt-6 tracking-[0.3em] font-mono text-[10px] md:text-xs uppercase italic">Initiating communication protocol</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

        {/* Info Column */}
        <div className="space-y-10 animate-fade-in-up text-center lg:text-left">
          <div className="space-y-6">
            <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">Let's build something <span className="text-accentPink underline decoration-primaryPurple/50">extraordinary.</span></h3>
            <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed max-w-md mx-auto lg:mx-0">
              Whether you have a specific project in mind or just want to discuss the future of AI and Web, I'm always ready to synchronize.
            </p>
          </div>

          <div className="space-y-4 max-w-sm mx-auto lg:mx-0">
            {[
              { icon: 'fa-envelope', label: 'Email', value: 'aryasurya1309@gmail.com', color: 'text-primaryPurple' },
              { icon: 'fa-linkedin', label: 'LinkedIn', value: 'arya-suryavanshi', color: 'text-accentPink' },
              { icon: 'fa-github', label: 'GitHub', value: 'Aryasurya12', color: 'text-accentGlow' }
            ].map((link, i) => (
              <div key={i} className="glass-panel p-4 md:p-5 rounded-2xl border-white/5 flex items-center gap-5 group hover:border-white/20 transition-all cursor-pointer bg-white/5">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center text-lg ${link.color}`}>
                  <i className={`fa-brands ${link.icon} ${link.icon.startsWith('fa-') ? '' : 'fa-solid'}`}></i>
                </div>
                <div className="text-left">
                  <div className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gray-600">{link.label}</div>
                  <div className="text-white font-mono text-xs md:text-sm">{link.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 hidden md:block">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-bold">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              SYSTEMS OPERATIONAL • STATUS: READY
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border-white/10 shadow-2xl relative overflow-hidden bg-[#0a0a14]/60 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondaryPink/10 blur-3xl rounded-full" />

          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2 group">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-600 ml-4">Subject Identity</label>
                <input
                  required
                  type="text"
                  placeholder="Your Name"
                  className="w-full h-12 md:h-14 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-6 outline-none text-white focus:border-accentPink transition-all font-mono text-xs md:text-sm"
                  value={formState.name}
                  onChange={e => setFormState({ ...formState, name: e.target.value })}
                />
              </div>
              <div className="space-y-2 group">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-600 ml-4">Comm Link</label>
                <input
                  required
                  type="email"
                  placeholder="Your Email"
                  className="w-full h-12 md:h-14 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-6 outline-none text-white focus:border-primaryPurple transition-all font-mono text-xs md:text-sm"
                  value={formState.email}
                  onChange={e => setFormState({ ...formState, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-600 ml-4">Data Packet</label>
              <textarea
                required
                rows={4}
                placeholder="Transmission Details..."
                className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-6 outline-none text-white focus:border-accentGlow transition-all font-mono text-xs md:text-sm resize-none"
                value={formState.message}
                onChange={e => setFormState({ ...formState, message: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={status !== 'idle'}
              className="w-full py-4 md:py-5 rounded-xl md:rounded-2xl bg-gradient-to-r from-primaryPurple to-secondaryPink text-white font-black uppercase tracking-[0.2em] text-[10px] md:text-xs shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {status === 'idle' && (
                <span className="flex items-center justify-center gap-3">
                  Transmit Link <i className="fa-solid fa-paper-plane text-xs md:text-sm"></i>
                </span>
              )}
              {status === 'sending' && (
                <span className="flex items-center justify-center gap-3">
                  <i className="fa-solid fa-circle-notch animate-spin"></i> Encrypting...
                </span>
              )}
              {status === 'sent' && (
                <span className="flex items-center justify-center gap-3">
                  <i className="fa-solid fa-check"></i> Link Synchronized
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;