import { Facebook, Globe, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { AgilizouLogo, AirsupplyLogo } from "./Logos";

export function Footer() {
  return (
    <footer className="bg-gradient-navy text-white pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-brand-orange/30 blur-3xl" />
      </div>
      <div className="container-page relative">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="bg-white rounded-2xl p-3 inline-block">
              <AgilizouLogo />
            </div>
            <p className="mt-4 text-white/70 text-sm leading-relaxed max-w-xs">
              Consultoria especializada em seguros, proteção e planejamento — com atendimento humano e digital.
            </p>
            <div className="mt-5 flex gap-3">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="h-10 w-10 rounded-full glass-dark flex items-center justify-center hover:bg-brand-orange/30 transition-colors" aria-label="Rede social">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-brand-sky" /><span>(11) 2949-4838</span></li>
              <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-brand-sky" /><span>contato@agilizouseguros.com.br</span></li>
              <li className="flex items-center gap-3"><Globe className="h-4 w-4 text-brand-sky" /><span>agilizouseguros.com.br</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Parceria oficial</h4>
            <div className="rounded-2xl glass-dark p-4">
              <AirsupplyLogo variant="light" />
              <p className="mt-3 text-xs text-white/70 leading-relaxed">
                Programa de benefícios exclusivos para colaboradores da AIRSUPPLY Transporte e Logística.
              </p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-brand-orange/20 border border-brand-orange/40 px-3 py-1 text-[0.65rem] uppercase tracking-wider text-white font-semibold">
                Selo de parceria oficial
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-white/60">
          <span>© {new Date().getFullYear()} Agilizou Seguros — Todos os direitos reservados.</span>
          <span>Feito com 🧡 para colaboradores AIRSUPPLY</span>
        </div>
      </div>
    </footer>
  );
}
