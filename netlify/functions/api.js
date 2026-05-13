/* ============================================================
   Netlify Function — standalone, all imports are STATIC so
   esbuild can trace and bundle everything (including bcryptjs).
   Does NOT import app.js or server.js.
   ============================================================ */

const express    = require("express");
const serverless = require("serverless-http");

// lib — statically required so esbuild bundles bcryptjs, jsonwebtoken, etc.
const { connectDB } = require("../../lib/db");
const { wrap, json, setCors } = require("../../lib/handler");

// api handlers — static requires (esbuild traces these)
const healthHandler  = require("../../api/health");
const registerHandler = require("../../api/register");
const resultHandler  = require("../../api/result");
const loginHandler   = require("../../api/admin/login");
const meHandler      = require("../../api/admin/me");
const statsHandler   = require("../../api/admin/stats");
const usersHandler   = require("../../api/admin/users");
const resultsHandler = require("../../api/admin/results");

// Warm up DB at cold start
connectDB().catch((err) =>
  console.error("[netlify] DB warmup:", err && err.message)
);

// Build minimal Express app inline
const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));

// Mount routes
app.get( "/api/health",              healthHandler);
app.post("/api/register",            registerHandler);
app.post("/api/result",              resultHandler);
app.post("/api/admin/login",         loginHandler);
app.get( "/api/admin/me",            meHandler);
app.get( "/api/admin/stats",         statsHandler);
app.all( "/api/admin/users",         usersHandler);
app.all( "/api/admin/users/:id",     (req, res) => {
  req.query = { ...req.query, id: req.params.id };
  return usersHandler(req, res);
});
app.all( "/api/admin/results",       resultsHandler);
app.all( "/api/admin/results/:id",   (req, res) => {
  req.query = { ...req.query, id: req.params.id };
  return resultsHandler(req, res);
});

app.all("/api/*", (_req, res) => {
  res.statusCode = 404;
  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify({ error: "API route not found" }));
});

app.use((err, _req, res, _next) => {
  console.error("[netlify] Express error:", err && err.message);
  if (res.headersSent) return;
  res.statusCode = 500;
  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify({ error: "Server error", detail: String(err && err.message || err).slice(0, 200) }));
});

// Wrap with serverless-http, rewrite path
const wrapped = serverless(app, {
  request: (req, event) => {
    const prefix = "/.netlify/functions/api";
    if (event.path && event.path.startsWith(prefix)) {
      const rest = event.path.slice(prefix.length) || "";
      const query = event.rawQuery ? "?" + event.rawQuery : "";
      req.url = "/api" + rest + query;
    }
  },
});

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    return await wrapped(event, context);
  } catch (err) {
    console.error("[netlify] crashed:", err && (err.stack || err.message));
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        error: "Function crashed",
        detail: String(err && err.message || err).slice(0, 300),
      }),
    };
  }
};
