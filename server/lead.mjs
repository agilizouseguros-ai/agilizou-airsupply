// Endpoint backend mínimo para receber o formulário da landing page
// e disparar 2 e-mails via Resend:
//   1) Notificação interna para o CRM (LEAD_TO_EMAIL)
//   2) E-mail de agradecimento para o colaborador
//
// Como rodar (ex: aaPanel + PM2):
//   cd server
//   npm install
//   cp .env.example .env   # preencher RESEND_API_KEY, LEAD_TO_EMAIL, etc.
//   pm2 start lead.mjs --name agilizou-lead
//
// Nginx (proxy):
//   location /api/lead {
//     proxy_pass http://127.0.0.1:3001/lead;
//     proxy_set_header Host $host;
//     proxy_set_header X-Real-IP $remote_addr;
//   }
//
// Frontend deve definir:
//   VITE_FORM_ENDPOINT=https://seudominio.com.br/api/lead

import express from "express";
import cors from "cors";
import { Resend } from "resend";
import "dotenv/config";

const {
  RESEND_API_KEY,
  LEAD_TO_EMAIL = "contato@agilizouseguros.com.br",
  FROM_EMAIL = "Agilizou Seguros <contato@agilizouseguros.com.br>",
  ALLOWED_ORIGIN = "*",
  PORT = 3001,
} = process.env;

if (!RESEND_API_KEY) {
  console.error("ERRO: defina RESEND_API_KEY no .env");
  process.exit(1);
}

const resend = new Resend(RESEND_API_KEY);
const app = express();
app.use(express.json({ limit: "32kb" }));
app.use(cors({ origin: ALLOWED_ORIGIN }));

// Rate limit simples em memória (por IP)
const hits = new Map();
function rateLimit(ip, max = 5, windowMs = 60_000) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length <= max;
}

const escape = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

app.post("/lead", async (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.ip;
    if (!rateLimit(ip)) return res.status(429).json({ error: "Muitas tentativas, tente novamente em instantes." });

    const {
      nome = "",
      email = "",
      whatsapp = "",
      tipoSeguro = "",
      melhorHorario = "",
      observacoes = "",
      origem = "airsupply",
    } = req.body || {};

    // Validação básica
    if (!nome || nome.length < 2 || nome.length > 100)
      return res.status(400).json({ error: "Nome inválido" });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255)
      return res.status(400).json({ error: "E-mail inválido" });
    if (!whatsapp || whatsapp.length > 20)
      return res.status(400).json({ error: "WhatsApp inválido" });
    if (!tipoSeguro || tipoSeguro.length > 80)
      return res.status(400).json({ error: "Tipo de seguro inválido" });
    if (observacoes && observacoes.length > 500)
      return res.status(400).json({ error: "Observações muito longas" });

    // 1) E-mail interno (CRM)
    const crmHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#0f1b3d">
        <h2 style="color:#0f1b3d;margin:0 0 16px">🔔 Novo lead — ${escape(origem).toUpperCase()}</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%;font-size:14px">
          <tr><td style="background:#f5f7fb;width:160px"><b>Nome</b></td><td>${escape(nome)}</td></tr>
          <tr><td style="background:#f5f7fb"><b>E-mail</b></td><td><a href="mailto:${escape(email)}">${escape(email)}</a></td></tr>
          <tr><td style="background:#f5f7fb"><b>WhatsApp</b></td><td>${escape(whatsapp)}</td></tr>
          <tr><td style="background:#f5f7fb"><b>Tipo de seguro</b></td><td>${escape(tipoSeguro)}</td></tr>
          <tr><td style="background:#f5f7fb"><b>Melhor horário</b></td><td>${escape(melhorHorario)}</td></tr>
          <tr><td style="background:#f5f7fb;vertical-align:top"><b>Observações</b></td><td>${escape(observacoes) || "—"}</td></tr>
          <tr><td style="background:#f5f7fb"><b>Origem</b></td><td>${escape(origem)}</td></tr>
        </table>
        <p style="margin-top:20px;font-size:12px;color:#666">Enviado automaticamente pelo formulário da landing page AIRSUPPLY.</p>
      </div>`;

    await resend.emails.send({
      from: FROM_EMAIL,
      to: LEAD_TO_EMAIL,
      replyTo: email,
      subject: `Novo lead AIRSUPPLY — ${nome} (${tipoSeguro})`,
      html: crmHtml,
    });

    // 2) E-mail de agradecimento ao colaborador
    const thanksHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;color:#0f1b3d">
        <div style="background:linear-gradient(135deg,#0f1b3d,#1e3a5f);padding:32px 24px;text-align:center;border-radius:12px 12px 0 0">
          <h1 style="color:#fff;margin:0;font-size:24px">Recebemos sua solicitação!</h1>
        </div>
        <div style="padding:28px 24px;border:1px solid #eee;border-top:0;border-radius:0 0 12px 12px">
          <p style="font-size:16px;line-height:1.6">Olá <b>${escape(nome)}</b>,</p>
          <p style="font-size:15px;line-height:1.6;color:#444">
            Obrigado por entrar em contato com a <b>Agilizou Seguros</b>!
            Em breve um especialista entrará em contato para falar sobre <b>${escape(tipoSeguro)}</b>
            no horário preferencial: <b>${escape(melhorHorario)}</b>.
          </p>
          <p style="font-size:15px;line-height:1.6;color:#444">
            Como colaborador <b>AIRSUPPLY</b>, você tem acesso a condições e atendimento exclusivos.
          </p>
          <div style="margin:28px 0;text-align:center">
            <a href="https://wa.me/551129494838" style="background:#25D366;color:#fff;text-decoration:none;padding:14px 28px;border-radius:999px;font-weight:bold;display:inline-block">
              💬 Falar agora no WhatsApp
            </a>
          </div>
          <p style="font-size:13px;color:#888;margin-top:24px">
            Se preferir, responda diretamente este e-mail.<br>
            Agilizou Seguros — contato@agilizouseguros.com.br · (11) 2949-4838
          </p>
        </div>
      </div>`;

    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Recebemos sua solicitação — Agilizou Seguros",
      html: thanksHtml,
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error("Erro /lead:", err);
    return res.status(500).json({ error: "Erro ao processar solicitação" });
  }
});

app.get("/health", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`✅ Lead endpoint rodando na porta ${PORT}`);
});
