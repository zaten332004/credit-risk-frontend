import { AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";

const problems = [
  "Opaque credit decisions that lack transparency",
  "Delayed insights from manual risk monitoring",
  "Difficulty explaining model predictions to stakeholders",
  "Siloed data across multiple systems",
];

const solutions = [
  "Automated ML-driven credit risk scoring",
  "Real-time dashboards with instant insights",
  "SHAP-based explainability for every decision",
  "Unified data layer with end-to-end integration",
];

export function ProblemSolutionSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            The Challenge & Our Solution
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Financial institutions struggle with traditional credit risk assessment. 
            CRAI DB transforms this with intelligent automation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Problems */}
          <div className="p-8 rounded-2xl bg-destructive/5 border border-destructive/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">The Problem</h3>
            </div>
            <ul className="space-y-4">
              {problems.map((problem, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-destructive font-medium">{index + 1}</span>
                  </span>
                  <span className="text-muted-foreground">{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div className="p-8 rounded-2xl bg-accent/5 border border-accent/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Our Solution</h3>
            </div>
            <ul className="space-y-4">
              {solutions.map((solution, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-accent" />
                  </span>
                  <span className="text-muted-foreground">{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Transformation arrow */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-secondary border border-border">
            <span className="text-sm text-muted-foreground">From Manual</span>
            <ArrowRight className="w-4 h-4 text-accent" />
            <span className="text-sm text-foreground font-medium">To Intelligent</span>
          </div>
        </div>
      </div>
    </section>
  );
}
