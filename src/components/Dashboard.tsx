import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Code, TrendUp, Target, Trophy } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Dashboard = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const platforms = [
    {
      id: 1,
      name: 'LeetCode',
      solved: '200+',
      description: 'Data Structures & Algorithms',
      url: 'https://leetcode.com/problemset/',
      icon: Code,
      color: 'from-orange-500 to-yellow-500',
      bgGlow: 'bg-orange-500/10'
    },
    {
      id: 2,
      name: 'GeeksforGeeks',
      solved: '200+',
      description: 'Competitive Programming',
      url: 'https://www.geeksforgeeks.org/user/at1669yh6z/',
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      bgGlow: 'bg-green-500/10'
    },
    {
      id: 3,
      name: 'Coding Ninjas',
      solved: '200+',
      description: 'Problem Solving',
      url: 'https://www.naukri.com/code360/profile/abc6f507-a3ae-4465-bab5-dd37916b4cd9',
      icon: Trophy,
      color: 'from-purple-500 to-pink-500',
      bgGlow: 'bg-purple-500/10'
    }
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Initial setup
    gsap.set(titleRef.current, { 
      opacity: 0, 
      y: 50, 
      filter: 'blur(10px)' 
    });
    gsap.set(cardsRef.current?.children, { 
      opacity: 0, 
      y: 100, 
      scale: 0.8 
    });

    // Animate elements
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: "power2.out"
    })
    .to(cardsRef.current?.children, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.2
    }, "-=0.5");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-6 relative"
      id="dashboard"
    >
      <div className="max-w-7xl mx-auto">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
        >
          Coding Dashboard
        </h2>

        {/* Stats Overview */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-glass border border-glass-border">
            <TrendUp size={20} className="text-neon-green" weight="light" />
            <span className="text-lg font-semibold">600+ Problems Solved</span>
          </div>
        </div>

        {/* Platforms Grid */}
        <div 
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-8"
        >
          {platforms.map((platform) => {
            const IconComponent = platform.icon;
            return (
              <a
                key={platform.id}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-8 hover-lift group cursor-pointer block"
              >
                {/* Platform Icon */}
                <div className={`w-16 h-16 rounded-full ${platform.bgGlow} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent size={32} className="text-foreground" weight="light" />
                </div>

                {/* Platform Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {platform.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {platform.description}
                    </p>
                  </div>

                  {/* Solved Count */}
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-4xl font-bold bg-gradient-to-r ${platform.color} bg-clip-text text-transparent`}>
                        {platform.solved}
                      </span>
                      <span className="text-muted-foreground text-sm">problems solved</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-secondary/30 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${platform.color} rounded-full animate-pulse`}
                        style={{ width: '85%' }}
                      ></div>
                    </div>
                  </div>

                  {/* View Profile Button */}
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full mt-4 border-glass-border hover:bg-primary/10 hover:border-primary/50"
                  >
                    View Profile
                  </Button>
                </div>

                {/* Glow Effect */}
                <div className={`absolute inset-0 rounded-xl ${platform.bgGlow} blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`}></div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-5 w-24 h-24 rounded-full bg-neon-blue/10 blur-2xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-neon-purple/10 blur-2xl animate-pulse" style={{ animationDelay: '3s' }}></div>
    </section>
  );
};

export default Dashboard;