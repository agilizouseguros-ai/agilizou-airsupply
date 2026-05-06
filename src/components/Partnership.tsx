import { Building2, HeartHandshake, Users } from "lucide-react";
import partnership from "@/assets/partnership.jpg";

const items = [
  { icon: Building2, title: "AIRSUPPLY valoriza seu time", text: "A empresa investe em benefícios reais que cuidam de você e da sua família." },
  { icon: HeartHandshake, title: "Agilizou como consultoria", text: "Especialistas que orientam a melhor escolha — sem custo e sem compromisso." },
  { icon: Users, title: "Acesso descomplicado", text: "Atendimento prioritário, digital e humano para colaboradores AIRSUPPLY." },
];

export function Partnership() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-page grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-card">
            <img src={partnership} alt="Parceria Agilizou e AIRSUPPLY" width={1280} height={960} loading="lazy" className="w-full h-auto" />
          </div>
          <div className="absolute -bottom-6 -right-4 glass rounded-2xl p-5 shadow-card max-w-[260px]">
            <div className="text-xs uppercase tracking-wider text-brand-orange font-semibold">Parceria oficial</div>
            <div className="font-display font-bold text-brand-navy mt-1">Benefício criado para colaboradores AIRSUPPLY</div>
          </div>
        </div>

        <div>
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">A parceria</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-brand-navy leading-tight">
            Uma união pensada para proteger quem move a AIRSUPPLY.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            A Agilizou Seguros é a corretora parceira da AIRSUPPLY Transporte e Logística.
            Juntas, oferecemos um portal de benefícios com condições exclusivas, atendimento
            consultivo e suporte humano — para você cuidar do que importa de verdade.
          </p>

          <div className="mt-8 grid gap-4">
            {items.map((it) => (
              <div key={it.title} className="group flex gap-4 rounded-2xl border border-border bg-card p-4 hover:shadow-card hover:border-brand-sky/40 transition-all">
                <div className="h-11 w-11 shrink-0 rounded-xl bg-gradient-sky flex items-center justify-center shadow-glow-sky">
                  <it.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-brand-navy">{it.title}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{it.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
