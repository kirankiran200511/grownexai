import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowWeHelp from './components/HowWeHelp';
import WhyChoose from './components/WhyChoose';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import UnifiedBackground from './components/UnifiedBackground';
import Audit from './components/Audit';

const Home = () => (
  <>
    <UnifiedBackground />
    <Header />
    <main className="relative z-10">
      <Hero />
      <HowWeHelp />
      <WhyChoose />
      <CallToAction />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <div className="relative min-h-screen selection:bg-emerald-500 selection:text-black">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/audit" element={<Audit />} />
        </Routes>
        <SpeedInsights />
      </div>
    </Router>
  );
}

export default App;
