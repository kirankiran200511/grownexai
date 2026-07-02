import React, { useEffect, useRef, useState } from 'react';

interface TimelineStepProps {
  side: 'left' | 'right';
  stepNumber: string;
  title: string;
  subtitle?: string;
  description: string;
  icon: React.ReactNode;
  isFirst?: boolean;
}

const TimelineStep: React.FC<TimelineStepProps> = ({ side, stepNumber, title, subtitle, description, icon, isFirst }) => {
  const [isVisible, setIsVisible] = useState(false);
  const stepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (stepRef.current) observer.unobserve(stepRef.current);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (stepRef.current) {
      observer.observe(stepRef.current);
    }

    return () => {
      if (stepRef.current) observer.unobserve(stepRef.current);
    };
  }, []);

  return (
    <div
      ref={stepRef}
      className="timeline-step relative flex items-center justify-center w-full mb-12 md:mb-24 last:mb-12"
    >
      {/* Central Connector Dot and Badge (Desktop Only) */}
      <div className={`hidden md:flex absolute left-1/2 -translate-x-1/2 z-20 flex-col items-center transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
        <div
          className={`step-dot w-4 h-4 rounded-full border-2 border-[#1a1a1a] transition-all duration-700 ${isVisible
            ? 'bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.9)]'
            : 'bg-[#333]'
            }`}
          data-step={stepNumber}
        />
        <div className={`absolute ${side === 'left' ? 'left-10' : 'right-10'} top-1/2 -translate-y-1/2 whitespace-nowrap`}>
          <span className="bg-black/60 backdrop-blur-md text-[#666] text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider border border-white/5">
            STEP {stepNumber}
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto px-4 md:px-6">
        {/* Mobile Step Badge */}
        <div className="md:hidden flex justify-center mb-4">
          <span className="bg-emerald-900/30 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-500/20">
            Step {stepNumber}
          </span>
        </div>

        {/* Left Side (or Full Width Mobile) */}
        <div className={`flex-1 md:pr-16 flex justify-center md:justify-end ${side === 'right' ? 'md:hidden' : ''}`}>
          {(side === 'left' || true) && (
            <div className={`w-full md:max-w-md bg-black/30 backdrop-blur-lg border border-white/5 p-6 md:p-8 rounded-[20px] md:rounded-[24px] text-left hover:border-white/20 hover:bg-white/[0.02] transition-all duration-500 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div
                className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-emerald-900/20 flex items-center justify-center mb-4 md:mb-6 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 group-hover:border-emerald-500/40 transition-all duration-500"
              >
                {icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 leading-tight tracking-tight">
                {title}
              </h3>
              {subtitle && (
                <p className="text-emerald-400/70 text-xs font-bold uppercase tracking-widest mb-4">
                  {subtitle}
                </p>
              )}
              <p className="text-[#888] text-[14px] leading-relaxed">
                {description}
              </p>
            </div>
          )}
        </div>

        {/* Spacer for Desktop Grid */}
        <div className="hidden md:block w-px" />

        {/* Right Side (Desktop Only) */}
        <div className={`hidden md:flex flex-1 pl-16 justify-start ${side === 'left' ? 'invisible' : ''}`}>
          {(side === 'right') && (
            <div className={`max-w-md w-full bg-black/30 backdrop-blur-lg border border-white/5 p-8 rounded-[24px] text-left hover:border-white/20 hover:bg-white/[0.02] transition-all duration-500 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div
                className="w-10 h-10 rounded-lg bg-emerald-900/20 flex items-center justify-center mb-6 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 group-hover:border-emerald-500/40 transition-all duration-500"
              >
                {icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 leading-tight tracking-tight">
                {title}
              </h3>
              {subtitle && (
                <p className="text-emerald-400/70 text-xs font-bold uppercase tracking-widest mb-4">
                  {subtitle}
                </p>
              )}
              <p className="text-[#888] text-[14px] leading-relaxed">
                {description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const HowWeHelp: React.FC = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          if (headerRef.current) observer.unobserve(headerRef.current);
        }
      },
      { threshold: 0.2 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current || !sectionRef.current) return;

      const timeline = timelineRef.current;
      const section = sectionRef.current;
      const steps = section.querySelectorAll('.timeline-step');

      if (steps.length === 0) return;

      const timelineRect = timeline.getBoundingClientRect();
      const timelineTop = timelineRect.top + window.scrollY;
      const timelineHeight = timeline.offsetHeight;
      const viewportHeight = window.innerHeight;

      let targetProgress = 0;
      let maxProgress = 0;

      steps.forEach((step) => {
        const stepRect = step.getBoundingClientRect();
        const stepTop = stepRect.top + window.scrollY;
        const stepPositionOnTimeline = (stepTop - timelineTop) / timelineHeight;
        maxProgress = Math.max(maxProgress, stepPositionOnTimeline);
      });

      steps.forEach((step) => {
        const stepRect = step.getBoundingClientRect();
        const stepTop = stepRect.top + window.scrollY;
        const stepPositionOnTimeline = (stepTop - timelineTop) / timelineHeight;
        const triggerPoint = viewportHeight * 0.7;
        if (stepRect.top < triggerPoint) {
          targetProgress = Math.max(targetProgress, Math.min(stepPositionOnTimeline, maxProgress));
        }
      });

      setScrollProgress(targetProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-32 pb-48 bg-transparent relative overflow-hidden">
      <div
        ref={headerRef}
        className={`max-w-4xl mx-auto text-center mb-32 z-10 relative transition-all duration-600 ease-out ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
      >
        <h2 className="satoshi-headline text-white uppercase tracking-tight">
          How We Help You?
        </h2>
      </div>

      <div className="relative max-w-[1400px] mx-auto">
        <div ref={timelineRef} className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-white/5" />
          <div
            className="absolute top-0 left-0 w-full bg-emerald-500 transition-all duration-500 ease-out"
            style={{
              height: `${scrollProgress * 100}%`,
              boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)'
            }}
          />
        </div>

        <TimelineStep
          side="left"
          stepNumber="1"
          isFirst={true}
          title="Understand Your Business & Identify Bottlenecks"
          description="We analyze your operations to find where leads are slipping through the cracks and where automation can make the biggest impact."
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          }
        />

        <TimelineStep
          side="right"
          stepNumber="2"
          title="Build and Implement Custom AI Systems"
          description="We create voice agents, chatbots, and automation workflows specifically designed for your business—then integrate them seamlessly."
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        />

        <TimelineStep
          side="left"
          stepNumber="3"
          title="Monitor Performance & Fine-Tune Continuously"
          description="We track results and continuously optimize your systems to ensure they keep performing at their peak as your business grows."
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
          }
        />
      </div>
    </section>
  );
};

export default HowWeHelp;