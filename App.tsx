
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowWeHelp from './components/HowWeHelp';
import WhyChoose from './components/WhyChoose';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import UnifiedBackground from './components/UnifiedBackground';

function App() {
  return (
    <div className="relative min-h-screen selection:bg-emerald-500 selection:text-black">
      <UnifiedBackground />
      <Header />
      <main className="relative z-10">
        <Hero />
        <HowWeHelp />
        <WhyChoose />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

export default App;
