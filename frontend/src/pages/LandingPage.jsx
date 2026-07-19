import Navbar from "../components/layout/Navbar";
import Hero from "../components/landing/Hero";
import DashboardPreview from "../components/landing/DashboardPreview";
import FeaturesSection from "../components/landing/FeaturesSection";
import DemoSection from "../components/landing/demo/DemoSection";
import IntegrationsSection from "../components/landing/integrations/IntegrationsSection";
import PricingSection from "../components/landing/pricing/PricingSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <Hero />
      <DashboardPreview />
      <FeaturesSection />
      <DemoSection />
      <IntegrationsSection />
      <PricingSection />
    </div>
  );
}
