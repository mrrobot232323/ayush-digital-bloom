import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code, 
  Database, 
  Palette, 
  Cpu, 
  Globe
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills = [
    { name: 'MongoDB', icon: Database, color: 'text-green-400' },
    { name: 'Express.js', icon: Code, color: 'text-yellow-400' },
    { name: 'Angular', icon: Globe, color: 'text-red-400' },
    { name: 'Node.js', icon: Cpu, color: 'text-green-500' },
    { name: 'C++', icon: Code, color: 'text-blue-400' },
    { name: 'Python', icon: Code, color: 'text-yellow-500' },
    { name: 'Figma', icon: Palette, color: 'text-purple-400' },
    { name: 'C', icon: Code, color: 'text-blue-600' }
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
    gsap.set([imageRef.current, contentRef.current], { 
      opacity: 0, 
      filter: 'blur(10px)' 
    });
    gsap.set(imageRef.current, { x: -100 });
    gsap.set(contentRef.current, { x: 100 });
    gsap.set(skillsRef.current?.children, { 
      opacity: 0, 
      y: 50, 
      scale: 0.8 
    });

    // Animate elements
    tl.to([imageRef.current, contentRef.current], {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.2
    })
    .to(skillsRef.current?.children, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.7)",
      stagger: 0.1
    }, "-=0.5");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-6 relative"
      id="about"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative w-80 h-80 mx-auto">
              {/* Glowing frame */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-cyan p-1">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/7195d5b0-a601-4d23-a799-b3d22a2fa19c.png"
                    alt="Ayush - Profile"
                    className="w-72 h-72 rounded-full object-cover hover-lift transition-all duration-500"
                  />
                </div>
              </div>
              
              {/* Rotating glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-conic from-neon-blue via-neon-purple to-neon-cyan opacity-20 animate-spin" style={{ animationDuration: '10s' }}></div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                About Me
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I'm a passionate full-stack developer with expertise in modern web technologies. 
                I love creating digital experiences that combine beautiful design with robust functionality.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With a strong foundation in the MEAN stack and proficiency in multiple programming languages, 
                I bring both technical expertise and creative problem-solving to every project.
              </p>
            </div>

            {/* Skills Grid */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">
                Technical Skills
              </h3>
              <div 
                ref={skillsRef}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {skills.map((skill, index) => (
                  <div 
                    key={skill.name}
                    className="glass-card p-4 text-center hover-lift group cursor-pointer"
                  >
                    <skill.icon 
                      size={32} 
                      className={`mx-auto mb-2 ${skill.color} group-hover:scale-110 transition-transform duration-300`}
                      weight="light"
                    />
                    <p className="text-sm font-medium text-foreground">
                      {skill.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-neon-purple/10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-neon-cyan/10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default About;