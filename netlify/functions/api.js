/**
 * Netlify Function — wraps the same Express app used locally.
 * All /api/* requests are routed here via netlify.toml redirects.
 */
const serverless = require("serverless-http");
const app = require("../../server"); // exports the Express app
const { connectDB } = require("../../lib/db");

// Warm up DB at cold start (fire-and-forget; handler.js also ensures connection)
connectDB().catch((err) => console.error("DB warmup failed:", err.message));

const handler = serverless(app, {
  // Strip Netlify's function path so Express sees the original /api/... URL
  request: (req, event) => {
    // event.path is like "/.netlify/functions/api/admin/login"
    // We want Express to see "/api/admin/login"
    if (event.path && event.path.startsWith("/.netlify/functions/api")) {
      req.url = event.path.replace("/.netlify/functions/api", "/api") + (event.rawQuery ? "?" + event.rawQuery : "");
    }
  },
});

exports.handler = async (event, context) => {
  // Allow connection reuse across invocations
  context.callbackWaitsForEmptyEventLoop = false;
  return handler(event, context);
};
