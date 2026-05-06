import { MessageCircle } from "lucide-react";

const PHONE = "551129494838";
const MSG = encodeURIComponent(
  "Olá, quero conhecer os benefícios exclusivos da parceria AirSupply + Agilizou Seguros."
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
      aria-label="Falar pelo WhatsApp (canal de apoio)"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center justify-center h-12 w-12 rounded-full bg-whatsapp text-white shadow-soft hover:scale-105 hover:shadow-card transition-all"
    >
      <MessageCircle className="h-5 w-5" strokeWidth={2.4} />
    </a>
  );
}
