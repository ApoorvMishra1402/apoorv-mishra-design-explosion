import { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { trackEvent } from "@/lib/analytics";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDownloadCV = () => {
    trackEvent("cv_download", { source: "navigation" });
    window.open("/Apoorv_Mishra_CV.pdf", "_blank");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-primary/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="group flex items-center gap-2">
            <span className="text-2xl font-bold text-gradient">AM</span>
            <div className="h-6 w-[2px] bg-primary group-hover:animate-pulse-glow" />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 uppercase tracking-wider group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownloadCV}
              className="border-2 border-border hover:border-secondary/50"
            >
              <Download size={16} />
              CV
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="#contact">Let's Talk</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary transition-colors p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-6 border-t border-border/50 space-y-4">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-lg font-medium text-muted-foreground hover:text-primary transition-colors duration-300 uppercase tracking-wider"
              >
                <span className="text-primary font-mono text-sm mr-2">0{index + 1}</span>
                {item.label}
              </a>
            ))}
            <div className="flex gap-3 pt-4">
              <Button variant="ghost" size="sm" onClick={handleDownloadCV} className="flex-1">
                <Download size={16} />
                Download CV
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <a href="#contact">Let's Talk</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
