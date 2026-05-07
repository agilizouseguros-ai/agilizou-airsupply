import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, Loader2, ShieldCheck, BellRing } from "lucide-react";

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  whatsapp: z.string().trim().min(14, "WhatsApp inválido").max(20),
  tipoSeguro: z.string().min(1, "Selecione um tipo"),
  seguradoraAtual: z.string().trim().min(2, "Informe a seguradora").max(100),
  vencimento: z.string().min(1, "Informe o vencimento"),
});

const products = [
  "Seguro Auto e Moto", "Seguro Vida", "Seguro Residencial", "Previdência",
  "Consórcio", "Seguro Viagem", "Equipamentos", "Seguro Fiança", "Plano PET", "Outro",
];

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function RenewalSection() {
  const [form, setForm] = useState({
    nome: "", email: "", whatsapp: "",
    tipoSeguro: "", seguradoraAtual: "", vencimento: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: k === "whatsapp" ? maskPhone(v) : v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      const endpoint = import.meta.env.VITE_FORM_ENDPOINT;
      if (!endpoint) throw new Error("Endpoint não configurado");
      const payload = {
        ...form,
        origem: "airsupply",
        formType: "renovacao",
      };
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Erro ${res.status}`);
      setDone(true);
    } catch (err) {
      console.error("Falha ao enviar lead de renovação:", err);
      setErrors((e) => ({ ...e, nome: "Não foi possível enviar agora. Tente novamente em instantes." }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="renovacao" className="py-20 lg:py-28 bg-background">
      <div className="container-page">
        <div className="relative mx-auto max-w-5xl rounded-[2rem] overflow-hidden border border-border bg-gradient-to-br from-brand-navy/[0.03] via-card to-brand-orange/[0.04] shadow-card">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-orange" />
          <div className="grid lg:grid-cols-2 gap-10 p-8 sm:p-12 lg:p-14">
            {/* Lado esquerdo */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 self-start rounded-full bg-brand-navy/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-navy">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-orange" />
                Acompanhamento de renovação
              </div>
              <h2 className="mt-5 font-display text-3xl sm:text-[2.1rem] font-bold text-brand-navy leading-tight">
                Quer mais tranquilidade na próxima renovação?
                <span className="block text-brand-orange mt-2">A Agilizou pode acompanhar isso para você.</span>
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Se o seu seguro vence nos próximos meses, podemos programar um contato no momento ideal
                para apresentar novas opções e condições exclusivas para colaboradores AirSupply.
              </p>
              <div className="mt-8 flex items-start gap-3 rounded-2xl bg-card border border-border p-5">
                <div className="h-10 w-10 rounded-xl bg-brand-orange/10 flex items-center justify-center shrink-0">
                  <BellRing className="h-5 w-5 text-brand-orange" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Você só recebe um contato consultivo no momento certo, próximo ao vencimento.
                  </p>
                </div>
              </div>
            </div>

            {/* Formulário */}
            {done ? (
              <div className="rounded-3xl bg-card border border-border p-10 text-center flex flex-col items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-whatsapp/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-9 w-9 text-whatsapp" />
                </div>
                <h3 className="font-display text-2xl font-bold text-brand-navy">Tudo certo!</h3>
                <p className="mt-3 text-muted-foreground">
                  Vamos acompanhar o vencimento do seu seguro e entrar em contato no momento ideal.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="rounded-3xl bg-card border border-border p-6 sm:p-8 space-y-4">
                <Field label="Nome completo" error={errors.nome}>
                  <input type="text" value={form.nome} onChange={(e) => update("nome", e.target.value)} className="r-input" placeholder="Seu nome" />
                </Field>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="E-mail" error={errors.email}>
                    <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="r-input" placeholder="voce@email.com" />
                  </Field>
                  <Field label="WhatsApp" error={errors.whatsapp}>
                    <input type="tel" value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} className="r-input" placeholder="(11) 99999-9999" />
                  </Field>
                </div>
                <Field label="Tipo de seguro" error={errors.tipoSeguro}>
                  <select className="r-input" value={form.tipoSeguro} onChange={(e) => update("tipoSeguro", e.target.value)}>
                    <option value="">Selecione...</option>
                    {products.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </Field>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Seguradora atual" error={errors.seguradoraAtual}>
                    <input type="text" value={form.seguradoraAtual} onChange={(e) => update("seguradoraAtual", e.target.value)} className="r-input" placeholder="Ex: Porto, Bradesco..." />
                  </Field>
                  <Field label="Vencimento da apólice" error={errors.vencimento}>
                    <input type="date" value={form.vencimento} onChange={(e) => update("vencimento", e.target.value)} className="r-input" />
                  </Field>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand-navy hover:bg-brand-navy/90 px-7 py-4 text-sm font-semibold text-white transition-all disabled:opacity-70"
                >
                  {loading ? (<><Loader2 className="h-4 w-4 animate-spin" /> Enviando...</>) : (<><BellRing className="h-4 w-4" /> Quero ser lembrado na renovação</>)}
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  Seus dados serão usados apenas para acompanhamento da renovação.
                </p>

                <style>{`
                  .r-input {
                    width: 100%;
                    border-radius: 0.875rem;
                    border: 1px solid var(--color-border);
                    background: var(--color-background);
                    padding: 0.8rem 1rem;
                    font-size: 0.95rem;
                    color: var(--color-foreground);
                    outline: none;
                    transition: all 0.2s;
                  }
                  .r-input:focus {
                    border-color: var(--brand-orange);
                    box-shadow: 0 0 0 4px color-mix(in oklab, var(--brand-orange) 18%, transparent);
                  }
                `}</style>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-brand-navy mb-1.5">{label}</span>
      {children}
      {error && <span className="block text-xs text-destructive mt-1">{error}</span>}
    </label>
  );
}
