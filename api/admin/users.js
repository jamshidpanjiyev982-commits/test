const { wrap, json } = require("../../lib/handler");
const { Admin, User } = require("../../lib/models");
const { authenticate, requireSuper } = require("../../lib/auth");

module.exports = wrap(async (req, res) => {
  const ctx = await authenticate(req, Admin);
  if (!ctx.ok) return json(res, ctx.status, { error: ctx.error });

  if (req.method === "GET") {
    const sup = requireSuper(ctx);
    if (!sup.ok) return json(res, sup.status, { error: sup.error });
    const users = await User.find().sort({ createdAt: -1 }).lean();
    return json(res, 200, users);
  }

  if (req.method === "DELETE") {
    const sup = requireSuper(ctx);
    if (!sup.ok) return json(res, sup.status, { error: sup.error });
    const id = req.query?.id || (req.url.match(/[?&]id=([^&]+)/) || [])[1];
    if (!id) return json(res, 400, { error: "id required" });
    await User.findByIdAndDelete(id);
    return json(res, 200, { ok: true });
  }

  json(res, 405, { error: "Method not allowed" });
});
