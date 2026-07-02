
import React from 'react';
import { StepProps } from '../types';

const Step: React.FC<StepProps> = ({ number, title, description }) => (
  <div className="relative p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-neon/30 transition-colors group">
    <div className="text-neon text-3xl md:text-4xl font-bold mb-4 md:mb-6 opacity-20 group-hover:opacity-100 transition-opacity">
      {number}
    </div>
    <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">{title}</h3>
    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
      {description}
    </p>
  </div>
);

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Connect Your Wallet",
      description: "Securely link your existing digital wallet to the Cryptix dashboard with a single click."
    },
    {
      number: "02",
      title: "Analyze Assets",
      description: "Our advanced algorithms scan your portfolio to provide deep insights and risk assessment."
    },
    {
      number: "03",
      title: "Execute Strategy",
      description: "Manage, trade, or stake your assets using our optimized low-fee transaction engine."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How it works</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Experience a streamlined workflow designed for both beginners and pro traders.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <Step key={step.number} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
