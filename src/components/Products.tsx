import { Bike, Briefcase, Car, Heart, Home, Key, PawPrint, Plane, PiggyBank, ShieldCheck } from "lucide-react";
import { whatsappLink } from "./WhatsAppFloat";

const products = [
  { icon: Car, title: "Seguro Auto e Moto", text: "Assistência 24h, proteção personalizada e comparação entre seguradoras." },
  { icon: Heart, title: "Seguro Vida", text: "Proteção familiar e tranquilidade financeira com contratação simples." },
  { icon: Home, title: "Seguro Residencial", text: "Proteção contra imprevistos e assistência residencial completa." },
  { icon: PiggyBank, title: "Previdência", text: "Planejamento de longo prazo e construção de patrimônio." },
  { icon: Briefcase, title: "Consórcio", text: "Planejamento financeiro inteligente para conquistas programadas." },
  { icon: Plane, title: "Seguro Viagem", text: "Cobertura nacional e internacional com assistência emergencial." },
  { icon: Bike, title: "Equipamentos", text: "Celular, notebook, games e bike — protegidos onde você for." },
  { icon: Key, title: "Seguro Fiança", text: "Mais praticidade para alugar seu imóvel sem fiador." },
  { icon: PawPrint, title: "Plano PET", text: "Cuidado completo para os pets da sua família." },
];

export function Products() {
  return (
    <section id="produtos" className="py-20 lg:py-28">
      <div className="container-page">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">Produtos disponíveis</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-brand-navy">
            Soluções de proteção para cada momento da sua vida
          </h2>
          <p className="mt-4 text-muted-foreground">
            Escolha o que faz sentido para você. Nossa consultoria te ajuda no resto.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.title}
              className="group relative rounded-3xl bg-card border border-border p-7 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-sky/5 group-hover:bg-brand-sky/15 transition-colors" />
              <div className="relative">
                <div className="h-14 w-14 rounded-2xl bg-gradient-navy flex items-center justify-center shadow-soft mb-5">
                  <p.icon className="h-7 w-7 text-white" strokeWidth={1.8} />
                </div>
                <h3 className="font-display text-xl font-semibold text-brand-navy">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                <a
                  href={whatsappLink(`Olá, sou colaborador AIRSUPPLY e quero atendimento sobre ${p.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-orange hover:gap-3 transition-all"
                >
                  Solicitar atendimento
                  <ShieldCheck className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
