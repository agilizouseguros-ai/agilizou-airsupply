import { MessageCircle } from "lucide-react";

const PHONE = "551129494838";
const MSG = encodeURIComponent(
  "Olá, quero conhecer os benefícios exclusivos da parceria AIRSUPPLY + Agilizou Seguros."
);

export function whatsappLink(custom?: string) {
  const m = custom ? encodeURIComponent(custom) : MSG;
  return `https://wa.me/${PHONE}?text=${m}`;
}

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-white shadow-card animate-pulse-glow hover:scale-105 transition-transform"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={2.4} />
      <span className="hidden sm:inline font-semibold text-sm pr-1">WhatsApp</span>
    </a>
  );
}
