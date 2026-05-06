# Endpoint backend — Formulário de leads (Resend)

Pequeno serviço Node/Express que recebe o POST do formulário da landing
e dispara 2 e-mails via Resend:

1. **Notificação interna** para `LEAD_TO_EMAIL` (CRM)
2. **Agradecimento** ao colaborador que preencheu o form

A `RESEND_API_KEY` **nunca** vai pro frontend — fica só aqui no servidor.

---

## Deploy no aaPanel (Nginx + PM2)

```bash
cd server
npm install
cp .env.example .env
nano .env        # preencher RESEND_API_KEY, ALLOWED_ORIGIN, etc.

# rodar com PM2
pm2 start lead.mjs --name agilizou-lead
pm2 save
pm2 startup      # (uma vez, para subir no boot)
```

### Bloco Nginx (dentro do server { } do site)

```nginx
location /api/lead {
    proxy_pass http://127.0.0.1:3001/lead;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Recarregar Nginx: `nginx -s reload`

### Frontend (.env na raiz do projeto)

```
VITE_FORM_ENDPOINT=https://airsupply.agilizouseguros.com.br/api/lead
```

Depois rodar `npm run build` e publicar a pasta `dist/` no Nginx.

---

## Atualizar em produção

```bash
git pull
cd server && npm install && pm2 restart agilizou-lead
cd .. && npm install && npm run build
```

## Teste rápido

```bash
curl -X POST http://127.0.0.1:3001/lead \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","email":"voce@exemplo.com","whatsapp":"(11) 99999-9999","tipoSeguro":"Seguro Auto e Moto","melhorHorario":"Manhã (8h–12h)","observacoes":"teste","origem":"airsupply"}'
```

Resposta esperada: `{"ok":true}`
