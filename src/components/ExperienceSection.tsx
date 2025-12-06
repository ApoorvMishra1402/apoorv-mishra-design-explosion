import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    title: "Associate Software Developer",
    company: "Medical Technology Company",
    location: "Remote",
    period: "April 2025 – November 2025",
    highlights: [
      "Developed and maintained 3+ healthcare applications, leading to a 20% faster turnaround time for new feature requests",
      "Engineered complex SQL Server stored procedures, reducing database response time by 50%",
      "Built cross-platform mobile application using React Native, cutting chart retrieval time by 60%",
      "Designed RESTful backend APIs in .NET Core 8, reducing average API response time by over 250ms",
    ],
    metrics: ["50% DB↓", "60% Faster", "3+ Apps"],
    color: "primary",
  },
  {
    title: "Full Stack Developer Intern",
    company: "Wealthcore",
    location: "Remote",
    period: "December 2023 – February 2025",
    highlights: [
      "Built high-performance multi-asset trading application processing over 10,000 transactions per minute",
      "Architected microservice-based backend using Node.js, improving scalability by 30%",
      "Built dynamic React frontend with real-time data updates, improving user engagement by 35%",
      "Optimized MySQL database schema, resulting in 60% decrease in latency for financial data reporting",
    ],
    metrics: ["10K TXN/min", "35% Engage↑", "60% Latency↓"],
    color: "secondary",
  },
  {
    title: "UI/UX Designer and Developer",
    company: "IQuestStar",
    location: "Gurugram, Delhi",
    period: "April 2022 – July 2022",
    highlights: [
      "Enhanced web design through comprehensive UX testing, contributing to 15% increase in user session duration",
      "Designed and created responsive websites, achieving 40% improvement in mobile usability scores",
    ],
    metrics: ["15% Session↑", "40% Mobile↑"],
    color: "accent",
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-primary font-mono text-sm">02</span>
          <h2 className="text-4xl md:text-5xl font-bold">Experience</h2>
          <div className="flex-1 h-[2px] bg-gradient-to-r from-primary/50 to-transparent" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-accent" />

          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative mb-16 md:mb-24 ${
                index % 2 === 0 ? "md:pr-[55%]" : "md:pl-[55%] md:text-left"
              }`}
            >
              {/* Timeline Dot */}
              <div
                className={`absolute left-0 md:left-1/2 w-4 h-4 -translate-x-[7px] md:-translate-x-1/2 bg-${exp.color} border-2 border-background z-10`}
                style={{
                  boxShadow: `0 0 20px hsl(var(--${exp.color}) / 0.5)`,
                }}
              />

              {/* Content Card */}
              <div
                className={`ml-8 md:ml-0 bg-card border-2 border-${exp.color}/30 p-6 md:p-8 hover-lift group`}
                style={{
                  clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
                }}
              >
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className={`text-xl md:text-2xl font-bold text-${exp.color} mb-1`}>
                      {exp.title}
                    </h3>
                    <p className="text-lg text-foreground font-semibold">{exp.company}</p>
                  </div>
                  
                  {/* Metrics Pills */}
                  <div className="flex flex-wrap gap-2">
                    {exp.metrics.map((metric, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 text-xs font-mono bg-${exp.color}/10 text-${exp.color} border border-${exp.color}/30`}
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Calendar size={14} className={`text-${exp.color}`} />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin size={14} className={`text-${exp.color}`} />
                    {exp.location}
                  </span>
                </div>

                {/* Highlights */}
                <ul className="space-y-3">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="flex gap-3 text-muted-foreground group-hover:text-foreground/80 transition-colors">
                      <span className={`text-${exp.color} mt-1`}>→</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
