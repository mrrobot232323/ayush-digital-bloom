import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { GithubLogo, LinkedinLogo, TwitterLogo, EnvelopeSimple } from 'phosphor-react';
import { useToast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: GithubLogo, 
      url: 'https://github.com',
      color: 'hover:text-white'
    },
    { 
      name: 'LinkedIn', 
      icon: LinkedinLogo, 
      url: 'https://linkedin.com',
      color: 'hover:text-blue-400'
    },
    { 
      name: 'Twitter', 
      icon: TwitterLogo, 
      url: 'https://twitter.com',
      color: 'hover:text-blue-400'
    },
    { 
      name: 'Email', 
      icon: EnvelopeSimple, 
      url: 'mailto:ayush@example.com',
      color: 'hover:text-red-400'
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
    gsap.set([titleRef.current, formRef.current], { 
      opacity: 0, 
      y: 50, 
      filter: 'blur(10px)' 
    });
    gsap.set(formRef.current?.children, { 
      opacity: 0, 
      x: -50 
    });
    gsap.set(socialsRef.current?.children, { 
      opacity: 0, 
      scale: 0.8, 
      rotation: -180 
    });

    // Animate elements
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: "power2.out"
    })
    .to(formRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: "power2.out"
    }, "-=0.5")
    .to(formRef.current?.children, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.1
    }, "-=0.5")
    .to(socialsRef.current?.children, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: 0.1
    }, "-=0.3");

    return () => {
      tl.kill();
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Animate submit button
    gsap.to(e.target, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });

    // Show success toast
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });

    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-6 relative"
      id="contact"
    >
      <div className="max-w-4xl mx-auto">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
        >
          Let's Work Together
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="glass-card p-8">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">
              Send me a message
            </h3>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-background/50 border-glass-border focus:border-primary focus:ring-primary/20 backdrop-blur-sm"
                />
              </div>
              
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-background/50 border-glass-border focus:border-primary focus:ring-primary/20 backdrop-blur-sm"
                />
              </div>
              
              <div>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="bg-background/50 border-glass-border focus:border-primary focus:ring-primary/20 backdrop-blur-sm resize-none"
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-cyan text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg neon-glow"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info & Social Links */}
          <div className="space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">
                Get in touch
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I'm always interested in new opportunities and exciting projects. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              <div className="space-y-4">
                <p className="text-foreground">
                  <span className="text-muted-foreground">Email:</span> ayush@example.com
                </p>
                <p className="text-foreground">
                  <span className="text-muted-foreground">Location:</span> Available for remote work
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold mb-6 text-foreground">
                Connect with me
              </h3>
              <div 
                ref={socialsRef}
                className="flex gap-4"
              >
                {socialLinks.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-xl bg-secondary/20 border border-glass-border hover:border-primary/50 transition-all duration-300 hover-lift ${social.color}`}
                  >
                    <social.icon size={24} weight="light" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-20 h-20 rounded-full bg-neon-pink/10 blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-28 h-28 rounded-full bg-neon-cyan/10 blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
    </section>
  );
};

export default Contact;