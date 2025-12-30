
import React, { useEffect, useState } from 'react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section 
      className="min-h-screen flex flex-col items-center justify-center pt-40 pb-20 px-6 relative overflow-hidden bg-transparent"
    >
      {/* Orbital Ring System (Maintained for interaction) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] md:w-[1200px] md:h-[1200px] flex items-center justify-center">
          {/* Main Circular Outer Ring */}
          <div 
            className="absolute inset-0 rounded-full blur-[40px] opacity-40 animate-rotate-slow"
            style={{ 
              background: 'conic-gradient(from 0deg, transparent 0%, rgba(16,185,129,0.4) 10%, rgba(52,211,153,0.5) 20%, transparent 30%, transparent 70%, rgba(16,185,129,0.4) 80%, rgba(52,211,153,0.5) 90%, transparent 100%)'
            }}
          />

          {/* Inner Counter-Rotating Ring */}
          <div 
            className="absolute inset-[10%] rounded-full blur-[35px] opacity-30 animate-rotate-reverse"
            style={{ 
              background: 'conic-gradient(from 180deg, transparent 0%, rgba(16,185,129,0.3) 10%, rgba(52,211,153,0.4) 20%, transparent 30%, transparent 70%, rgba(16,185,129,0.3) 80%, rgba(52,211,153,0.4) 90%, transparent 100%)'
            }}
          />

          {/* Center Pulsing Glow */}
          <div 
            className="absolute inset-[30%] rounded-full blur-[60px] animate-pulse-slow"
            style={{ 
              background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0) 70%)'
            }}
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto text-center z-10 relative">
        {/* Top Badge */}
        <div 
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[13px] font-bold mb-10 transition-all duration-700 delay-0 backdrop-blur-md ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <span className="animate-pulse">⚡</span>
          Scale Your Revenue with AI
        </div>

        <h1 
          className={`text-[56px] md:text-[84px] font-bold mb-8 leading-[1.05] text-white headline-style tracking-tight transition-all duration-700 delay-100 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          Never Miss<br />
          <span className="text-emerald-400">Another Lead.</span>
        </h1>
        
        <p 
          className={`text-[#b4b4b4] text-lg md:text-[20px] max-w-[680px] mx-auto leading-relaxed mb-14 font-medium transition-all duration-700 delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          AI systems that answer every call, respond to every message, and close deals automatically — 
          so you wake up to more revenue, not missed opportunities.
        </p>
        
        <div 
          className={`flex flex-col sm:flex-row justify-center gap-4 mb-20 transition-all duration-700 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <button className="bg-[#00ffa3] hover:bg-[#00e692] text-black px-10 py-5 rounded-full font-bold text-[18px] flex items-center justify-center gap-3 transition-all hover:scale-[1.05] active:scale-[0.98] shadow-[0_0_40px_rgba(0,255,163,0.5)]">
            Get started now
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
