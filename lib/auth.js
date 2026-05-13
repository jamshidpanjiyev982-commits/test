/**
 * Auth utilities — bcrypt password hashing + JWT tokens.
 */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "change-me-in-production-please";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "12h";
const BCRYPT_ROUNDS = 10;

if (!process.env.JWT_SECRET) {
  console.warn("⚠️  JWT_SECRET not set — using insecure default. Set it in .env / Vercel env.");
}

async function hashPassword(plain) {
  return bcrypt.hash(plain, BCRYPT_ROUNDS);
}

async function verifyPassword(plain, hash) {
  if (!hash) return false;
  try {
    return await bcrypt.compare(plain, hash);
  } catch {
    return false;
  }
}

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

/** Extract Bearer token from a request (works for both Express req and Vercel req). */
function getTokenFromReq(req) {
  const auth = req.headers?.authorization || req.headers?.Authorization;
  if (!auth) return null;
  const parts = String(auth).split(" ");
  if (parts.length === 2 && /^Bearer$/i.test(parts[0])) return parts[1];
  return null;
}

/** Build an auth context: { ok, status, admin?, error? } */
async function authenticate(req, AdminModel) {
  const token = getTokenFromReq(req);
  if (!token) return { ok: false, status: 401, error: "Missing token" };
  const payload = verifyToken(token);
  if (!payload || !payload.sub) return { ok: false, status: 401, error: "Invalid or expired token" };
  try {
    const admin = await AdminModel.findById(payload.sub).select("username role").lean();
    if (!admin) return { ok: false, status: 401, error: "Account no longer exists" };
    return { ok: true, admin: { id: String(admin._id), username: admin.username, role: admin.role } };
  } catch {
    return { ok: false, status: 500, error: "Auth lookup failed" };
  }
}

function requireSuper(adminCtx) {
  if (!adminCtx?.admin || adminCtx.admin.role !== "super") {
    return { ok: false, status: 403, error: "Super admin required" };
  }
  return { ok: true };
}

module.exports = {
  hashPassword,
  verifyPassword,
  signToken,
  verifyToken,
  getTokenFromReq,
  authenticate,
  requireSuper,
  JWT_SECRET,
};
