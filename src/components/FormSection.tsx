import { LeadForm } from "./LeadForm";
import { CheckCircle2 } from "lucide-react";

const points = [
  "Sem custo, sem compromisso",
  "Atendimento humano e consultivo",
  "Tag exclusiva: colaborador AIRSUPPLY",
];

export function FormSection() {
  return (
    <section id="formulario" className="py-20 lg:py-28 bg-muted/40">
      <div className="container-page grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">Solicite sua cotação</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-brand-navy leading-tight">
            Fale com um especialista da Agilizou
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Preencha o formulário e nossa equipe entra em contato com sua consultoria personalizada.
            Rápido, simples e com as condições exclusivas para colaboradores AIRSUPPLY.
          </p>
          <ul className="mt-8 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-brand-navy">
                <CheckCircle2 className="h-5 w-5 text-brand-orange shrink-0" />
                <span className="font-medium">{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <LeadForm />
      </div>
    </section>
  );
}
