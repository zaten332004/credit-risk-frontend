import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { ProblemSolutionSection } from "@/components/problem-solution-section";
import { ArchitectureSection } from "@/components/architecture-section";
import { FeaturesSection } from "@/components/features-section";
import { TechnologySection } from "@/components/technology-section";
import { DemoSection } from "@/components/demo-section";
import { UseCasesSection } from "@/components/use-cases-section";
import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ProblemSolutionSection />
      <ArchitectureSection />
      <FeaturesSection />
      <TechnologySection />
      <DemoSection />
      <UseCasesSection />
      <AboutSection />
      <Footer />
    </main>
  );
}
