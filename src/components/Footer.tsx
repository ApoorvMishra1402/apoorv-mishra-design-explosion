export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t-2 border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-gradient">AM</span>
            <div className="h-6 w-[2px] bg-primary" />
            <span className="font-mono text-sm text-muted-foreground">APOORV MISHRA</span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground font-mono">
            © {currentYear} • Built with passion
          </p>

          {/* Status */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary animate-pulse" />
            <span className="text-sm font-mono text-muted-foreground">
              Available for new opportunities
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
