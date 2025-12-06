import { ArrowDown, Github, Linkedin, Mail, Phone } from "lucide-react";
import { Button } from "./ui/button";

export const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen relative overflow-hidden flex items-center">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Floating Shapes */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-3xl" />
      
      {/* Diagonal Lines Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-20">
        <div className="absolute top-0 right-0 w-full h-full">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-primary/40"
              style={{
                width: "1px",
                height: "200%",
                transform: `rotate(45deg)`,
                left: `${i * 12}%`,
                top: "-50%",
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-primary/50 bg-primary/5 backdrop-blur-sm animate-slide-in">
              <span className="w-2 h-2 bg-primary animate-pulse" />
              <span className="text-sm font-mono text-primary uppercase tracking-widest">
                Available for Work
              </span>
            </div>

            {/* Main Title */}
            <div className="space-y-4 animate-slide-in" style={{ animationDelay: "0.1s" }}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tighter">
                <span className="block text-foreground">APOORV</span>
                <span className="block text-gradient">MISHRA</span>
              </h1>
            </div>

            {/* Role */}
            <div className="animate-slide-in" style={{ animationDelay: "0.2s" }}>
              <p className="text-xl md:text-2xl font-mono text-muted-foreground">
                <span className="text-secondary">&gt;</span> Associate Software Developer
              </p>
              <p className="text-xl md:text-2xl font-mono text-muted-foreground">
                <span className="text-secondary">&gt;</span> Full Stack Engineer
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed animate-slide-in" style={{ animationDelay: "0.3s" }}>
              High-performance full-stack engineer specialized in{" "}
              <span className="text-primary font-semibold">microservices</span>,{" "}
              <span className="text-secondary font-semibold">optimized databases</span>, and{" "}
              <span className="text-accent font-semibold">cross-platform development</span>.
              Proven ability to deliver scalable solutions with measurable impact.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-slide-in" style={{ animationDelay: "0.4s" }}>
              <Button variant="hero" asChild>
                <a href="#projects">View Projects</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#contact">Get in Touch</a>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6 pt-4 animate-slide-in" style={{ animationDelay: "0.5s" }}>
              <a
                href="https://github.com/apoorvmishra14"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Github size={20} className="group-hover:animate-pulse" />
                <span className="text-sm font-mono hidden sm:inline">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/ApoorvMishra1402"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors"
              >
                <Linkedin size={20} className="group-hover:animate-pulse" />
                <span className="text-sm font-mono hidden sm:inline">LinkedIn</span>
              </a>
              <a
                href="mailto:mishraapoorv14@gmail.com"
                className="group flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
              >
                <Mail size={20} className="group-hover:animate-pulse" />
                <span className="text-sm font-mono hidden sm:inline">Email</span>
              </a>
              <a
                href="tel:+919508103499"
                className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone size={20} className="group-hover:animate-pulse" />
                <span className="text-sm font-mono hidden sm:inline">Call</span>
              </a>
            </div>
          </div>

          {/* Right Visual Element */}
          <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
            <div className="relative">
              {/* Abstract Shape */}
              <div className="w-80 h-80 border-2 border-primary/30 rotate-45 relative">
                <div className="absolute inset-4 border-2 border-secondary/30" />
                <div className="absolute inset-8 border-2 border-accent/30" />
                <div className="absolute inset-12 bg-gradient-to-br from-primary/10 to-secondary/10" />
                
                {/* Floating Stats */}
                <div className="absolute -top-16 -right-16 rotate-[-45deg] bg-card border-2 border-primary p-4 shadow-brutal">
                  <p className="text-3xl font-bold text-primary">50%</p>
                  <p className="text-xs font-mono text-muted-foreground">DB Response ↓</p>
                </div>
                
                <div className="absolute -bottom-16 -left-16 rotate-[-45deg] bg-card border-2 border-secondary p-4 shadow-brutal-cyan">
                  <p className="text-3xl font-bold text-secondary">10K+</p>
                  <p className="text-xs font-mono text-muted-foreground">TXN/min</p>
                </div>
              </div>
              
              {/* Decorative Circle */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-dashed border-primary/20 rounded-full animate-spin" style={{ animationDuration: "30s" }} />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Scroll</span>
          <ArrowDown size={16} className="text-primary" />
        </div>
      </div>
    </section>
  );
};
