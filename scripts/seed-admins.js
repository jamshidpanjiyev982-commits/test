/**
 * Seed initial admin users with bcrypt-hashed passwords.
 * Run: npm run seed
 */
require("dotenv").config();
const { connectDB } = require("../lib/db");
const { Admin } = require("../lib/models");
const { hashPassword } = require("../lib/auth");

async function main() {
  await connectDB();
  const count = await Admin.countDocuments();
  if (count > 0) {
    console.log(`ℹ️  ${count} admin(s) already exist. Skipping seed.`);
    const list = await Admin.find().select("username role").lean();
    list.forEach((a) => console.log(`  - ${a.username} (${a.role})`));
    process.exit(0);
  }
  await Admin.create({
    username: "super",
    passwordHash: await hashPassword("super123"),
    role: "super",
  });
  await Admin.create({
    username: "admin",
    passwordHash: await hashPassword("admin123"),
    role: "admin",
  });
  console.log("✅ Seeded admins:");
  console.log("  super / super123  (super admin)");
  console.log("  admin / admin123  (regular admin)");
  console.log("\n⚠️  Bu parollarni production'da darhol o'zgartiring!");
  process.exit(0);
}

main().catch((e) => {
  console.error("Seed error:", e.message);
  process.exit(1);
});
