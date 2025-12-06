const skillCategories = [
  {
    title: "Frontend Stacks",
    icon: "◇",
    skills: ["React", "React Native", "Next.js", "TypeScript", "HTML/CSS", "Tailwind CSS"],
    color: "primary",
  },
  {
    title: "Backend Systems",
    icon: "◆",
    skills: [".NET Core 8", ".NET MVC", "Node.js", "Express.js", "RESTful APIs", "Microservices"],
    color: "secondary",
  },
  {
    title: "Data & Storage",
    icon: "◈",
    skills: ["SQL Server", "MySQL", "PostgreSQL", "MongoDB", "T-SQL", "Database Optimization"],
    color: "accent",
  },
  {
    title: "DevOps & Tools",
    icon: "◉",
    skills: ["Docker", "Git/GitHub", "PM2", "IIS", "AWS S3", "Swagger"],
    color: "primary",
  },
  {
    title: "Languages",
    icon: "◊",
    skills: ["C#", "JavaScript", "TypeScript", "Python", "SQL", "Java"],
    color: "secondary",
  },
  {
    title: "Specialized",
    icon: "●",
    skills: ["Apache Spark", "Kafka", "HIPAA Compliance", "Agile/SDLC", "System Integration", "UI/UX Design"],
    color: "accent",
  },
];

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-accent font-mono text-sm">04</span>
          <h2 className="text-4xl md:text-5xl font-bold">Skills</h2>
          <div className="flex-1 h-[2px] bg-gradient-to-r from-accent/50 to-transparent" />
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="group relative bg-card border-2 border-border hover:border-primary/50 p-6 transition-all duration-300 hover-lift"
              style={{
                clipPath:
                  index % 2 === 0
                    ? "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)"
                    : "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%, 0 0)",
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className={`text-2xl text-${category.color}`}>{category.icon}</span>
                <h3 className="text-lg font-bold uppercase tracking-wider">{category.title}</h3>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1.5 text-sm font-mono bg-muted/50 text-muted-foreground border border-transparent hover:border-${category.color}/50 hover:text-${category.color} transition-all duration-200`}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Decorative Corner */}
              <div
                className={`absolute bottom-0 right-0 w-8 h-8 bg-${category.color}/10 opacity-0 group-hover:opacity-100 transition-opacity`}
              />
            </div>
          ))}
        </div>

        {/* Skill Marquee */}
        <div className="mt-16 overflow-hidden border-y-2 border-border py-4">
          <div className="animate-marquee whitespace-nowrap flex gap-8">
            {[...skillCategories, ...skillCategories].flatMap((cat) =>
              cat.skills.map((skill, i) => (
                <span
                  key={`${cat.title}-${skill}-${i}`}
                  className="text-xl font-bold text-muted-foreground/30 hover:text-primary transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
