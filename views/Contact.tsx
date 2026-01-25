import React, { useState, useEffect } from 'react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false
  });

  const [errors, setErrors] = useState<{name?: string; email?: string; message?: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const validate = (values: typeof formState) => {
    const newErrors: typeof errors = {};
    if (!values.name.trim()) newErrors.name = 'Name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(values.email)) newErrors.email = 'Please enter a valid email address';
    
    if (!values.message.trim()) newErrors.message = 'Message is required';
    else if (values.message.length < 10) newErrors.message = 'Message must be at least 10 characters';
    
    return newErrors;
  };

  useEffect(() => {
    setErrors(validate(formState));
  }, [formState]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if (isSent) setIsSent(false);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    const validationErrors = validate(formState);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);

    // NOTE: To make this work for REAL without a backend:
    // 1. Sign up at https://formspree.io/
    // 2. Replace the fetch URL with your Formspree endpoint
    // 3. Or use a service like EmailJS
    
    try {
      // Simulating a real API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSent(true);
      setFormState({ name: '', email: '', message: '' });
      setTouched({ name: false, email: false, message: false });
    } catch (err) {
      console.error("Submission error", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClass = (field: keyof typeof formState) => {
    const hasError = touched[field] && errors[field];
    return `w-full pl-11 pr-10 py-3 bg-white/5 border rounded-xl focus:outline-none transition-all duration-300 ${
        hasError 
        ? 'border-red-500 focus:border-red-500 text-red-100 placeholder-red-300/30 bg-red-500/5' 
        : 'border-white/10 focus:border-neonCyan text-white'
    }`;
  };

  const renderError = (field: keyof typeof formState) => {
      if (touched[field] && errors[field]) {
          return (
            <div className="flex items-center gap-1.5 mt-1.5 ml-1 animate-fade-in-up">
                <i className="fa-solid fa-circle-exclamation text-[10px] text-red-500"></i>
                <p className="text-red-400 text-xs font-medium tracking-wide">{errors[field]}</p>
            </div>
          );
      }
      return null;
  };

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 max-w-7xl mx-auto relative z-10 flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div className="animate-fade-in-up">
          <h2 className="text-5xl font-bold mb-6">Let's <span className="text-neonCyan">Connect.</span></h2>
          <p className="text-gray-400 text-lg mb-8">
            I'm currently looking for summer internships or freelance opportunities. 
            My inbox is always open for a tech chat or a potential collaboration!
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 glass-panel rounded-2xl border-white/5 group hover:border-neonCyan/30 transition-colors">
              <div className="w-10 h-10 rounded-full bg-neonCyan/10 flex items-center justify-center text-neonCyan group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <span className="text-gray-300">arya.suryavanshi@example.com</span>
            </div>
            
            <div className="flex items-center gap-4 p-4 glass-panel rounded-2xl border-white/5 group hover:border-neonPurple/30 transition-colors">
              <div className="w-10 h-10 rounded-full bg-neonPurple/10 flex items-center justify-center text-neonPurple group-hover:scale-110 transition-transform">
                <i className="fa-brands fa-linkedin-in"></i>
              </div>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">linkedin.com/in/arya-suryavanshi</a>
            </div>

            <div className="flex items-center gap-4 p-4 glass-panel rounded-2xl border-white/5 group hover:border-white/30 transition-colors">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <i className="fa-brands fa-github"></i>
              </div>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">github.com/arya-suryavanshi</a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-panel p-8 rounded-3xl border-white/10 shadow-2xl animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <i className={`fa-solid fa-user absolute left-4 top-[14px] transition-colors ${touched.name && errors.name ? 'text-red-500' : 'text-gray-500'}`}></i>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formState.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClass('name')}
              />
              {touched.name && errors.name && (
                <div className="absolute right-4 top-[14px] text-red-500 animate-pulse">
                  <i className="fa-solid fa-circle-exclamation"></i>
                </div>
              )}
              {renderError('name')}
            </div>

            <div className="relative">
              <i className={`fa-solid fa-at absolute left-4 top-[14px] transition-colors ${touched.email && errors.email ? 'text-red-500' : 'text-gray-500'}`}></i>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formState.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClass('email')}
              />
              {touched.email && errors.email && (
                <div className="absolute right-4 top-[14px] text-red-500 animate-pulse">
                  <i className="fa-solid fa-circle-exclamation"></i>
                </div>
              )}
              {renderError('email')}
            </div>

            <div className="relative">
              <i className={`fa-solid fa-comment absolute left-4 top-[14px] transition-colors ${touched.message && errors.message ? 'text-red-500' : 'text-gray-500'}`}></i>
              <textarea
                name="message"
                placeholder="Message"
                rows={4}
                value={formState.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${getInputClass('message')} pl-11`}
              ></textarea>
              {touched.message && errors.message && (
                <div className="absolute right-4 top-[14px] text-red-500 animate-pulse">
                  <i className="fa-solid fa-circle-exclamation"></i>
                </div>
              )}
              {renderError('message')}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isSent}
              className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
                isSent 
                  ? 'bg-green-500/20 text-green-500 border border-green-500/50' 
                  : 'bg-gradient-to-r from-neonPurple to-neonCyan text-white shadow-lg shadow-neonCyan/20 hover:shadow-neonCyan/40 hover:-translate-y-1'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? (
                <>
                  <i className="fa-solid fa-circle-notch animate-spin"></i> Sending...
                </>
              ) : isSent ? (
                <>
                  <i className="fa-solid fa-check"></i> Message Sent!
                </>
              ) : (
                <>
                  Send Message <i className="fa-solid fa-paper-plane"></i>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;