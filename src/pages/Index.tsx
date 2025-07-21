import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

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
    <div className="min-h-screen bg-background text-foreground">
      {/* Preloader */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      
      {/* Main Content */}
      {showContent && (
        <>
          <Navigation />
          <main>
            <section id="home">
              <Hero />
            </section>
            <About />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
