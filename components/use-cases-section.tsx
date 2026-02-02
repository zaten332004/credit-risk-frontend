import { UserCheck, TrendingUp, Search, GraduationCap } from "lucide-react";

const useCases = [
  {
    icon: UserCheck,
    title: "Credit Officers",
    subtitle: "Loan Application Review",
    description: "Quickly assess loan applications with automated risk scoring and clear explanations of factors affecting each decision.",
    benefits: ["Faster decision-making", "Reduced manual analysis", "Consistent evaluations"],
  },
  {
    icon: TrendingUp,
    title: "Risk Managers",
    subtitle: "Portfolio Health Monitoring",
    description: "Monitor portfolio performance in real-time, identify emerging risks, and take proactive measures to mitigate losses.",
    benefits: ["Early warning alerts", "Trend analysis", "Segment deep-dives"],
  },
  {
    icon: Search,
    title: "Analysts",
    subtitle: "Model Exploration",
    description: "Explore model predictions through SHAP explanations, validate assumptions, and communicate findings to stakeholders.",
    benefits: ["Transparent insights", "Regulatory compliance", "Stakeholder reports"],
  },
  {
    icon: GraduationCap,
    title: "Students & Researchers",
    subtitle: "Learning Credit Risk",
    description: "Hands-on platform for learning credit risk analytics, ML modeling, and explainable AI in a real-world context.",
    benefits: ["Practical experience", "Industry-relevant skills", "Research applications"],
  },
];

export function UseCasesSection() {
  return (
    <section id="use-cases" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm text-accent font-medium uppercase tracking-wider">Applications</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4 text-balance">
            Use Cases
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            CRAI DB serves diverse users across the credit risk ecosystem.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="p-6 rounded-xl bg-secondary border border-border hover:border-accent/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <useCase.icon className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">{useCase.title}</h3>
                  <p className="text-sm text-accent mb-2">{useCase.subtitle}</p>
                  <p className="text-sm text-muted-foreground mb-4">{useCase.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {useCase.benefits.map((benefit) => (
                      <span
                        key={benefit}
                        className="px-3 py-1 text-xs bg-background rounded-full text-muted-foreground border border-border"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
