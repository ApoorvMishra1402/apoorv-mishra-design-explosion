import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { BlogSection } from "@/components/BlogSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { trackPageView } from "@/lib/analytics";
// removed admin-only messages from home; messages now live in Admin page

const Index = () => {
  

  useEffect(() => {
    trackPageView("home");
  }, []);

  return (
    <>
      <Helmet>
        <title>Apoorv Mishra | Full Stack Developer & Software Engineer</title>
        <meta
          name="description"
          content="High-performance full-stack engineer specialized in microservices, optimized databases, and cross-platform development. Building scalable solutions with measurable impact."
        />
        <meta property="og:title" content="Apoorv Mishra | Full Stack Developer" />
        <meta
          property="og:description"
          content="High-performance full-stack engineer specialized in microservices, optimized databases, and cross-platform development."
        />
      </Helmet>
      
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Custom Cursor */}
        <CustomCursor />
        
        {/* Noise Overlay */}
        <div className="fixed inset-0 pointer-events-none bg-noise z-50" />
        
        <Navigation />
        <main>
          <HeroSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <BlogSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
