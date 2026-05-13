/**
 * Shared helper to wrap serverless handlers with:
 *  - DB connection (cached)
 *  - JSON body parsing fallback
 *  - CORS for same-origin (Vercel/Netlify)
 *  - Centralized error handling
 */
const { connectDB } = require("./db");

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", process.env.CORS_ORIGIN || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

function json(res, status, data) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}

/**
 * Wrap a serverless handler.
 * Usage: module.exports = wrap(async (req, res) => { ... });
 */
function wrap(fn) {
  return async function handler(req, res) {
    try {
      setCors(res);
      if (req.method === "OPTIONS") {
        res.statusCode = 204;
        return res.end();
      }

      try {
        await connectDB();
      } catch (err) {
        console.error("[handler] DB connect error:", err && err.message);
        return json(res, 503, { error: "Database unavailable: " + (err && err.message || "unknown") });
      }

      // Ensure body is parsed. Vercel/Netlify often pre-parse JSON bodies into req.body.
      // Only manually parse if req.body is missing AND it's a body-bearing method.
      const needsBody = req.method !== "GET" && req.method !== "DELETE" && req.method !== "HEAD";
      if (needsBody && (req.body === undefined || req.body === null)) {
        try {
          req.body = await readJsonBody(req);
        } catch (e) {
          return json(res, 400, { error: "Invalid JSON body" });
        }
      }
      // If body is a string (some platforms), parse it
      if (needsBody && typeof req.body === "string") {
        try {
          req.body = req.body ? JSON.parse(req.body) : {};
        } catch {
          return json(res, 400, { error: "Invalid JSON body" });
        }
      }

      await fn(req, res);
    } catch (err) {
      console.error("[handler] Uncaught error:", err && (err.stack || err.message || err));
      if (!res.headersSent) {
        try {
          json(res, 500, { error: "Server error", detail: String(err && err.message || err).slice(0, 200) });
        } catch {
          res.statusCode = 500;
          res.end('{"error":"Server error"}');
        }
      }
    }
  };
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (c) => {
      data += c;
      if (data.length > 1e6) {
        req.destroy();
        reject(new Error("Body too large"));
      }
    });
    req.on("end", () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

module.exports = { wrap, json, setCors };
