import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'phosphor-react';

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Initial setup
    gsap.set([headlineRef.current, subtitleRef.current, ctaRef.current], { 
      opacity: 0, 
      y: 50, 
      filter: 'blur(10px)' 
    });
    
    gsap.set(splineRef.current, { 
      opacity: 0, 
      x: 100, 
      scale: 0.8 
    });

    // Animate elements
    tl.to(headlineRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: "power2.out"
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: "power2.out"
    }, "-=0.8")
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: "power2.out"
    }, "-=0.6")
    .to(splineRef.current, {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 1.5,
      ease: "power2.out"
    }, "-=1");

    // CTA button hover animation
    const ctaButton = ctaRef.current?.querySelector('button');
    if (ctaButton) {
      const handleMouseEnter = () => {
        gsap.to(ctaButton, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(ctaButton, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      ctaButton.addEventListener('mouseenter', handleMouseEnter);
      ctaButton.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        ctaButton.removeEventListener('mouseenter', handleMouseEnter);
        ctaButton.removeEventListener('mouseleave', handleMouseLeave);
        tl.kill();
      };
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="https://res.cloudinary.com/dwqlagonh/video/upload/v1753171728/WhatsApp_Video_2025-07-22_at_1.30.07_PM_w3l2h1.mp4" type="video/mp4" />
        </video>
        
        {/* Enhanced Gradient Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-primary/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-background/80"></div>
      </div>

      {/* Floating Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-orb w-64 h-64 bg-neon-blue top-20 left-10 opacity-10"></div>
        <div className="floating-orb w-48 h-48 bg-neon-purple top-60 right-20 opacity-10" style={{ animationDelay: '2s' }}></div>
        <div className="floating-orb w-36 h-36 bg-neon-cyan bottom-40 left-1/4 opacity-10" style={{ animationDelay: '4s' }}></div>
        <div className="floating-orb w-52 h-52 bg-neon-pink bottom-20 right-1/3 opacity-10" style={{ animationDelay: '6s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <h1 
          ref={headlineRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="block">Hi, I'm</span>
          <span className="gradient-text text-shadow">Ayush</span>
          <span className="block text-2xl md:text-4xl lg:text-5xl font-light mt-4 text-muted-foreground">
            Web Developer / UI UX Designer / Problem Solver
          </span>
        </h1>

        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Crafting digital experiences with cutting-edge technology and innovative design. 
          Specialized in MEAN stack, modern frameworks, and creating solutions that matter.
        </p>

        <div ref={ctaRef}>
          <a 
            href="https://drive.google.com/file/d/1kD2QKBjfFYWdBZUSmrI-qMQAqADqsd7C/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button 
              size="lg"
              className="bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-cyan text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 shadow-lg neon-glow group"
            >
              <span className="flex items-center gap-2">
                Hire Me
                <ArrowRight size={20} weight="light" className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </a>
        </div>
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40 pointer-events-none"></div>
    </section>
  );
};

export default Hero;