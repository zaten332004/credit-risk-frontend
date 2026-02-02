import { Lightbulb, Target, Sparkles } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm text-accent font-medium uppercase tracking-wider">About</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-6 text-balance">
              About the Project
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed text-pretty">
              CRAI DB is an academic and research-oriented fintech project designed to demonstrate 
              the integration of modern data science, machine learning, and software engineering 
              in the domain of credit risk analytics.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed text-pretty">
              The platform emphasizes transparency, explainability, and real-world applicability, 
              making it suitable for academic evaluation, enterprise demonstration, and investor 
              presentation contexts.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Research-Driven</h4>
                  <p className="text-sm text-muted-foreground">Built on academic foundations with practical applications</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Industry-Aligned</h4>
                  <p className="text-sm text-muted-foreground">Follows enterprise standards and best practices</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Innovation-Focused</h4>
                  <p className="text-sm text-muted-foreground">Leveraging cutting-edge AI and cloud technologies</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="p-8 rounded-2xl bg-card border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-6">Project Highlights</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 rounded-lg bg-secondary">
                  <p className="text-3xl font-bold text-accent mb-1">6+</p>
                  <p className="text-sm text-muted-foreground">Integrated Layers</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary">
                  <p className="text-3xl font-bold text-accent mb-1">ML</p>
                  <p className="text-sm text-muted-foreground">Powered Scoring</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary">
                  <p className="text-3xl font-bold text-accent mb-1">SHAP</p>
                  <p className="text-sm text-muted-foreground">Explainability</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary">
                  <p className="text-3xl font-bold text-accent mb-1">AWS</p>
                  <p className="text-sm text-muted-foreground">Cloud Native</p>
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -z-10 top-4 left-4 right-4 bottom-4 rounded-2xl bg-accent/10 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
