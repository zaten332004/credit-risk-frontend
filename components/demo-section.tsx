"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BarChart3, MessageSquare, TrendingUp, ChevronRight } from "lucide-react";

const demoTabs = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "chatbot", label: "Chatbot", icon: MessageSquare },
  { id: "shap", label: "SHAP Analysis", icon: TrendingUp },
];

export function DemoSection() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <section id="demo" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm text-accent font-medium uppercase tracking-wider">Preview</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4 text-balance">
            Demo & Screenshots
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Explore the key interfaces and capabilities of the CRAI DB platform.
          </p>
        </div>

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {demoTabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id)}
              className="gap-2"
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Demo content */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          {/* Window header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-secondary border-b border-border">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive/50" />
              <div className="w-3 h-3 rounded-full bg-chart-4/50" />
              <div className="w-3 h-3 rounded-full bg-chart-3/50" />
            </div>
            <span className="text-xs text-muted-foreground ml-2">
              {activeTab === "dashboard" && "Power BI Dashboard - Loan Portfolio Overview"}
              {activeTab === "chatbot" && "CRAI Assistant - Conversational Analytics"}
              {activeTab === "shap" && "SHAP Explainability - Risk Factor Analysis"}
            </span>
          </div>

          {/* Demo area */}
          <div className="p-8 min-h-[400px]">
            {activeTab === "dashboard" && <DashboardDemo />}
            {activeTab === "chatbot" && <ChatbotDemo />}
            {activeTab === "shap" && <ShapDemo />}
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardDemo() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* KPI Cards */}
      <div className="p-4 rounded-lg bg-secondary border border-border">
        <p className="text-xs text-muted-foreground mb-1">Total Loans</p>
        <p className="text-2xl font-bold text-foreground">12,847</p>
        <p className="text-xs text-accent mt-1">+5.2% this month</p>
      </div>
      <div className="p-4 rounded-lg bg-secondary border border-border">
        <p className="text-xs text-muted-foreground mb-1">Portfolio Value</p>
        <p className="text-2xl font-bold text-foreground">$847M</p>
        <p className="text-xs text-chart-3 mt-1">+12.8% YoY</p>
      </div>
      <div className="p-4 rounded-lg bg-secondary border border-border">
        <p className="text-xs text-muted-foreground mb-1">Avg. Risk Score</p>
        <p className="text-2xl font-bold text-foreground">0.23</p>
        <p className="text-xs text-accent mt-1">Low Risk</p>
      </div>
      <div className="p-4 rounded-lg bg-secondary border border-border">
        <p className="text-xs text-muted-foreground mb-1">Delinquency Rate</p>
        <p className="text-2xl font-bold text-foreground">2.4%</p>
        <p className="text-xs text-destructive mt-1">-0.3% vs last quarter</p>
      </div>

      {/* Chart placeholder */}
      <div className="col-span-2 lg:col-span-3 p-4 rounded-lg bg-secondary border border-border">
        <p className="text-sm font-medium text-foreground mb-4">Risk Distribution by Segment</p>
        <div className="flex items-end justify-between h-40 gap-2">
          {[65, 45, 80, 55, 70, 40, 85, 60, 50, 75, 45, 90].map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-accent/30 rounded-t hover:bg-accent/50 transition-colors"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Jan</span>
          <span>Jun</span>
          <span>Dec</span>
        </div>
      </div>

      {/* Risk breakdown */}
      <div className="col-span-2 lg:col-span-1 p-4 rounded-lg bg-secondary border border-border">
        <p className="text-sm font-medium text-foreground mb-4">Risk Categories</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-chart-3" />
              <span className="text-xs text-muted-foreground">Low</span>
            </div>
            <span className="text-sm font-medium text-foreground">68%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-chart-4" />
              <span className="text-xs text-muted-foreground">Medium</span>
            </div>
            <span className="text-sm font-medium text-foreground">24%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <span className="text-xs text-muted-foreground">High</span>
            </div>
            <span className="text-sm font-medium text-foreground">8%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatbotDemo() {
  const messages = [
    { role: "user", content: "What is the current delinquency rate for the SME portfolio?" },
    { role: "assistant", content: "The current delinquency rate for the SME portfolio is 3.2%, which is 0.4% lower than last quarter. The improvement is primarily driven by better early-warning interventions in the manufacturing sector." },
    { role: "user", content: "Which customers have the highest probability of default?" },
    { role: "assistant", content: "Here are the top 5 customers with the highest PD scores:\n\n1. Acme Corp (ID: 12847) - PD: 0.78\n2. Beta Industries (ID: 9234) - PD: 0.71\n3. Gamma Solutions (ID: 5621) - PD: 0.68\n\nWould you like me to show the SHAP analysis for any of these customers?" },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-xl ${
                message.role === "user"
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-foreground border border-border"
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-2 p-3 rounded-lg bg-secondary border border-border">
        <input
          type="text"
          placeholder="Ask a question about credit risk..."
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
        />
        <Button size="sm">
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

function ShapDemo() {
  const shapValues = [
    { feature: "Debt-to-Income Ratio", value: 0.34, impact: "positive" },
    { feature: "Payment History", value: 0.28, impact: "negative" },
    { feature: "Credit Utilization", value: 0.19, impact: "positive" },
    { feature: "Employment Length", value: -0.15, impact: "negative" },
    { feature: "Loan Amount", value: 0.12, impact: "positive" },
    { feature: "Account Age", value: -0.08, impact: "negative" },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="p-4 rounded-lg bg-secondary border border-border mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Customer ID: 12847</p>
            <p className="text-lg font-semibold text-foreground">Acme Corporation</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Predicted PD</p>
            <p className="text-2xl font-bold text-destructive">0.78</p>
          </div>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full w-[78%] bg-destructive rounded-full" />
        </div>
      </div>

      <h4 className="text-sm font-medium text-foreground mb-4">Feature Importance (SHAP Values)</h4>
      <div className="space-y-3">
        {shapValues.map((item) => (
          <div key={item.feature} className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground w-40 truncate">{item.feature}</span>
            <div className="flex-1 flex items-center gap-2">
              <div className="flex-1 h-6 relative bg-muted rounded overflow-hidden">
                <div
                  className={`absolute top-0 bottom-0 ${item.impact === "positive" ? "bg-destructive/70 left-1/2" : "bg-chart-3/70 right-1/2"}`}
                  style={{ width: `${Math.abs(item.value) * 100}%` }}
                />
              </div>
              <span className={`text-sm font-medium w-12 text-right ${item.impact === "positive" ? "text-destructive" : "text-chart-3"}`}>
                {item.value > 0 ? "+" : ""}{item.value.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-4">
        Red bars indicate features increasing risk, green bars indicate features decreasing risk.
      </p>
    </div>
  );
}
