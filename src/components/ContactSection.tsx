import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "./ui/button";

export const ContactSection = () => {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-grid opacity-10" />
      
      {/* Glow Effects */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 blur-3xl" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/10 blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-primary font-mono text-sm">05</span>
          <h2 className="text-4xl md:text-5xl font-bold">Contact</h2>
          <div className="flex-1 h-[2px] bg-gradient-to-r from-primary/50 to-transparent" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - CTA */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl md:text-4xl font-bold">
                Let's Build Something{" "}
                <span className="text-gradient">Extraordinary</span>
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Whether you need a full-stack solution, performance optimization, or technical consultation, let's connect.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              <a
                href="mailto:mishraapoorv14@gmail.com"
                className="group flex items-center gap-4 p-4 bg-card border-2 border-border hover:border-primary/50 transition-all hover-lift"
              >
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-sm font-mono text-muted-foreground uppercase">Email</p>
                  <p className="text-foreground font-medium">mishraapoorv14@gmail.com</p>
                </div>
              </a>

              <a
                href="tel:+919508103499"
                className="group flex items-center gap-4 p-4 bg-card border-2 border-border hover:border-secondary/50 transition-all hover-lift"
              >
                <div className="w-12 h-12 bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <Phone className="text-secondary" size={24} />
                </div>
                <div>
                  <p className="text-sm font-mono text-muted-foreground uppercase">Phone</p>
                  <p className="text-foreground font-medium">+91-9508103499</p>
                </div>
              </a>

              <div className="group flex items-center gap-4 p-4 bg-card border-2 border-border">
                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center">
                  <MapPin className="text-accent" size={24} />
                </div>
                <div>
                  <p className="text-sm font-mono text-muted-foreground uppercase">Location</p>
                  <p className="text-foreground font-medium">India • Available Remote</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://github.com/apoorvmishra14"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-card border-2 border-border hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all hover-lift"
              >
                <Github size={24} className="text-muted-foreground hover:text-primary" />
              </a>
              <a
                href="https://linkedin.com/in/ApoorvMishra1402"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-card border-2 border-border hover:border-secondary hover:bg-secondary/10 flex items-center justify-center transition-all hover-lift"
              >
                <Linkedin size={24} className="text-muted-foreground hover:text-secondary" />
              </a>
            </div>
          </div>

          {/* Right - Visual Element */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* Animated Rings */}
              <div className="absolute inset-0 border-2 border-primary/20 animate-pulse" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
              <div className="absolute inset-8 border-2 border-secondary/20 animate-pulse" style={{ animationDelay: "0.5s", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
              <div className="absolute inset-16 border-2 border-accent/20 animate-pulse" style={{ animationDelay: "1s", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
              
              {/* Center Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto bg-primary/20 border-2 border-primary flex items-center justify-center animate-float">
                    <Send size={32} className="text-primary" />
                  </div>
                  <p className="font-mono text-sm text-muted-foreground">Ready to Connect</p>
                </div>
              </div>

              {/* Decorative Dots */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-secondary" />
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-accent" />
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
