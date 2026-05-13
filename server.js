/* ============================================================
   QuizVerse — Local Development Server
   Wraps the same /api/* serverless functions for local Express.
   Production deploys use the /api/ folder directly as serverless
   functions (Vercel/Netlify Functions) and do NOT use this file.
   ============================================================ */

require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI is not set in .env");
  process.exit(1);
}

/* ---------- Middleware ---------- */
app.use(express.json({ limit: "1mb" }));
app.use(express.static(__dirname, {
  index: "index.html",
  setHeaders: (res) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  },
}));

/* ---------- Mount serverless functions as Express routes ---------- */
const { connectDB } = require("./lib/db");

const apiRoutes = [
  { method: "post", path: "/api/register",         file: "./api/register.js" },
  { method: "post", path: "/api/result",           file: "./api/result.js" },
  { method: "post", path: "/api/admin/login",      file: "./api/admin/login.js" },
  { method: "get",  path: "/api/admin/me",         file: "./api/admin/me.js" },
  { method: "get",  path: "/api/admin/stats",      file: "./api/admin/stats.js" },
  { method: "all",  path: "/api/admin/users",      file: "./api/admin/users.js" },
  { method: "all",  path: "/api/admin/users/:id",  file: "./api/admin/users.js", paramAsQueryId: true },
  { method: "all",  path: "/api/admin/results",    file: "./api/admin/results.js" },
  { method: "all",  path: "/api/admin/results/:id",file: "./api/admin/results.js", paramAsQueryId: true },
];

for (const r of apiRoutes) {
  const handler = require(r.file);
  app[r.method](r.path, (req, res) => {
    if (r.paramAsQueryId && req.params.id) {
      req.query = { ...(req.query || {}), id: req.params.id };
    }
    return handler(req, res);
  });
}

app.get("/admin", (_req, res) => res.sendFile(path.join(__dirname, "admin.html")));

/* ---------- Export app for serverless wrappers ---------- */
module.exports = app;

/* ---------- Start (only when run directly: `node server.js`) ---------- */
if (require.main === module) {
  connectDB().catch((e) => console.error("Initial DB connect failed:", e.message));
  app.listen(PORT, () => {
    console.log("🚀 QuizVerse server running:");
    console.log(`   App:   http://localhost:${PORT}`);
    console.log(`   Admin: http://localhost:${PORT}/admin`);
  });
}
