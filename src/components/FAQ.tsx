import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  { q: "Como funciona o benefício?", a: "Como colaborador AirSupply, você acessa condições exclusivas em todos os produtos da Agilizou — basta solicitar atendimento pelo formulário ou WhatsApp." },
  { q: "Posso incluir familiares?", a: "Sim. Os benefícios são extensivos a cônjuge, filhos e dependentes diretos." },
  { q: "O atendimento é personalizado?", a: "Totalmente. Um consultor dedicado entende seu perfil e indica as melhores opções." },
  { q: "Como recebo minha cotação?", a: "Após o contato com seu consultor, você recebe a cotação por WhatsApp ou e-mail, no horário escolhido." },
  { q: "Quais seguros estão disponíveis?", a: "Auto, Moto, Vida, Residencial, Previdência, Consórcio, Viagem, Equipamentos, Fiança e Plano PET." },
  { q: "Existe suporte via WhatsApp?", a: "Sim. Nosso WhatsApp (11) 2949-4838 está disponível para tirar dúvidas e iniciar atendimentos." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 lg:py-28">
      <div className="container-page max-w-3xl">
        <div className="text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">Perguntas frequentes</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-brand-navy">
            Tudo que você precisa saber
          </h2>
        </div>
        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`rounded-2xl border bg-card transition-all ${isOpen ? "border-brand-orange/40 shadow-soft" : "border-border"}`}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-display font-semibold text-brand-navy">{f.q}</span>
                  <span className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center transition-all ${isOpen ? "bg-gradient-orange text-white rotate-45" : "bg-muted text-brand-navy"}`}>
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-muted-foreground leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
