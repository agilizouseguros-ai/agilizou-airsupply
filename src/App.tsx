import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Partnership } from "@/components/Partnership";
import { Benefits } from "@/components/Benefits";
import { Products } from "@/components/Products";
import { HowItWorks } from "@/components/HowItWorks";
import { FormSection } from "@/components/FormSection";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Partnership />
        <Benefits />
        <Products />
        <HowItWorks />
        <FormSection />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
