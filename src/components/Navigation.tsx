import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { List, X } from 'phosphor-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Initial animation
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.5 }
    );
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(mobileMenuRef.current,
        { opacity: 0, scale: 0.95, y: -20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(mobileMenuRef.current?.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, delay: 0.2 }
      );
    }
  }, [isOpen]);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'glass-card border-b border-glass-border backdrop-blur-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold gradient-text cursor-pointer">
            Ayush
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleLinkClick(item.href)}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
              >
                {item.name}
              </button>
            ))}
            <Button 
              size="sm"
              className="bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-cyan text-white font-medium px-6 rounded-xl transition-all duration-300 neon-glow"
            >
              Hire Me
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isOpen ? (
              <X size={24} weight="light" />
            ) : (
              <List size={24} weight="light" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div 
          ref={mobileMenuRef}
          className="md:hidden absolute top-full left-0 right-0 glass-card border-t border-glass-border backdrop-blur-lg"
        >
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleLinkClick(item.href)}
                className="block w-full text-left text-muted-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
              >
                {item.name}
              </button>
            ))}
            <Button 
              size="sm"
              className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-cyan text-white font-medium py-3 rounded-xl transition-all duration-300 neon-glow mt-4"
            >
              Hire Me
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;