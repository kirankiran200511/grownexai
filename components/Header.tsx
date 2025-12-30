
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full h-20 bg-gradient-to-r from-black via-[#011a13] to-black border-b border-emerald-900/40 backdrop-blur-xl flex items-center shadow-[0_8px_40px_rgba(0,0,0,0.8)]">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">

        {/* Logo Section - Matching XTRACT style */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center relative overflow-hidden transition-transform duration-300 group-hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <img src="/assets/logo.jpg" alt="GrownexAI Logo" className="w-full h-full object-cover" />

          </div>
          <span className="text-white text-2xl tracking-wide uppercase" style={{ fontFamily: 'Michroma, sans-serif' }}>
            GrownexAI
          </span>
        </a>

        {/* Right side navigation & Button */}
        <div className="flex items-center gap-10">
          <nav className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-gray-400 text-[15px] font-medium hover:text-emerald-400 transition-colors">How it works</a>
            <a href="#services" className="text-gray-400 text-[15px] font-medium hover:text-emerald-400 transition-colors">Services Offered</a>
          </nav>

          <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-bold py-2.5 px-6 rounded-lg text-[15px] transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
            Book a call
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
