# Deploying simretpaulos.com

The site is a static Vue build hosted on **Cloudflare Pages**. The contact form posts to a
**Pages Function** (`functions/api/contact.js`) that checks **Turnstile**, saves the message in
**Cloudflare D1** (a free database) and emails it to you with **Resend**. Security headers live in `public/_headers`.

Do the steps in order. Anything marked **secret** must only ever be pasted into a dashboard,
never into the code.

---

## 1. Domain on Cloudflare

1. Cloudflare dashboard → **Add a domain** → `simretpaulos.com` → **Free** plan.
2. Delete any Namecheap parking records Cloudflare imports.
3. Namecheap → Domain List → Manage → **Nameservers: Custom DNS** → paste Cloudflare's two nameservers.
4. Wait for the "domain is active" email.

## 2. Cloudflare D1 (stores every message)

```bash
npx wrangler login
npx wrangler d1 create simret-portfolio-messages
```

Paste the `database_id` it prints into `wrangler.toml`, then create the table:

```bash
npx wrangler d1 migrations apply simret-portfolio-messages --remote
```

To read your messages later: Cloudflare dashboard → **Storage & Databases → D1 →
simret-portfolio-messages → Console**, and run
`SELECT * FROM contact_messages ORDER BY created_at DESC;`

## 3. Resend (sends the emails)

1. resend.com → **Domains → Add domain** → `simretpaulos.com`.
2. Add the DNS records Resend shows (DKIM, SPF, MX on `send.`) in Cloudflare → DNS. Set them to
   **DNS only** (grey cloud).
3. Wait until the domain shows **Verified**.
4. **API Keys → Create** with **Sending access** only, limited to `simretpaulos.com`. This is **secret**.

## 4. Turnstile (blocks bots)

1. Cloudflare → **Turnstile → Add widget**.
2. Hostnames: `simretpaulos.com` and `www.simretpaulos.com`. Mode: **Managed**.
3. Copy the **Site key** (public) and **Secret key** (**secret**).

## 5. Cloudflare Pages (hosting)

1. Cloudflare → **Workers & Pages → Create → Pages → Connect to Git** → pick this repo.
2. Build settings:
   - Production branch: `main` (or `modern-redesign` while testing)
   - Build command: `npm run build`
   - Build output directory: `dist`
3. **Settings → Variables and Secrets** (Production):

   | Name | Type | Value |
   |---|---|---|
   | `NODE_VERSION` | Text | `22` |
   | `VUE_APP_TURNSTILE_SITE_KEY` | Text | Turnstile site key |
   | `TURNSTILE_SECRET_KEY` | Secret | Turnstile secret key |
   | `RESEND_API_KEY` | Secret | Resend API key |
   | `CONTACT_TO_EMAIL` | Text | the inbox that receives messages |
   | `CONTACT_FROM_EMAIL` | Text | `Simret Paulos Portfolio <contact@simretpaulos.com>` |

4. Redeploy after adding variables (the site key is baked in at build time).
5. **Custom domains → Set up a custom domain** → `simretpaulos.com`, then also `www.simretpaulos.com`.

## 6. Cloudflare security settings

All available on the Free plan:

- **SSL/TLS → Overview**: mode **Full (strict)**.
- **SSL/TLS → Edge Certificates**: **Always Use HTTPS** on, **Minimum TLS Version** 1.2,
  **Automatic HTTPS Rewrites** on.
- **Security → Bots**: **Bot Fight Mode** on.
- **Security → WAF → Rate limiting rules → Create rule**:
  - If: URI Path **equals** `/api/contact` **and** Request Method **equals** `POST`
  - Rate: **3 requests per 10 seconds** per IP → **Block** for 10 seconds
- **DNS → Settings**: **Enable DNSSEC**, then add the DS record Cloudflare shows in Namecheap
  (Domain List → Manage → Advanced DNS → DNSSEC).
- Optional: **Email → Email Routing** to forward `hello@simretpaulos.com` to your personal inbox.

## Checking it works

- Send yourself a message through the form; it should arrive by email and appear in the D1
  `contact_messages` table with `emailed = 1`.
- Test the headers at https://securityheaders.com/?q=simretpaulos.com (should score A or A+).

## Local development

```bash
npm run serve        # site at http://localhost:8080 (uses Turnstile's test key)
cp .dev.vars.example .dev.vars   # then fill in real or test values
npx wrangler d1 migrations apply simret-portfolio-messages --local   # first time only
npm run functions    # builds and runs the contact function at http://127.0.0.1:8788
```

With both running, the form on `localhost:8080` talks to the local function.
