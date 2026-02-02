"use client";

import { Database, Brain, BarChart3, MessageSquare, Smartphone, Cloud, ArrowDown, ArrowRight } from "lucide-react";

const architectureLayers = [
  {
    icon: Database,
    title: "Data Layer",
    description: "SQL Server / CreditRiskDB",
    details: "Centralized data storage with loan portfolios, customer profiles, and historical performance data.",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    icon: Brain,
    title: "Analytics & ML Layer",
    description: "Risk Prediction & SHAP Explainability",
    details: "Machine learning models for PD estimation, risk scoring, and SHAP-based feature importance analysis.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: BarChart3,
    title: "Dashboard Layer",
    description: "Power BI Integration",
    details: "Interactive visualizations for portfolio monitoring, trend analysis, and KPI tracking.",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    icon: MessageSquare,
    title: "Chatbot Layer",
    description: "Langflow + LLM",
    details: "Natural language interface for querying risk data, generating reports, and answering analytics questions.",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
  {
    icon: Smartphone,
    title: "Frontend Layer",
    description: "Flutter Cross-Platform",
    details: "Responsive user interface accessible on web, mobile, and desktop platforms.",
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "AWS (EC2, S3, Lambda, RDS)",
    details: "Scalable, secure cloud deployment with automated pipelines and managed services.",
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
];

export function ArchitectureSection() {
  return (
    <section id="architecture" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm text-accent font-medium uppercase tracking-wider">System Design</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4 text-balance">
            System Architecture
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            A modular, scalable architecture designed for enterprise-grade credit risk analytics.
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="relative">
          {/* Main flow diagram */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {architectureLayers.map((layer, index) => (
              <div
                key={layer.title}
                className="relative group"
              >
                <div className="p-6 rounded-xl bg-secondary border border-border hover:border-accent/50 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-lg ${layer.bgColor} flex items-center justify-center mb-4`}>
                    <layer.icon className={`w-6 h-6 ${layer.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{layer.title}</h3>
                  <p className="text-sm text-accent mb-3">{layer.description}</p>
                  <p className="text-sm text-muted-foreground">{layer.details}</p>
                </div>

                {/* Connection arrows for desktop */}
                {index < architectureLayers.length - 1 && index !== 2 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-border" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Data flow description */}
          <div className="mt-12 p-6 rounded-xl bg-secondary border border-border">
            <h4 className="text-lg font-semibold text-foreground mb-4">End-to-End Data Flow</h4>
            <div className="grid md:grid-cols-5 gap-4 items-center">
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-2">
                  <span className="text-sm font-bold text-accent">1</span>
                </div>
                <p className="text-xs text-muted-foreground">Data Ingestion</p>
              </div>
              <ArrowRight className="hidden md:block w-6 h-6 text-border mx-auto" />
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-2">
                  <span className="text-sm font-bold text-accent">2</span>
                </div>
                <p className="text-xs text-muted-foreground">ML Processing</p>
              </div>
              <ArrowRight className="hidden md:block w-6 h-6 text-border mx-auto" />
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-2">
                  <span className="text-sm font-bold text-accent">3</span>
                </div>
                <p className="text-xs text-muted-foreground">Visualization & Interaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
