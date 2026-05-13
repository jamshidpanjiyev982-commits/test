const { wrap, json } = require("../lib/handler");
const { Result } = require("../lib/models");

module.exports = wrap(async (req, res) => {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });
  const d = req.body || {};
  const safe = {
    userId: d.userId || null,
    name: String(d.name || "").slice(0, 120),
    school: String(d.school || "").slice(0, 120),
    grade: String(d.grade || "").slice(0, 20),
    phone1: String(d.phone1 || "").slice(0, 20),
    avatar: String(d.avatar || "").slice(0, 10),
    score: Number(d.score) || 0,
    correct: Number(d.correct) || 0,
    wrong: Number(d.wrong) || 0,
    total: Number(d.total) || 0,
    accuracy: Number(d.accuracy) || 0,
    level: String(d.level || "").slice(0, 30),
    badges: Array.isArray(d.badges) ? d.badges.slice(0, 20).map(String) : [],
  };
  const result = await Result.create(safe);
  json(res, 200, { ok: true, resultId: result._id });
});
