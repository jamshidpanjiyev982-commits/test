const { wrap, json } = require("../lib/handler");
const { User } = require("../lib/models");

module.exports = wrap(async (req, res) => {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });

  const { firstName, lastName, school, grade, phone1, phone2 } = req.body || {};
  if (!firstName || !lastName || !school || !grade || !phone1) {
    return json(res, 400, { error: "Majburiy maydonlar to'ldirilmagan" });
  }
  // Basic phone validation: +998 followed by 9 digits
  const phoneRe = /^\+998\d{9}$/;
  if (!phoneRe.test(phone1)) {
    return json(res, 400, { error: "Telefon raqam noto'g'ri formatda" });
  }
  if (phone2 && !phoneRe.test(phone2)) {
    return json(res, 400, { error: "Qo'shimcha telefon raqam noto'g'ri formatda" });
  }

  const user = await User.create({
    firstName: String(firstName).trim(),
    lastName: String(lastName).trim(),
    school: String(school).trim(),
    grade: String(grade).trim(),
    phone1: String(phone1).trim(),
    phone2: phone2 ? String(phone2).trim() : "",
  });
  json(res, 200, { ok: true, userId: user._id });
});
