const { wrap, json } = require("../../lib/handler");
const { Admin } = require("../../lib/models");
const { authenticate } = require("../../lib/auth");

module.exports = wrap(async (req, res) => {
  if (req.method !== "GET") return json(res, 405, { error: "Method not allowed" });
  const ctx = await authenticate(req, Admin);
  if (!ctx.ok) return json(res, ctx.status, { error: ctx.error });
  json(res, 200, ctx.admin);
});
