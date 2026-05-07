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
      objetivo = "",
      melhorHorario = "", // legado
      seguradoraAtual = "",
      vencimento = "",
      observacoes = "",
      origem = "airsupply",
      formType = "cotacao", // "cotacao" | "renovacao"
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
    if (formType === "renovacao") {
      if (!seguradoraAtual || seguradoraAtual.length > 100)
        return res.status(400).json({ error: "Seguradora atual inválida" });
      if (!vencimento || vencimento.length > 20)
        return res.status(400).json({ error: "Vencimento inválido" });
    }

    const isRenovacao = formType === "renovacao";
    const tagOrigem = isRenovacao
      ? `[ACOMPANHAMENTO DE RENOVAÇÃO] ${escape(origem).toUpperCase()}`
      : `Novo lead — ${escape(origem).toUpperCase()}`;

    // 1) E-mail interno (CRM)
    const linhasExtras = isRenovacao
      ? `
          <tr><td style="background:#f5f7fb"><b>Seguradora atual</b></td><td>${escape(seguradoraAtual)}</td></tr>
          <tr><td style="background:#f5f7fb"><b>Vencimento</b></td><td>${escape(vencimento)}</td></tr>`
      : `
          <tr><td style="background:#f5f7fb"><b>O que procura</b></td><td>${escape(objetivo) || "—"}</td></tr>
          ${melhorHorario ? `<tr><td style="background:#f5f7fb"><b>Melhor horário</b></td><td>${escape(melhorHorario)}</td></tr>` : ""}
          <tr><td style="background:#f5f7fb;vertical-align:top"><b>Observações</b></td><td>${escape(observacoes) || "—"}</td></tr>`;

    const crmHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#0f1b3d">
        <h2 style="color:#0f1b3d;margin:0 0 16px">${isRenovacao ? "🔔 " : "🔔 "}${tagOrigem}</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%;font-size:14px">
          <tr><td style="background:#f5f7fb;width:160px"><b>Nome</b></td><td>${escape(nome)}</td></tr>
          <tr><td style="background:#f5f7fb"><b>E-mail</b></td><td><a href="mailto:${escape(email)}">${escape(email)}</a></td></tr>
          <tr><td style="background:#f5f7fb"><b>WhatsApp</b></td><td>${escape(whatsapp)}</td></tr>
          <tr><td style="background:#f5f7fb"><b>Tipo de seguro</b></td><td>${escape(tipoSeguro)}</td></tr>
          ${linhasExtras}
          <tr><td style="background:#f5f7fb"><b>Origem</b></td><td>${escape(origem)}</td></tr>
        </table>
        <p style="margin-top:20px;font-size:12px;color:#666">Enviado automaticamente pelo formulário da landing page AirSupply.</p>
      </div>`;

    const crmSubject = isRenovacao
      ? `[ACOMPANHAMENTO RENOVAÇÃO] AirSupply — ${nome} (${tipoSeguro})`
      : `Novo lead AirSupply — ${nome} (${tipoSeguro})`;

    await resend.emails.send({
      from: FROM_EMAIL,
      to: LEAD_TO_EMAIL,
      replyTo: email,
      subject: crmSubject,
      html: crmHtml,
    });

    // 2) E-mail de agradecimento ao colaborador
    const thanksHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>Recebemos sua solicitação — Agilizou Seguros</title>
</head>
<body style="margin:0;padding:0;background-color:#F8FAFC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1E293B;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    Recebemos sua solicitação, ${escape(nome)}. Um especialista da Agilizou entrará em contato em breve.
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F8FAFC;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(11,27,83,0.08);">

          <!-- Header -->
          <tr>
            <td align="center" style="background-color:#0B1B53;background-image:linear-gradient(135deg,#0B1B53 0%,#152a7a 100%);padding:40px 24px;">
              <img src="https://airsupply.agilizouseguros.com.br/assets/agilizou-logo-white-CgEWCLAN.png" alt="Agilizou Seguros" width="180" style="display:block;height:auto;max-width:180px;border:0;outline:none;text-decoration:none;" />
            </td>
          </tr>

          <!-- Título -->
          <tr>
            <td style="padding:40px 40px 8px 40px;">
              <h1 style="margin:0;font-size:26px;line-height:1.3;color:#0B1B53;font-weight:700;letter-spacing:-0.3px;">
                Recebemos sua solicitação!
              </h1>
            </td>
          </tr>

          <!-- Texto -->
          <tr>
            <td style="padding:16px 40px 8px 40px;">
              <p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;color:#1E293B;">
                Olá <strong>${escape(nome)}</strong>,
              </p>
              <p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;color:#1E293B;">
                Obrigado por entrar em contato com a <strong>Agilizou Seguros</strong>.
              </p>
              <p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;color:#475569;">
                Recebemos sua solicitação sobre <strong style="color:#0B1B53;">${escape(tipoSeguro)}</strong> e um especialista entrará em contato no horário preferencial <strong style="color:#0B1B53;">${escape(melhorHorario)}</strong>.
              </p>
            </td>
          </tr>

          <!-- Card benefícios -->
          <tr>
            <td style="padding:16px 40px 8px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <p style="margin:0 0 16px 0;font-size:13px;font-weight:700;letter-spacing:1px;color:#FF6B00;text-transform:uppercase;">
                      O que você pode esperar
                    </p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr><td style="padding:6px 0;font-size:15px;color:#1E293B;line-height:1.5;"><span style="color:#FF6B00;font-weight:700;">✔</span> &nbsp;Atendimento consultivo</td></tr>
                      <tr><td style="padding:6px 0;font-size:15px;color:#1E293B;line-height:1.5;"><span style="color:#FF6B00;font-weight:700;">✔</span> &nbsp;Condições exclusivas</td></tr>
                      <tr><td style="padding:6px 0;font-size:15px;color:#1E293B;line-height:1.5;"><span style="color:#FF6B00;font-weight:700;">✔</span> &nbsp;Atendimento humanizado</td></tr>
                      <tr><td style="padding:6px 0;font-size:15px;color:#1E293B;line-height:1.5;"><span style="color:#FF6B00;font-weight:700;">✔</span> &nbsp;Cobertura para toda a família</td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Botão WhatsApp -->
          <tr>
            <td align="center" style="padding:32px 40px 16px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="background-color:#25D366;border-radius:999px;">
                    <a href="https://wa.me/551129494838" target="_blank" style="display:inline-block;padding:16px 36px;font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                      💬&nbsp;&nbsp;Falar agora no WhatsApp
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:14px 0 0 0;font-size:13px;color:#64748B;">
                Atendimento rápido e direto com nosso time.
              </p>
            </td>
          </tr>

          <!-- Bloco AirSupply -->
          <tr>
            <td style="padding:24px 40px 8px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0B1B53;border-radius:12px;">
                <tr>
                  <td style="padding:22px 26px;">
                    <p style="margin:0 0 4px 0;font-size:11px;font-weight:700;letter-spacing:2px;color:#FF6B00;text-transform:uppercase;">
                      ★ Exclusivo
                    </p>
                    <p style="margin:0;font-size:16px;line-height:1.5;color:#ffffff;font-weight:600;">
                      Benefício exclusivo para colaboradores AirSupply
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:32px 40px 0 40px;">
              <div style="border-top:1px solid #E2E8F0;"></div>
            </td>
          </tr>

          <!-- Rodapé -->
          <tr>
            <td align="center" style="padding:24px 40px 40px 40px;">
              <p style="margin:0 0 6px 0;font-size:14px;font-weight:700;color:#0B1B53;">
                Agilizou Seguros
              </p>
              <p style="margin:0 0 4px 0;font-size:13px;color:#64748B;line-height:1.6;">
                <a href="mailto:contato@agilizouseguros.com.br" style="color:#64748B;text-decoration:none;">contato@agilizouseguros.com.br</a>
              </p>
              <p style="margin:0;font-size:13px;color:#64748B;line-height:1.6;">
                (11) 2949-4838
              </p>
              <p style="margin:18px 0 0 0;font-size:11px;color:#94A3B8;line-height:1.5;">
                Você recebeu este e-mail porque preencheu nosso formulário em airsupply.agilizouseguros.com.br
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

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
