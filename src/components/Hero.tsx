import { ArrowRight, MessageCircle, ShieldCheck, Sparkles, Heart, BadgeCheck } from "lucide-react";
import heroImg from "@/assets/hero-team.jpg";
import { AgilizouLogo, AirsupplyLogo } from "./Logos";
import { whatsappLink } from "./WhatsAppFloat";

export function Hero() {
  return (
    <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 -z-10 opacity-60">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-sky/30 blur-3xl animate-float" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-orange/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container-page grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 shadow-soft mb-6">
            <Sparkles className="h-4 w-4 text-brand-orange" />
            <span className="text-xs font-semibold text-brand-navy">Benefício corporativo exclusivo</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-brand-navy">
            Benefícios exclusivos em{" "}
            <span className="text-gradient-orange">seguros e proteção</span>{" "}
            para colaboradores <span className="whitespace-nowrap">AIRSUPPLY</span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            Acesso facilitado a seguros, proteção familiar e atendimento consultivo especializado
            com condições diferenciadas para colaboradores.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#beneficios"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-orange px-7 py-4 text-sm font-semibold text-primary-foreground shadow-glow-orange hover:scale-[1.03] transition-all"
            >
              Quero conhecer os benefícios
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass px-7 py-4 text-sm font-semibold text-brand-navy shadow-soft hover:bg-white transition-all"
            >
              <MessageCircle className="h-4 w-4 text-whatsapp" />
              Falar com especialista
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-brand-sky" />
              <span>Apoio consultivo especializado</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-brand-sky" />
              <span>Cotação simplificada</span>
            </div>
          </div>
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: "150ms" }}>
          <div className="mb-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.22)] px-7 py-6">
            <div
              className="inline-flex items-center gap-2 rounded-full bg-brand-navy/5 px-3 py-1 mb-5"
              style={{ fontSize: "10px", letterSpacing: "2.2px", fontWeight: 700, color: "#475569", textTransform: "uppercase" }}
            >
              <BadgeCheck className="h-3.5 w-3.5 text-brand-orange" />
              Parceria corporativa
            </div>

            <div className="flex items-center gap-6">
              <AgilizouLogo width={140} />
              <span className="h-10 w-px bg-border/70" />
              <AirsupplyLogo width={155} />
            </div>

            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
              Benefícios exclusivos em seguros e proteção para colaboradores AIRSUPPLY.
            </p>

            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-medium text-brand-navy">
              <li className="flex items-center gap-1.5">
                <Heart className="h-3.5 w-3.5 text-brand-orange" />
                Atendimento humanizado
              </li>
              <li className="flex items-center gap-1.5">
                <BadgeCheck className="h-3.5 w-3.5 text-brand-orange" />
                Condições diferenciadas
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-orange" />
                Extensivos à família
              </li>
            </ul>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-card">
            <img
              src={heroImg}
              alt="Equipe de colaboradores felizes — benefício corporativo Agilizou + AIRSUPPLY"
              width={1536}
              height={1024}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy/40 via-transparent to-transparent" />
          </div>

          <div className="absolute top-[40%] -right-2 lg:-right-6 glass rounded-2xl p-4 shadow-card hidden sm:block">
            <div className="text-xs text-muted-foreground">Atendimento prioritário</div>
            <div className="font-display font-bold text-2xl text-brand-navy">+8 produtos</div>
            <div className="text-xs text-brand-orange font-semibold">com condições exclusivas</div>
          </div>
        </div>
      </div>
    </section>
  );
}
