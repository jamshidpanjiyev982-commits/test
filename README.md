# QuizVerse 🎮

Gamified IT & English quiz with story mode, MongoDB backend, and a role-based admin panel. Deployable to **Vercel**, **Netlify**, or run locally with Express.

---

## 🏗 Architecture

```
├── api/                    # Serverless functions (Vercel/Netlify auto-deploy)
│   ├── register.js         # POST /api/register
│   ├── result.js           # POST /api/result
│   └── admin/
│       ├── login.js        # POST /api/admin/login   → returns JWT
│       ├── me.js           # GET  /api/admin/me
│       ├── stats.js        # GET  /api/admin/stats
│       ├── users.js        # GET/DELETE /api/admin/users
│       └── results.js      # GET/DELETE /api/admin/results
├── lib/
│   ├── db.js               # Cached MongoDB connection (serverless-friendly)
│   ├── models.js           # Mongoose schemas (User, Result, Admin)
│   ├── auth.js             # bcrypt + JWT helpers
│   └── handler.js          # Wraps handlers (CORS, body parsing, errors)
├── scripts/
│   ├── seed-admins.js      # Seed initial super + regular admin
│   ├── add-admin.js        # CLI to add a new admin
│   └── migrate-passwords.js# Plain-text → bcrypt migration
├── index.html, admin.html  # Frontend (static)
├── style.css, script.js
├── server.js               # Local Express dev server (mounts the same /api files)
├── vercel.json             # Routing + security headers
└── package.json
```

## 🔒 Security

- **Passwords**: hashed with **bcryptjs** (10 rounds)
- **Sessions**: signed **JWT** tokens, sent via `Authorization: Bearer …`
- **Rate limiting**: 8 login attempts / 15 min per IP
- **Account lockout**: 5 failed passwords → 15-minute lock
- **Roles**: `super` (full control) vs `admin` (read-only on results)
- **Headers**: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`
- **Input validation**: phone format, max lengths, type coercion on results
- **No secrets in code**: `.env` for local, env vars on hosting platform

## ▶️ Local development

```bash
npm install
cp .env.example .env       # then fill in MONGODB_URI and JWT_SECRET
npm run seed               # create initial admins
npm start                  # http://localhost:3000
```

Default credentials after seed (CHANGE THEM):
- Super: `super` / `super123`
- Admin: `admin` / `admin123`

Add a custom admin:
```bash
node scripts/add-admin.js <username> <password> <super|admin>
```

## 🚀 Deploy to Vercel

1. Push the repo to GitHub.
2. On https://vercel.com → **Import Project**.
3. Set **Environment Variables**:
   - `MONGODB_URI`
   - `JWT_SECRET` (use `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`)
   - `JWT_EXPIRES_IN` (optional, default `12h`)
   - `CORS_ORIGIN` (optional, e.g. your domain)
4. **Deploy.** The `/api/*` files are auto-detected as serverless functions.
5. **MongoDB Atlas → Network Access** → add `0.0.0.0/0` (Allow from anywhere).
6. Once deployed, run the seed remotely (one-time):
   ```bash
   MONGODB_URI="…" JWT_SECRET="…" node scripts/seed-admins.js
   ```
   …or invoke `add-admin.js` from your local machine pointing at the production DB.

## 🚀 Deploy to Netlify

Same as Vercel — `/api` is automatically wired to Netlify Functions in modern Netlify. Set the same env vars and add a `netlify.toml` if needed.

## 🛣 API Reference

| Method | Path                        | Auth     | Notes                  |
|--------|-----------------------------|----------|------------------------|
| POST   | `/api/register`             | —        | Create user            |
| POST   | `/api/result`               | —        | Save quiz result       |
| POST   | `/api/admin/login`          | —        | Returns JWT            |
| GET    | `/api/admin/me`             | JWT      | Current admin info     |
| GET    | `/api/admin/stats`          | JWT      | Counts + averages      |
| GET    | `/api/admin/users`          | super    | List users             |
| DELETE | `/api/admin/users?id=…`     | super    | Delete user            |
| GET    | `/api/admin/results`        | JWT      | List results           |
| DELETE | `/api/admin/results?id=…`   | super    | Delete result          |

## 🐛 Troubleshooting

- **"Server/MongoDB xatosi (kod: 404)" on Vercel/Netlify** — old version. Redeploy after this restructure (the bug was caused by the `Buffer` API not existing in browsers and the previous Express server not being deployed).
- **Login returns 503** — DB unreachable. Check Atlas Network Access and `MONGODB_URI`.
- **Login returns 423** — account locked from too many failures. Wait 15 min.
- **JWT errors after redeploy** — old tokens invalid because `JWT_SECRET` changed. Just log in again.
