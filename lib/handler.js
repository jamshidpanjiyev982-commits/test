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
    setCors(res);
    if (req.method === "OPTIONS") {
      res.statusCode = 204;
      return res.end();
    }
    try {
      await connectDB();
    } catch (err) {
      console.error("DB connect error:", err.message);
      return json(res, 503, { error: "Database unavailable" });
    }

    // Ensure body is parsed
    if (req.method !== "GET" && req.method !== "DELETE" && !req.body) {
      try {
        req.body = await readJsonBody(req);
      } catch {
        return json(res, 400, { error: "Invalid JSON body" });
      }
    }

    try {
      await fn(req, res);
    } catch (err) {
      console.error("Handler error:", err);
      if (!res.headersSent) {
        json(res, 500, { error: "Server error" });
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
