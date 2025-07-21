import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowSquareOut, GithubLogo } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: 'Code with Robot',
      description: 'Educational platform for learning programming with interactive tutorials and AI assistance.',
      image: '/lovable-uploads/b14dadb7-a786-4e5f-82a0-e40b3c422a7d.png',
      tech: ['React', 'Node.js', 'AI/ML', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'Calorie Tracker',
      description: 'Modern fitness app for tracking calories, workouts, and health metrics with beautiful UI.',
      image: '/lovable-uploads/a764352a-98a5-4dbf-8aba-acb5f7a9148a.png',
      tech: ['React Native', 'Express', 'Firebase', 'Chart.js'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'Skill Swap Platform',
      description: 'Peer-to-peer learning platform where users can exchange skills and knowledge.',
      image: '/lovable-uploads/b6c73aa4-7aad-4058-b206-424553beccd5.png',
      tech: ['Angular', 'Node.js', 'Socket.io', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 4,
      title: 'Social Analytics Dashboard',
      description: 'Comprehensive social media analytics tool with real-time data visualization.',
      image: '/lovable-uploads/3c782697-ede1-4b82-a286-10c12d90c3e5.png',
      tech: ['Vue.js', 'Python', 'D3.js', 'Redis'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 5,
      title: 'E-Commerce Platform',
      description: 'Full-featured online store with payment integration and admin dashboard.',
      image: '/placeholder.svg',
      tech: ['Next.js', 'Stripe', 'Prisma', 'Tailwind'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 6,
      title: 'Task Management App',
      description: 'Collaborative project management tool with real-time updates and team features.',
      image: '/placeholder.svg',
      tech: ['React', 'Express', 'WebRTC', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#'
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
    gsap.set(projectsRef.current?.children, { 
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
    .to(projectsRef.current?.children, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.15
    }, "-=0.5");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-6 relative"
      id="projects"
    >
      <div className="max-w-7xl mx-auto">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
        >
          Featured Projects
        </h2>

        {/* Projects Grid */}
        <div 
          ref={projectsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <div 
              key={project.id}
              className="glass-card p-6 hover-lift group cursor-pointer"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-lg mb-6">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Project Info */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 text-xs font-medium bg-secondary/50 text-secondary-foreground rounded-full border border-glass-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1 border-glass-border hover:bg-primary/10 hover:border-primary/50"
                  >
                    <ArrowSquareOut size={16} className="mr-2" weight="light" />
                    Live Demo
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="flex-1 hover:bg-secondary/20"
                  >
                    <GithubLogo size={16} className="mr-2" weight="light" />
                    Code
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-5 w-24 h-24 rounded-full bg-neon-blue/10 blur-2xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-neon-purple/10 blur-2xl animate-pulse" style={{ animationDelay: '3s' }}></div>
    </section>
  );
};

export default Projects;