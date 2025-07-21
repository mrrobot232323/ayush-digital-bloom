import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
        end: "bottom bottom",
        toggleActions: "play none none reverse"
      }
    });

    // Initial setup
    gsap.set(contentRef.current, { 
      opacity: 0, 
      y: 60, 
      filter: 'blur(10px)' 
    });
    gsap.set(particlesRef.current?.children, { 
      opacity: 0, 
      scale: 0 
    });

    // Animate elements
    tl.to(contentRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: "power2.out"
    })
    .to(particlesRef.current?.children, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "back.out(1.7)",
      stagger: 0.2
    }, "-=0.5");

    return () => {
      tl.kill();
    };
  }, []);

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer 
      ref={footerRef}
      className="relative py-16 px-6 border-t border-glass-border"
    >
      {/* Floating particles background */}
      <div 
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="floating-orb w-16 h-16 bg-neon-blue top-10 left-1/4 opacity-20"></div>
        <div className="floating-orb w-12 h-12 bg-neon-purple top-20 right-1/3 opacity-20" style={{ animationDelay: '2s' }}></div>
        <div className="floating-orb w-20 h-20 bg-neon-cyan bottom-16 left-1/3 opacity-20" style={{ animationDelay: '4s' }}></div>
        <div className="floating-orb w-14 h-14 bg-neon-pink bottom-10 right-1/4 opacity-20" style={{ animationDelay: '6s' }}></div>
      </div>

      <div 
        ref={contentRef}
        className="max-w-6xl mx-auto relative z-10"
      >
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold gradient-text">
              Ayush
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Creating digital experiences that make a difference. 
              Let's build something amazing together.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-2">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 w-fit"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">
              Let's Connect
            </h4>
            <div className="space-y-2">
              <p className="text-muted-foreground">
                Email: ayush@example.com
              </p>
              <p className="text-muted-foreground">
                Available for freelance projects
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-glass-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              Made with <Heart size={16} className="text-red-400" weight="fill" /> by Ayush
            </p>
            <p className="text-muted-foreground text-sm">
              © 2024 All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 to-transparent pointer-events-none"></div>
    </footer>
  );
};

export default Footer;