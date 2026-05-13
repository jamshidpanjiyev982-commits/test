const { wrap, json } = require("../../lib/handler");
const { Admin } = require("../../lib/models");
const { verifyPassword, signToken } = require("../../lib/auth");

// Simple in-memory rate limit (per IP) — works on warm serverless instances.
// For production, use Upstash Redis or Vercel KV.
const attempts = new Map();
const WINDOW_MS = 15 * 60 * 1000; // 15 min
const MAX_ATTEMPTS = 8;

function rateLimit(ip) {
  const now = Date.now();
  const entry = attempts.get(ip) || { count: 0, resetAt: now + WINDOW_MS };
  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + WINDOW_MS;
  }
  entry.count++;
  attempts.set(ip, entry);
  return entry.count <= MAX_ATTEMPTS;
}

module.exports = wrap(async (req, res) => {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });

  const ip = req.headers["x-forwarded-for"]?.split(",")[0].trim() || req.socket?.remoteAddress || "unknown";
  if (!rateLimit(ip)) {
    return json(res, 429, { error: "Juda ko'p urinish. 15 daqiqa kuting." });
  }

  const { username, password } = req.body || {};
  if (!username || !password) {
    return json(res, 400, { error: "Username va parol kerak" });
  }

  const admin = await Admin.findOne({ username: String(username).toLowerCase().trim() });
  if (!admin) {
    return json(res, 401, { error: "Login yoki parol noto'g'ri" });
  }

  // Account lockout after repeated failures
  if (admin.lockedUntil && admin.lockedUntil > new Date()) {
    return json(res, 423, { error: "Hisob vaqtincha bloklangan. Birozdan keyin urining." });
  }

  const ok = await verifyPassword(password, admin.passwordHash);
  if (!ok) {
    admin.failedAttempts = (admin.failedAttempts || 0) + 1;
    if (admin.failedAttempts >= 5) {
      admin.lockedUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 min
      admin.failedAttempts = 0;
    }
    await admin.save();
    return json(res, 401, { error: "Login yoki parol noto'g'ri" });
  }

  admin.failedAttempts = 0;
  admin.lockedUntil = undefined;
  admin.lastLoginAt = new Date();
  await admin.save();

  const token = signToken({ sub: String(admin._id), role: admin.role, username: admin.username });
  json(res, 200, {
    token,
    admin: { id: String(admin._id), username: admin.username, role: admin.role },
  });
});
