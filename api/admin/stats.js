const { wrap, json } = require("../../lib/handler");
const { Admin, User, Result } = require("../../lib/models");
const { authenticate } = require("../../lib/auth");

module.exports = wrap(async (req, res) => {
  if (req.method !== "GET") return json(res, 405, { error: "Method not allowed" });
  const ctx = await authenticate(req, Admin);
  if (!ctx.ok) return json(res, ctx.status, { error: ctx.error });

  const [usersCount, resultsCount, agg] = await Promise.all([
    User.countDocuments(),
    Result.countDocuments(),
    Result.aggregate([
      { $group: { _id: null, avgScore: { $avg: "$score" }, maxScore: { $max: "$score" }, avgAcc: { $avg: "$accuracy" } } },
    ]),
  ]);
  const s = agg[0] || { avgScore: 0, maxScore: 0, avgAcc: 0 };
  json(res, 200, {
    usersCount,
    resultsCount,
    avgScore: Math.round(s.avgScore || 0),
    maxScore: s.maxScore || 0,
    avgAccuracy: Math.round(s.avgAcc || 0),
  });
});
