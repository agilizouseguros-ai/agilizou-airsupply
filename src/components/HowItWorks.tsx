import { ClipboardList, FileCheck, MessagesSquare, MousePointerClick } from "lucide-react";

const steps = [
  { icon: MousePointerClick, title: "Escolha o benefício", text: "Veja os produtos e selecione o que precisa." },
  { icon: ClipboardList, title: "Solicite atendimento", text: "Preencha o formulário ou fale via WhatsApp." },
  { icon: MessagesSquare, title: "Consultoria personalizada", text: "Um especialista entende seu perfil e necessidades." },
  { icon: FileCheck, title: "Receba sua cotação", text: "Análise comparativa com as melhores condições." },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 lg:py-28 bg-gradient-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-brand-sky/40 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-brand-orange/30 blur-3xl" />
      </div>

      <div className="container-page relative">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-sky">Como funciona</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold">
            Em 4 passos simples você está protegido
          </h2>
          <p className="mt-4 text-white/70">Sem burocracia. Sem letras miúdas. Sem complicação.</p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="hidden lg:block absolute top-9 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-brand-sky/40 to-transparent" />
          {steps.map((s, i) => (
            <div key={s.title} className="glass-dark rounded-2xl p-6 relative">
              <div className="absolute -top-4 left-6 h-8 w-8 rounded-full bg-gradient-orange flex items-center justify-center text-xs font-bold text-white shadow-glow-orange">
                {i + 1}
              </div>
              <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 mt-2">
                <s.icon className="h-6 w-6 text-brand-sky" />
              </div>
              <h3 className="font-display font-semibold text-lg">{s.title}</h3>
              <p className="mt-1.5 text-sm text-white/70 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
