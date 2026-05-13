/**
 * Add a new admin user from CLI.
 * Usage:
 *   node scripts/add-admin.js <username> <password> <role>
 * Example:
 *   node scripts/add-admin.js jamshid SuperPass2026 super
 */
require("dotenv").config();
const { connectDB } = require("../lib/db");
const { Admin } = require("../lib/models");
const { hashPassword } = require("../lib/auth");

const [, , username, password, roleArg] = process.argv;
const role = roleArg === "super" ? "super" : "admin";

if (!username || !password) {
  console.error("Usage: node scripts/add-admin.js <username> <password> [super|admin]");
  process.exit(1);
}
if (password.length < 8) {
  console.error("❌ Parol kamida 8 belgi bo'lishi kerak");
  process.exit(1);
}

async function main() {
  await connectDB();
  try {
    await Admin.create({
      username: username.toLowerCase(),
      passwordHash: await hashPassword(password),
      role,
    });
    console.log(`✅ Created: ${username} (${role})`);
    process.exit(0);
  } catch (err) {
    if (err.code === 11000) {
      console.error("❌ Bu username allaqachon mavjud");
    } else {
      console.error("❌ Error:", err.message);
    }
    process.exit(1);
  }
}
main();
