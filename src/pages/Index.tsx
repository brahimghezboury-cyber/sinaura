import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import ProblemStatementSection from "@/components/ProblemStatementSection";
import DifferentiatorSection from "@/components/DifferentiatorSection";
import DesignSection from "@/components/DesignSection";
import FeaturesSection from "@/components/FeaturesSection";
import StatsSection from "@/components/StatsSection";
import TechnologySection from "@/components/TechnologySection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <IntroSection />
        <ProblemStatementSection />
        <DifferentiatorSection />
        <DesignSection />
        <FeaturesSection />
        <StatsSection />
        <TechnologySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
