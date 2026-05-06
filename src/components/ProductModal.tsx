import { useEffect } from "react";
import { ArrowRight, MessageCircle, Sparkles, X, type LucideIcon } from "lucide-react";
import { whatsappLink } from "./WhatsAppFloat";

export type ProductDetail = {
  id: string;
  title: string;
  icon: LucideIcon;
  tagline: string;
  what: string;
  daily: string[];
  diferenciais: string[];
  benefit: string;
  ideal: string[];
  accent?: "orange" | "sky";
};

export function selectProductAndScroll(productId: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("agilizou:select-product", { detail: productId }));
  // Defer scroll so the form has time to update
  requestAnimationFrame(() => {
    const el = document.getElementById("formulario");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

export function ProductModal({
  product,
  open,
  onClose,
}: {
  product: ProductDetail | null;
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || !product) return null;
  const Icon = product.icon;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 bg-brand-navy/55 backdrop-blur-sm"
      />
      <div className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-card border border-border shadow-card animate-modal-up">
        {/* header */}
        <div className="relative px-6 sm:px-8 pt-7 pb-6 bg-gradient-navy text-white rounded-t-3xl overflow-hidden">
          <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-brand-orange/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-brand-sky/30 blur-3xl" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar modal"
            className="absolute top-4 right-4 h-9 w-9 rounded-full glass-dark flex items-center justify-center hover:bg-white/15 transition"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="relative flex items-start gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-orange shadow-glow-orange flex items-center justify-center shrink-0">
              <Icon className="h-7 w-7 text-white" strokeWidth={1.8} />
            </div>
            <div>
              <div className="text-[0.7rem] uppercase tracking-[0.2em] text-brand-sky font-semibold">
                Benefício colaborador AirSupply
              </div>
              <h3 id="product-modal-title" className="mt-1 font-display text-2xl sm:text-[1.7rem] font-bold leading-tight">
                {product.title}
              </h3>
              <p className="mt-1.5 text-sm text-white/80">{product.tagline}</p>
            </div>
          </div>
        </div>

        {/* body */}
        <div className="px-6 sm:px-8 py-7 space-y-7">
          <Section label="O que é?">
            <p>{product.what}</p>
          </Section>

          <Section label="Como ajuda no seu dia a dia">
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {product.daily.map((d) => (
                <li key={d} className="flex gap-2 text-sm text-foreground/85">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-orange shrink-0" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section label="Diferenciais Agilizou">
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {product.diferenciais.map((d) => (
                <li key={d} className="flex gap-2 text-sm text-foreground/85">
                  <Sparkles className="h-4 w-4 text-brand-sky shrink-0 mt-0.5" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </Section>

          <div className="rounded-2xl border border-brand-orange/25 bg-gradient-to-br from-brand-orange/8 to-transparent p-5">
            <div className="text-[0.7rem] uppercase tracking-[0.2em] text-brand-orange font-semibold">
              Para colaboradores AirSupply
            </div>
            <p className="mt-1.5 text-sm text-brand-navy/90 leading-relaxed">{product.benefit}</p>
          </div>

          <Section label="Ideal para quem">
            <div className="flex flex-wrap gap-2">
              {product.ideal.map((i) => (
                <span
                  key={i}
                  className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-brand-navy border border-border"
                >
                  {i}
                </span>
              ))}
            </div>
          </Section>
        </div>

        {/* footer CTAs */}
        <div className="sticky bottom-0 bg-card/95 backdrop-blur border-t border-border px-6 sm:px-8 py-4 flex flex-col-reverse sm:flex-row gap-3 sm:items-center sm:justify-end rounded-b-3xl">
          <a
            href={whatsappLink(`Olá, sou colaborador AirSupply e quero atendimento sobre ${product.title}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-brand-navy hover:bg-muted transition"
          >
            <MessageCircle className="h-4 w-4 text-whatsapp" />
            Falar via WhatsApp
          </a>
          <button
            type="button"
            onClick={() => {
              onClose();
              selectProductAndScroll(product.id);
            }}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-orange px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow-orange hover:scale-[1.02] transition"
          >
            Solicitar atendimento
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[0.72rem] uppercase tracking-[0.18em] text-brand-orange font-bold mb-2">{label}</div>
      <div className="text-sm text-foreground/85 leading-relaxed">{children}</div>
    </div>
  );
}
