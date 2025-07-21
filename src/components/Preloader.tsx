import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial setup
    gsap.set([logoRef.current, progressBarRef.current], { opacity: 0, y: 50 });
    
    // Animate logo and progress bar appearance
    tl.to([logoRef.current, progressBarRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.2
    })
    // Animate progress bar filling
    .to(progressBarRef.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.out"
    })
    // Wait a bit
    .to({}, { duration: 0.3 })
    // Fade out preloader
    .to(preloaderRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        onComplete();
      }
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center preloader-bg"
    >
      <div className="text-center">
        {/* Animated Logo */}
        <div ref={logoRef} className="mb-8">
          <div className="relative">
            <h1 className="text-6xl md:text-8xl font-bold gradient-text mb-4">
              MR ROBOT
            </h1>
            <div className="absolute -inset-2 rounded-lg opacity-30 blur-xl bg-gradient-to-r from-neon-blue via-neon-purple to-neon-cyan"></div>
          </div>
          <p className="text-xl text-muted-foreground">Loading Experience...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 h-1 bg-muted rounded-full overflow-hidden mx-auto">
          <div 
            ref={progressBarRef}
            className="h-full w-0 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full"
            style={{ boxShadow: '0 0 20px hsl(var(--neon-blue))' }}
          />
        </div>

        {/* Floating orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating-orb w-32 h-32 bg-neon-blue top-20 left-20"></div>
          <div className="floating-orb w-24 h-24 bg-neon-purple top-40 right-32" style={{ animationDelay: '2s' }}></div>
          <div className="floating-orb w-20 h-20 bg-neon-cyan bottom-32 left-40" style={{ animationDelay: '4s' }}></div>
          <div className="floating-orb w-28 h-28 bg-neon-pink bottom-20 right-20" style={{ animationDelay: '6s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;