import { createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Benefícios exclusivos AIRSUPPLY + Agilizou Seguros" },
      { name: "description", content: "Acesso facilitado a seguros, proteção familiar e atendimento consultivo especializado com condições diferenciadas para colaboradores AIRSUPPLY." },
      { property: "og:title", content: "Benefícios exclusivos AIRSUPPLY + Agilizou Seguros" },
      { property: "og:description", content: "Seguros, proteção e consultoria com condições exclusivas para colaboradores AIRSUPPLY." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap" },
    ],
  }),
  component: Index,
});

function Index() {
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
