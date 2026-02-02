import {
  TrendingUp,
  Eye,
  PieChart,
  Bell,
  MessageCircle,
  FileText,
} from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Credit Risk Scoring",
    description: "ML-powered probability of default (PD) estimation and risk level classification for every borrower.",
  },
  {
    icon: Eye,
    title: "Explainable AI with SHAP",
    description: "Transparent model explanations showing which factors drive each credit decision using SHAP values.",
  },
  {
    icon: PieChart,
    title: "Portfolio Monitoring",
    description: "Real-time loan portfolio dashboards with drill-down analytics and performance tracking.",
  },
  {
    icon: Bell,
    title: "Delinquency Alerts",
    description: "Automated early warning system for identifying at-risk accounts and triggering timely interventions.",
  },
  {
    icon: MessageCircle,
    title: "Conversational Analytics",
    description: "Natural language chatbot for querying risk data, generating insights, and answering complex questions.",
  },
  {
    icon: FileText,
    title: "Audit & Versioning",
    description: "Complete audit trails with model versioning, decision logging, and regulatory compliance support.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm text-accent font-medium uppercase tracking-wider">Capabilities</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4 text-balance">
            Core Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Comprehensive tools for modern credit risk management, from scoring to explanation to action.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl bg-card border border-border hover:border-accent/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
