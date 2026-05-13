/**
 * Health check — diagnoses common deployment issues without leaking secrets.
 * GET /api/health
 */
const { json, setCors } = require("../lib/handler");

module.exports = async (req, res) => {
  setCors(res);
  if (req.method === "OPTIONS") { res.statusCode = 204; return res.end(); }

  const env = {
    mongoUri: !!process.env.MONGODB_URI,
    jwtSecret: !!process.env.JWT_SECRET,
    node: process.version,
    platform: process.env.VERCEL ? "vercel" : process.env.NETLIFY ? "netlify" : "other",
  };

  let dbStatus = "skipped";
  let dbError = null;
  try {
    const { connectDB, mongoose } = require("../lib/db");
    await connectDB();
    dbStatus = ["disconnected", "connected", "connecting", "disconnecting"][mongoose.connection.readyState] || "unknown";
  } catch (e) {
    dbStatus = "failed";
    dbError = String(e && e.message || e).slice(0, 200);
  }

  json(res, 200, { ok: dbStatus === "connected", env, dbStatus, dbError });
};
