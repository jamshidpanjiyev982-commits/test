/**
 * Migrate existing plain-text admin passwords -> bcrypt hashes.
 * Reads the legacy `password` field, writes to `passwordHash`, then unsets `password`.
 * Safe to run multiple times.
 * Run: npm run migrate
 */
require("dotenv").config();
const { connectDB, mongoose } = require("../lib/db");
const { hashPassword } = require("../lib/auth");

async function main() {
  await connectDB();
  const coll = mongoose.connection.collection("admins");
  const docs = await coll.find({ password: { $exists: true, $ne: "" } }).toArray();
  console.log(`Found ${docs.length} legacy admin(s) with plain-text passwords`);

  for (const d of docs) {
    if (d.passwordHash) {
      // Already migrated; just remove the plain field
      await coll.updateOne({ _id: d._id }, { $unset: { password: "" } });
      console.log(`  ${d.username}: already hashed, removed plain field`);
      continue;
    }
    const hash = await hashPassword(d.password);
    await coll.updateOne(
      { _id: d._id },
      { $set: { passwordHash: hash }, $unset: { password: "" } }
    );
    console.log(`  ✅ ${d.username}: migrated`);
  }
  console.log("\n✅ Migration complete.");
  process.exit(0);
}

main().catch((e) => {
  console.error("Migration error:", e);
  process.exit(1);
});
