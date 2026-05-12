/* Seed initial admin users */
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("bufferTimeoutMS", 4000);
mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

const AdminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["super", "admin"], default: "admin" },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", AdminSchema);

async function seed() {
  try {
    // Check if admins already exist
    const existing = await Admin.countDocuments();
    if (existing > 0) {
      console.log(`ℹ️  Admins already exist (${existing}). Skipping seed.`);
      const list = await Admin.find().lean();
      console.log("Existing admins:");
      list.forEach(a => console.log(`  - ${a.username} (${a.role})`));
      process.exit(0);
    }

    // Create super admin
    await Admin.create({
      username: "super",
      password: "super123",
      role: "super",
    });
    console.log("✅ Super admin created: username='super', password='super123'");

    // Create regular admin
    await Admin.create({
      username: "admin",
      password: "admin123",
      role: "admin",
    });
    console.log("✅ Regular admin created: username='admin', password='admin123'");

    console.log("\n🎉 Seeding complete!");
    console.log("\nLogin credentials:");
    console.log("  Super admin: super / super123");
    console.log("  Regular admin: admin / admin123");

    process.exit(0);
  } catch (err) {
    if (err.code === 11000) {
      console.error("❌ Username already exists. Delete existing admins first or use different username.");
    } else {
      console.error("❌ Seed error:", err);
    }
    process.exit(1);
  }
}

seed();
