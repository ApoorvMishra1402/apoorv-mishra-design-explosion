import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { Button } from "./ui/button";

const blogPosts = [
  {
    id: 1,
    title: "Building High-Performance Trading Systems with Node.js",
    excerpt:
      "Lessons learned from architecting a multi-asset trading application that processes over 10,000 transactions per minute with sub-100ms latency.",
    date: "2024-11-15",
    readTime: "8 min read",
    tags: ["Node.js", "Performance", "Architecture"],
    color: "primary",
  },
  {
    id: 2,
    title: "Database Optimization: From 500ms to 50ms Query Times",
    excerpt:
      "A deep dive into SQL Server stored procedure optimization techniques that helped us achieve a 90% reduction in database response times.",
    date: "2024-10-22",
    readTime: "12 min read",
    tags: ["SQL", "Optimization", "Performance"],
    color: "secondary",
  },
  {
    id: 3,
    title: "Cross-Platform Mobile Development with React Native",
    excerpt:
      "How we built a healthcare app that reduced chart retrieval time by 60% while maintaining HIPAA compliance across iOS and Android.",
    date: "2024-09-18",
    readTime: "10 min read",
    tags: ["React Native", "Mobile", "Healthcare"],
    color: "accent",
  },
  {
    id: 4,
    title: "Real-Time Data Pipelines with Apache Kafka",
    excerpt:
      "Building a recommendation system that processes 1M+ entries and generates personalized suggestions in under 500ms using Kafka streams.",
    date: "2024-08-05",
    readTime: "15 min read",
    tags: ["Kafka", "Spark", "Big Data"],
    color: "primary",
  },
];

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const BlogSection = () => {
  const handleReadMore = (postId: number) => {
    // Scroll to top and show toast - in a real app, this would navigate to the blog post
    window.scrollTo({ top: 0, behavior: "smooth" });
    alert(`Blog post ${postId} - Full article coming soon! This portfolio demonstrates the blog structure.`);
  };

  return (
    <section id="blog" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-muted/20" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-primary font-mono text-sm">06</span>
          <h2 className="text-4xl md:text-5xl font-bold">Thoughts</h2>
          <div className="flex-1 h-[2px] bg-gradient-to-r from-primary/50 to-transparent" />
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className="group relative bg-card border-2 border-border hover:border-primary/50 p-6 md:p-8 transition-all duration-300 hover-lift"
              style={{
                clipPath:
                  index % 2 === 0
                    ? "polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%)"
                    : "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)",
              }}
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-mono bg-${post.color}/10 text-${post.color} border border-${post.color}/30`}
                  >
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-gradient transition-all mb-3">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Meta & CTA */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} className={`text-${post.color}`} />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} className={`text-${post.color}`} />
                    {post.readTime}
                  </span>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleReadMore(post.id)}
                  className="group/btn"
                >
                  Read More
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover/btn:translate-x-1"
                  />
                </Button>
              </div>

              {/* Decorative Corner */}
              <div
                className={`absolute bottom-0 right-0 w-6 h-6 bg-${post.color}/20 opacity-0 group-hover:opacity-100 transition-opacity`}
              />
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => alert("Full blog archive coming soon!")}
          >
            View All Articles
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};
