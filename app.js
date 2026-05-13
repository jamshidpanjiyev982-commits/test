/* ============================================================
   QuizVerse — Express app factory
   Used by:
     - server.js  (local dev)
     - netlify/functions/api.js  (production via serverless-http)
   This file MUST NOT call process.exit() or app.listen() —
   it only configures and exports the Express app.
   ============================================================ */

const path = require("path");
const express = require("express");

const app = express();

/* ---------- Core middleware ---------- */
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));

/* ---------- Static files (used in local dev only;
   Netlify/Vercel serve static assets from CDN, not via Express) ---------- */
app.use(
  express.static(path.join(__dirname), {
    index: "index.html",
    setHeaders: (res) => {
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    },
  })
);

/* ---------- Mount /api/* routes (each file is a serverless-style handler) ---------- */
const apiRoutes = [
  { method: "get",  path: "/api/health",            file: "./api/health.js" },
  { method: "post", path: "/api/register",          file: "./api/register.js" },
  { method: "post", path: "/api/result",            file: "./api/result.js" },
  { method: "post", path: "/api/admin/login",       file: "./api/admin/login.js" },
  { method: "get",  path: "/api/admin/me",          file: "./api/admin/me.js" },
  { method: "get",  path: "/api/admin/stats",       file: "./api/admin/stats.js" },
  { method: "all",  path: "/api/admin/users",       file: "./api/admin/users.js" },
  { method: "all",  path: "/api/admin/users/:id",   file: "./api/admin/users.js", paramAsQueryId: true },
  { method: "all",  path: "/api/admin/results",     file: "./api/admin/results.js" },
  { method: "all",  path: "/api/admin/results/:id", file: "./api/admin/results.js", paramAsQueryId: true },
];

for (const r of apiRoutes) {
  let handler;
  try {
    handler = require(r.file);
  } catch (err) {
    // Don't crash the whole app if one route file fails to load — log and serve 500.
    console.error(`[app] Failed to load ${r.file}:`, err && err.message);
    handler = (_req, res) => {
      res.statusCode = 500;
      res.setHeader("content-type", "application/json");
      res.end(JSON.stringify({ error: "Route failed to load", route: r.path, detail: err && err.message }));
    };
  }
  app[r.method](r.path, (req, res) => {
    if (r.paramAsQueryId && req.params.id) {
      req.query = { ...(req.query || {}), id: req.params.id };
    }
    return handler(req, res);
  });
}

/* ---------- Pretty URL for admin (local dev) ---------- */
app.get("/admin", (_req, res) => res.sendFile(path.join(__dirname, "admin.html")));

/* ---------- 404 for unknown /api routes ---------- */
app.all("/api/*", (_req, res) => {
  res.statusCode = 404;
  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify({ error: "API route not found" }));
});

/* ---------- Global error handler — never crash the function ---------- */
app.use((err, _req, res, _next) => {
  console.error("[app] Express error:", err && (err.stack || err.message));
  if (res.headersSent) return;
  res.statusCode = 500;
  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify({ error: "Server error", detail: String(err && err.message || err).slice(0, 200) }));
});

module.exports = app;
