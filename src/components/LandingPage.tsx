import { Header } from "./landing/Header";
import { HeroSection } from "./landing/HeroSection";
import { FeaturesSection } from "./landing/FeaturesSection";
import { PricingSection } from "./landing/PricingSection";
import { TestimonialsSection } from "./landing/TestimonialsSection";
import { Footer } from "./landing/Footer";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}