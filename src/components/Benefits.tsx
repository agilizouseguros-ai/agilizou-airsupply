import { Award, BadgeCheck, Clock, HeartHandshake, MonitorSmartphone, Sparkles, UserCheck, Users } from "lucide-react";

const benefits = [
  { icon: Clock, title: "Atendimento prioritário", text: "Sua solicitação tratada com agilidade exclusiva." },
  { icon: UserCheck, title: "Consultoria personalizada", text: "Especialista dedicado para entender seu perfil." },
  { icon: BadgeCheck, title: "Condições diferenciadas", text: "Vantagens negociadas para colaboradores AirSupply." },
  { icon: HeartHandshake, title: "Atendimento humanizado", text: "Pessoas reais, escuta ativa, sem robôs." },
  { icon: Sparkles, title: "Cotação simplificada", text: "Processo digital, rápido e sem burocracia." },
  { icon: Users, title: "Extensivo à família", text: "Benefícios também para cônjuge, filhos e pais." },
  { icon: MonitorSmartphone, title: "Atendimento digital rápido", text: "WhatsApp, e-mail e portal — você escolhe." },
  { icon: Award, title: "Apoio consultivo especializado", text: "Mais de uma seguradora comparada para você." },
];

export function Benefits() {
  return (
    <section id="beneficios" className="py-20 lg:py-28 bg-muted/40">
      <div className="container-page">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">Benefícios exclusivos</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-brand-navy">
            Tudo o que você ganha sendo um colaborador AirSupply
          </h2>
          <p className="mt-4 text-muted-foreground">
            Vantagens reais para você proteger sua vida, sua família e seu patrimônio com tranquilidade.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className="group relative rounded-2xl bg-card border border-border p-6 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand-orange/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="h-12 w-12 rounded-xl bg-gradient-orange/10 border border-brand-orange/20 flex items-center justify-center mb-4 group-hover:bg-gradient-orange group-hover:border-transparent transition-all">
                <b.icon className="h-6 w-6 text-brand-orange group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-display font-semibold text-brand-navy">{b.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
