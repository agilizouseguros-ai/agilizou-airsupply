import { useEffect, useState } from "react";
import { z } from "zod";
import { CheckCircle2, Loader2, MessageCircle, Send } from "lucide-react";

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  whatsapp: z.string().trim().min(14, "WhatsApp inválido").max(20),
  email: z.string().trim().email("E-mail inválido").max(255),
  produto: z.string().min(1, "Selecione um produto"),
  horario: z.string().min(1, "Selecione um horário"),
  observacoes: z.string().max(500).optional(),
});

const products = [
  "Seguro Auto e Moto", "Seguro Vida", "Seguro Residencial", "Previdência",
  "Consórcio", "Seguro Viagem", "Equipamentos", "Seguro Fiança", "Plano PET", "Outro",
];

const horarios = ["Manhã (8h–12h)", "Tarde (12h–18h)", "Noite (18h–21h)", "Qualquer horário"];

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function LeadForm() {
  const [form, setForm] = useState({ nome: "", whatsapp: "", email: "", produto: "", horario: "", observacoes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: k === "whatsapp" ? maskPhone(v) : v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  useEffect(() => {
    const onPick = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (!id) return;
      const match = products.find((p) => p === id) ?? "Outro";
      setForm((f) => ({ ...f, produto: match }));
      setErrors((e2) => ({ ...e2, produto: "" }));
    };
    window.addEventListener("agilizou:select-product", onPick as EventListener);
    return () => window.removeEventListener("agilizou:select-product", onPick as EventListener);
  }, []);

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
      if (!endpoint) {
        console.error("VITE_FORM_ENDPOINT não configurado");
        throw new Error("Endpoint não configurado");
      }
      const payload = {
        nome: form.nome,
        email: form.email,
        whatsapp: form.whatsapp,
        tipoSeguro: form.produto,
        melhorHorario: form.horario,
        observacoes: form.observacoes ?? "",
        origem: "airsupply",
      };
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Erro ${res.status}`);
      setDone(true);
    } catch (err) {
      console.error("Falha ao enviar lead:", err);
      setErrors((e) => ({ ...e, nome: "Não foi possível enviar agora. Tente novamente em instantes." }));
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-3xl bg-card border border-border shadow-card p-10 text-center animate-fade-up">
        <div className="mx-auto h-16 w-16 rounded-full bg-whatsapp/10 flex items-center justify-center mb-4">
          <CheckCircle2 className="h-9 w-9 text-whatsapp" />
        </div>
        <h3 className="font-display text-2xl font-bold text-brand-navy">Recebemos sua solicitação!</h3>
        <p className="mt-2 text-muted-foreground">
          Em breve um especialista da Agilizou entrará em contato.
        </p>
        <a
          href={`https://wa.me/551129494838?text=${encodeURIComponent(
            `Olá! Acabei de preencher o formulário no site (colaborador AIRSUPPLY). Meu nome é ${form.nome} e tenho interesse em ${form.produto || "uma cotação"}.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-white shadow-lg hover:scale-[1.02] transition-all"
        >
          <MessageCircle className="h-4 w-4" />
          Falar agora com um especialista
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl bg-card border border-border shadow-card p-6 sm:p-10 space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Nome completo" error={errors.nome}>
          <input
            type="text"
            value={form.nome}
            onChange={(e) => update("nome", e.target.value)}
            className="input"
            placeholder="Seu nome"
          />
        </Field>
        <Field label="WhatsApp" error={errors.whatsapp}>
          <input
            type="tel"
            value={form.whatsapp}
            onChange={(e) => update("whatsapp", e.target.value)}
            className="input"
            placeholder="(11) 99999-9999"
          />
        </Field>
      </div>

      <Field label="E-mail" error={errors.email}>
        <input
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className="input"
          placeholder="voce@email.com"
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Tipo de seguro" error={errors.produto}>
          <select className="input" value={form.produto} onChange={(e) => update("produto", e.target.value)}>
            <option value="">Selecione...</option>
            {products.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </Field>
        <Field label="Melhor horário" error={errors.horario}>
          <select className="input" value={form.horario} onChange={(e) => update("horario", e.target.value)}>
            <option value="">Selecione...</option>
            {horarios.map((h) => <option key={h} value={h}>{h}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Observações (opcional)" error={errors.observacoes}>
        <textarea
          rows={3}
          value={form.observacoes}
          onChange={(e) => update("observacoes", e.target.value)}
          className="input resize-none"
          placeholder="Conte um pouco mais sobre o que você precisa..."
        />
      </Field>

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-orange px-7 py-4 text-sm font-semibold text-primary-foreground shadow-glow-orange hover:scale-[1.01] transition-all disabled:opacity-70"
      >
        {loading ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Enviando...</>
        ) : (
          <>Solicitar minha cotação <Send className="h-4 w-4" /></>
        )}
      </button>

      <p className="text-xs text-muted-foreground text-center">
        Ao enviar, você concorda em ser contatado por um especialista da Agilizou Seguros.
      </p>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.875rem;
          border: 1px solid var(--color-border);
          background: var(--color-background);
          padding: 0.85rem 1rem;
          font-size: 0.95rem;
          color: var(--color-foreground);
          outline: none;
          transition: all 0.2s;
        }
        .input:focus {
          border-color: var(--brand-orange);
          box-shadow: 0 0 0 4px color-mix(in oklab, var(--brand-orange) 18%, transparent);
        }
      `}</style>
    </form>
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
