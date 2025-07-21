import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';
import { useLocomotiveScroll } from '@/hooks/useLocomotiveScroll';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Dashboard from '@/components/Dashboard';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  
  // Initialize smooth scrolling
  useLocomotiveScroll();

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  useEffect(() => {
    // Prevent scrolling during loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-background text-foreground" data-scroll-container>
      {/* Preloader */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      
      {/* Main Content */}
      {showContent && (
        <>
          <Navigation />
          <main data-scroll-section>
            <section id="home" data-scroll data-scroll-speed="1">
              <Hero />
            </section>
            <section data-scroll data-scroll-speed="0.5">
              <About />
            </section>
            <section data-scroll data-scroll-speed="0.8">
              <Dashboard />
            </section>
            <section data-scroll data-scroll-speed="0.6">
              <Projects />
            </section>
            <section data-scroll data-scroll-speed="0.4">
              <Contact />
            </section>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
