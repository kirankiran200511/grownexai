import React, { useEffect, useRef, useState } from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (cardRef.current) observer.unobserve(cardRef.current);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`flex flex-col items-start p-8 md:p-10 border border-white/5 bg-black/20 backdrop-blur-md transition-all duration-600 ease-out rounded-3xl group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } hover:bg-white/[0.04] hover:border-emerald-500/20`}
    >
      <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center mb-8 bg-white/[0.02] group-hover:border-emerald-500/50 group-hover:bg-emerald-500/5 transition-all">
        <div className="text-white opacity-80 group-hover:text-emerald-400 group-hover:opacity-100 transition-all">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-4 text-white tracking-tight headline-style">{title}</h3>
      <p className="text-[#949494] leading-relaxed text-[15px] font-normal tracking-tight">
        {description}
      </p>
    </div>
  );
};

const WhyChoose: React.FC = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

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

  return (
    <section id="why-choose-us" className="py-32 border-t border-white/5 bg-transparent">
      <div className="max-w-[1400px] mx-auto px-6">
        <div 
          ref={headerRef}
          className={`text-center mb-24 transition-all duration-600 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 headline-style uppercase text-white">WHY CHOOSE US?</h2>
          <p className="text-[#949494] text-lg max-w-2xl mx-auto font-medium opacity-80 tracking-tight">
            Custom AI automation that works for your business—not the other way around.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FeatureCard 
            delay={0}
            title="Proven ROI"
            description="Our clients see measurable results within 30 days: more leads captured, faster response times, and increased conversion rates that directly impact your bottom line."
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
          />
          <FeatureCard 
            delay={100}
            title="Full Transparency"
            description="Track every interaction, measure every metric. You'll always know exactly how your AI systems are performing and where revenue is coming from."
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            }
          />
          <FeatureCard 
            delay={200}
            title="Expert Implementation"
            description="We don't just build and leave. Our team handles the entire process—from analysis to deployment to ongoing optimization—so you can focus on running your business."
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            }
          />
          <FeatureCard 
            delay={300}
            title="Zero Learning Curve"
            description="Your customers interact naturally with our AI systems without realizing they're talking to automation. For your team, everything just works—no complex training required."
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;