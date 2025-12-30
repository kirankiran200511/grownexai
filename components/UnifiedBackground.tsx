
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const UnifiedBackground: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Orb 1: Core Hero Orb -> Much more subtle
  const orb1X = useTransform(scrollYProgress, [0, 0.5, 1], ['5%', '-15%', '10%']);
  const orb1Y = useTransform(scrollYProgress, [0, 0.5, 1], ['-5%', '30%', '60%']);
  const orb1Opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.12, 0.08, 0.1]);

  // Orb 2: Secondary Right Orb
  const orb2X = useTransform(scrollYProgress, [0, 0.6, 1], ['30%', '5%', '-20%']);
  const orb2Y = useTransform(scrollYProgress, [0, 0.6, 1], ['10%', '-5%', '40%']);
  const orb2Opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.08, 0.05, 0.08]);

  // Orb 3: Deep Bottom Glow
  const orb3Y = useTransform(scrollYProgress, [0, 1], ['80%', '20%']);
  const orb3Opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.03, 0.1, 0.05]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#000000]">
      {/* Dynamic Mesh Orbs */}
      <motion.div
        className="absolute w-[70vw] h-[70vw] rounded-full blur-[200px] bg-emerald-500"
        style={{
          x: orb1X,
          y: orb1Y,
          opacity: orb1Opacity,
          left: '0%',
          top: '0%',
          willChange: 'transform, opacity',
        }}
      />
      <motion.div
        className="absolute w-[50vw] h-[50vw] rounded-full blur-[180px] bg-teal-600"
        style={{
          x: orb2X,
          y: orb2Y,
          opacity: orb2Opacity,
          right: '0%',
          top: '0%',
          willChange: 'transform, opacity',
        }}
      />
      <motion.div
        className="absolute w-[90vw] h-[50vw] rounded-full blur-[220px] bg-[#064e3b]"
        style={{
          y: orb3Y,
          opacity: orb3Opacity,
          left: '5%',
          bottom: '0%',
          willChange: 'transform, opacity',
        }}
      />

      {/* Subtle Noise/Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
    </div>
  );
};

export default UnifiedBackground;
