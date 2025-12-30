import React, { useEffect, useRef, useState } from 'react';

const CallToAction: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section className="py-24 px-6 bg-transparent">
      <div 
        ref={sectionRef}
        className={`max-w-[1200px] mx-auto relative group transition-all duration-600 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {/* Main CTA Card with Emerald Gradient */}
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#064e3b]/80 via-[#022c22]/90 to-[#030405]/95 backdrop-blur-sm border border-white/5 p-12 md:p-24 text-center">
          
          {/* Subtle Grid Pattern Overlay (Emerald) */}
          <div 
            className="absolute inset-0 opacity-[0.12] pointer-events-none" 
            style={{ 
              backgroundImage: `linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          ></div>

          {/* Glowing background effects (Emerald) */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-900/30 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-[32px] md:text-[56px] font-bold text-white mb-6 leading-tight tracking-tight">
              Ready to Automate Your Revenue?
            </h2>
            
            <p className="text-[#a5a5a5] text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
              Stop letting leads slip through the cracks. Your custom AI system is ready to be built.
            </p>

            <div className="flex justify-center">
              <button className="bg-[#00ffa3] hover:bg-[#00e692] text-black font-bold text-lg px-10 py-5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,255,163,0.5)] transition-all transform hover:-translate-y-1 active:translate-y-0 group-hover:scale-[1.02]">
                Book a strategy call
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;