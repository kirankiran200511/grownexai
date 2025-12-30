
import React from 'react';
import { ServiceCardProps } from '../types';

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => (
  <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-emerald-500/20 transition-all group">
    <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
    <p className="text-gray-400 leading-relaxed">
      {description}
    </p>
  </div>
);

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 px-6 bg-black relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <span className="text-emerald-400 font-bold tracking-widest uppercase text-sm mb-4 block">Our Services</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white headline-style uppercase">Automate Your Success</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              We deploy custom-trained AI models specifically designed to handle the most time-consuming parts of your sales funnel. 
              Increase your efficiency without increasing your headcount.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-full blur-[80px] absolute -inset-4" />
            <div className="relative z-10 rounded-3xl border border-white/10 bg-black/60 overflow-hidden aspect-video flex items-center justify-center">
               <div className="text-emerald-400/30 text-6xl">⚡</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard 
            title="AI Voice Agents"
            description="Intelligent voice assistants that handle inbound calls, qualify leads, and book meetings in real-time, 24/7."
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            }
          />
          <ServiceCard 
            title="Lead Recovery"
            description="Automated text and email follow-ups that reactivate old leads and capture visitors who drop off your site."
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            }
          />
          <ServiceCard 
            title="CRM Integration"
            description="Seamless sync with your existing tools. Every lead our AI touches is updated in your system instantly."
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
