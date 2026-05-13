/* ============================================================
   Netlify Function: /api/*
   Wraps the shared Express app via serverless-http.
   ============================================================ */

let serverless, app, connectDB;
let bootError = null;

try {
  serverless = require("serverless-http");
  app = require("../../app");
  connectDB = require("../../lib/db").connectDB;
  // Warm up DB on cold start (best-effort, don't crash on failure)
  connectDB().catch((err) =>
    console.error("[netlify] DB warmup failed:", err && err.message)
  );
} catch (err) {
  bootError = err;
  console.error("[netlify] Boot failed:", err && (err.stack || err.message));
}

const wrapped = app
  ? serverless(app, {
      // Rewrite the path so Express sees the original /api/... URL
      request: (req, event) => {
        const prefix = "/.netlify/functions/api";
        if (event.path && event.path.startsWith(prefix)) {
          const rest = event.path.slice(prefix.length) || "";
          const query = event.rawQuery ? "?" + event.rawQuery : "";
          // Splat redirect strips the /api prefix — re-add it for Express.
          req.url = "/api" + rest + query;
        }
      },
    })
  : null;

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (bootError) {
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        error: "Function failed to load",
        detail: String(bootError.message || bootError).slice(0, 300),
        hint: "Check Netlify env vars (MONGODB_URI, JWT_SECRET) and Function logs",
      }),
    };
  }

  try {
    return await wrapped(event, context);
  } catch (err) {
    console.error("[netlify] Handler crashed:", err && (err.stack || err.message));
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
