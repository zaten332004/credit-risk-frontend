import { Server, BarChart3, Smartphone, Bot, Cloud, Shield } from "lucide-react";

const technologies = [
  {
    category: "Backend & Data",
    icon: Server,
    items: ["SQL Server", "Python", "Scikit-learn", "XGBoost", "SHAP"],
    description: "Robust data infrastructure with advanced ML capabilities",
  },
  {
    category: "Dashboard",
    icon: BarChart3,
    items: ["Power BI", "DAX", "M Query", "Direct Query"],
    description: "Enterprise-grade business intelligence and visualization",
  },
  {
    category: "Frontend",
    icon: Smartphone,
    items: ["Flutter", "Dart", "Material Design", "Responsive UI"],
    description: "Cross-platform application development",
  },
  {
    category: "Chatbot",
    icon: Bot,
    items: ["Langflow", "LLM Integration", "RAG", "NLP"],
    description: "Conversational AI with natural language understanding",
  },
  {
    category: "Cloud",
    icon: Cloud,
    items: ["AWS EC2", "S3", "Lambda", "RDS", "CloudWatch"],
    description: "Scalable and reliable cloud infrastructure",
  },
  {
    category: "Security",
    icon: Shield,
    items: ["IAM", "Encryption", "Audit Logs", "Compliance"],
    description: "Enterprise security and governance standards",
  },
];

export function TechnologySection() {
  return (
    <section id="technology" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm text-accent font-medium uppercase tracking-wider">Tech Stack</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4 text-balance">
            Technology Stack
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Built with industry-standard technologies for performance, scalability, and maintainability.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech) => (
            <div
              key={tech.category}
              className="p-6 rounded-xl bg-secondary border border-border hover:border-accent/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <tech.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{tech.category}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{tech.description}</p>
              <div className="flex flex-wrap gap-2">
                {tech.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 text-xs font-medium bg-background rounded-full text-muted-foreground border border-border"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
