
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full h-20 bg-[#011a13] border-b border-emerald-900/40 backdrop-blur-xl flex items-center shadow-[0_8px_40px_rgba(0,0,0,0.8)]">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between relative z-50">

        {/* Logo Section - Matching XTRACT style */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden transition-transform duration-300 group-hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <img src="/assets/logo.png" alt="GrownexAI Logo" className="w-full h-full object-cover" />

          </div>
          <img src="/assets/grownexai_text.png" alt="GrownexAI" className="h-8 md:h-10 object-contain" />
        </a>

        {/* Right side navigation & Button */}
        <div className="hidden md:flex items-center gap-10">
          <nav className="flex items-center gap-8">
            <a href="#how-it-works" className="text-gray-400 text-[15px] font-medium hover:text-emerald-400 transition-colors">How it works</a>
            <Link to="/audit" className="text-gray-400 text-[15px] font-medium hover:text-emerald-400 transition-colors">ROI Calculator</Link>
          </nav>

          <a
            href="https://cal.com/kiran-kumar-book/ai-systems-consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-bold py-2.5 px-6 rounded-lg text-[15px] transition-all shadow-lg shadow-emerald-500/20 active:scale-95 inline-block"
          >
            Book a call
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-white p-2 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`block w-full h-0.5 bg-current transform transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-full h-0.5 bg-current transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-full h-0.5 bg-current transform transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col items-center gap-6 md:hidden shadow-2xl"
          >
            <nav className="flex flex-col items-center gap-6 w-full">
              <a
                href="#how-it-works"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-300 text-lg font-medium hover:text-emerald-400 w-full text-center py-2 border-b border-white/5"
              >
                How it works
              </a>
              <Link
                to="/audit"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-300 text-lg font-medium hover:text-emerald-400 w-full text-center py-2 border-b border-white/5"
              >
                ROI Calculator
              </Link>
            </nav>

            <a
              href="https://cal.com/kiran-kumar-book/ai-systems-consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-xs bg-gradient-to-r from-emerald-500 to-teal-600 text-black font-bold py-3 px-6 rounded-lg text-lg shadow-lg shadow-emerald-500/20 active:scale-95 block text-center"
            >
              Book a call
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
