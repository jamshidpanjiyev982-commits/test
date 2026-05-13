/**
 * Netlify Function — wraps the same Express app used locally.
 * All /api/* requests are routed here via netlify.toml redirects.
 */
let serverless, app, connectDB;
let loadError = null;

try {
  serverless = require("serverless-http");
  app = require("../../server"); // exports the Express app
  connectDB = require("../../lib/db").connectDB;
  // Warm up DB at cold start (fire-and-forget; handler.js also ensures connection)
  connectDB().catch((err) => console.error("[netlify] DB warmup failed:", err && err.message));
} catch (err) {
  loadError = err;
  console.error("[netlify] Module load failed:", err && (err.stack || err.message));
}

const handler = app && serverless(app, {
  // Rewrite the URL so Express sees the original /api/... path
  request: (req, event) => {
    if (event.path && event.path.startsWith("/.netlify/functions/api")) {
      const query = event.rawQuery ? "?" + event.rawQuery : "";
      req.url = event.path.replace("/.netlify/functions/api", "/api") + query;
    }
  },
});

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  if (loadError) {
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        error: "Function failed to load",
        detail: String(loadError.message || loadError).slice(0, 300),
      }),
    };
  }
  try {
    return await handler(event, context);
  } catch (err) {
    console.error("[netlify] Handler threw:", err && (err.stack || err.message));
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
