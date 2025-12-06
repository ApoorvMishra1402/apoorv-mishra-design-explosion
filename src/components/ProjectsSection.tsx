import { ExternalLink, Github, Zap } from "lucide-react";
import { Button } from "./ui/button";

const projects = [
  {
    title: "E-Commerce Platform",
    subtitle: "Secure Full-Stack Solution",
    status: "Ongoing",
    description:
      "A full-stack platform managing 1,000+ SKUs with optimized image handling, secure checkout with Razorpay integration, and GST/HSN tax compliance.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Razorpay", "Tailwind CSS"],
    metrics: [
      { label: "Page Load", value: "30%↓" },
      { label: "Success Rate", value: "99.9%" },
      { label: "Mobile Conv.", value: "25%↑" },
    ],
    highlights: [
      "Optimized static asset delivery reducing page load by 30%",
      "Integrated secure payment gateway processing with 99.9% success rate",
      "Mobile-first UI components increasing conversion by 25%",
    ],
    color: "primary",
  },
  {
    title: "Multi-Asset Trading App",
    subtitle: "High-Frequency Systems",
    status: "2024",
    description:
      "A scalable MERN stack application capable of processing over 5,000 requests per second with sub-100ms latency using microservice architecture.",
    tech: ["React.js", "Node.js", "MySQL", "Express", "Swagger"],
    metrics: [
      { label: "Requests/sec", value: "5K+" },
      { label: "Latency", value: "<100ms" },
      { label: "Dev Time", value: "40%↓" },
    ],
    highlights: [
      "Built scalable architecture handling 5,000+ requests per second",
      "Achieved sub-100ms latency for real-time trading operations",
      "Microservice design reducing development time by 40%",
    ],
    color: "secondary",
  },
  {
    title: "Movie Recommendation System",
    subtitle: "Spark/Kafka Pipeline",
    status: "2023",
    description:
      "An intelligent recommendation system processing 1M+ entry datasets with real-time data ingestion pipeline capable of handling 10,000+ events per minute.",
    tech: ["Apache Spark", "Kafka", "AWS S3", "Flask", "Python"],
    metrics: [
      { label: "Dataset", value: "1M+" },
      { label: "Response", value: "<500ms" },
      { label: "Events/min", value: "10K+" },
    ],
    highlights: [
      "Processed 1M+ entry dataset for personalized recommendations",
      "Generated user recommendations in under 500ms",
      "Real-time Kafka pipeline handling 10,000+ events per minute",
    ],
    color: "accent",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-32 relative overflow-hidden bg-muted/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-secondary font-mono text-sm">03</span>
          <h2 className="text-4xl md:text-5xl font-bold">Projects</h2>
          <div className="flex-1 h-[2px] bg-gradient-to-r from-secondary/50 to-transparent" />
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-card border-2 border-border hover:border-primary/50 transition-all duration-500"
            >
              {/* Corner Decorations */}
              <div className={`absolute top-0 right-0 w-16 h-16 border-l-2 border-b-2 border-${project.color}/50 bg-${project.color}/5`} />
              <div className={`absolute bottom-0 left-0 w-16 h-16 border-r-2 border-t-2 border-${project.color}/50 bg-${project.color}/5`} />

              <div className="p-6 md:p-10">
                <div className="grid lg:grid-cols-12 gap-8">
                  {/* Left Column - Main Info */}
                  <div className="lg:col-span-7 space-y-6">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-2 py-1 text-xs font-mono bg-${project.color}/20 text-${project.color} border border-${project.color}/30`}>
                            {project.status}
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-gradient transition-all">
                          {project.title}
                        </h3>
                        <p className={`text-${project.color} font-mono text-sm mt-1`}>
                          {project.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <Zap size={14} className={`text-${project.color} mt-1 flex-shrink-0`} />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 text-xs font-mono bg-muted text-muted-foreground border border-border hover:border-primary/50 hover:text-primary transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column - Metrics */}
                  <div className="lg:col-span-5">
                    <div className="h-full flex flex-col justify-center">
                      <div className="grid grid-cols-3 gap-4">
                        {project.metrics.map((metric, i) => (
                          <div
                            key={i}
                            className={`text-center p-4 border-2 border-${project.color}/20 bg-${project.color}/5 hover:border-${project.color}/50 transition-colors`}
                          >
                            <p className={`text-2xl md:text-3xl font-bold text-${project.color}`}>
                              {metric.value}
                            </p>
                            <p className="text-xs font-mono text-muted-foreground mt-1 uppercase">
                              {metric.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
