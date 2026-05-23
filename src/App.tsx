import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import FeaturedPrints from './components/FeaturedPrints';
import PrintStudio from './components/PrintStudio';
import Process from './components/Process';
import Footer from './components/Footer';
import GrainOverlay from './components/GrainOverlay';

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-[100dvh] relative overflow-x-hidden">
      <GrainOverlay />
      <Navigation scrollY={scrollY} />
      
      <main>
        <Hero />
        <FeaturedPrints />
        <PrintStudio />
        <Process />
      </main>

      <Footer />
    </div>
  );
}

export default App;
