/* ============================================================
   QuizVerse Backend
   Express + MongoDB (Mongoose)
   ============================================================ */

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not set in .env");
  process.exit(1);
}

/* ---------- Middleware ---------- */
app.use(express.json({ limit: "1mb" }));
app.use(express.static(__dirname)); // serve index.html, style.css, script.js

/* ---------- MongoDB connect ---------- */
mongoose.set("bufferTimeoutMS", 4000); // fail fast instead of hanging
mongoose
  .connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

function dbReady() { return mongoose.connection.readyState === 1; }

/* ---------- Schemas ---------- */
const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    school: { type: String, required: true, trim: true },
    grade: { type: String, required: true, trim: true },
    phone1: { type: String, required: true, trim: true },
    phone2: { type: String, default: "", trim: true },
  },
  { timestamps: true }
);

const ResultSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    school: String,
    grade: String,
    phone1: String,
    avatar: String,
    score: Number,
    correct: Number,
    wrong: Number,
    total: Number,
    accuracy: Number, // 0-100
    level: String,    // "Boshlovchi" / "O'rta" / "Mahir"
    badges: [String],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
const Result = mongoose.model("Result", ResultSchema);

/* ---------- Helpers ---------- */
function adminAuth(req, res, next) {
  const pwd = req.headers["x-admin-password"] || req.query.password;
  if (pwd !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

function requireDb(req, res, next) {
  if (!dbReady()) {
    return res.status(503).json({ error: "MongoDB ulanmagan. Atlas Network Access va parolni tekshiring." });
  }
  next();
}

/* ---------- Routes: public ---------- */

// Register a new user (called from registration form)
app.post("/api/register", async (req, res) => {
  try {
    const { firstName, lastName, school, grade, phone1, phone2 } = req.body || {};
    if (!firstName || !lastName || !school || !grade || !phone1) {
      return res.status(400).json({ error: "Majburiy maydonlar to'ldirilmagan" });
    }
    const user = await User.create({
      firstName, lastName, school, grade, phone1, phone2: phone2 || "",
    });
    res.json({ ok: true, userId: user._id });
  } catch (err) {
    console.error("register error:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});

// Save quiz result
app.post("/api/result", async (req, res) => {
  try {
    const data = req.body || {};
    const result = await Result.create(data);
    res.json({ ok: true, resultId: result._id });
  } catch (err) {
    console.error("result error:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});

/* ---------- Routes: admin ---------- */

// Admin: list users
app.get("/api/admin/users", adminAuth, requireDb, async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 }).lean();
  res.json(users);
});

// Admin: list results
app.get("/api/admin/results", adminAuth, requireDb, async (req, res) => {
  const results = await Result.find().sort({ createdAt: -1 }).lean();
  res.json(results);
});

// Admin: stats summary
app.get("/api/admin/stats", adminAuth, requireDb, async (req, res) => {
  const [usersCount, resultsCount, agg] = await Promise.all([
    User.countDocuments(),
    Result.countDocuments(),
    Result.aggregate([
      {
        $group: {
          _id: null,
          avgScore: { $avg: "$score" },
          maxScore: { $max: "$score" },
          avgAcc: { $avg: "$accuracy" },
        },
      },
    ]),
  ]);
  const stats = agg[0] || { avgScore: 0, maxScore: 0, avgAcc: 0 };
  res.json({
    usersCount,
    resultsCount,
    avgScore: Math.round(stats.avgScore || 0),
    maxScore: stats.maxScore || 0,
    avgAccuracy: Math.round(stats.avgAcc || 0),
  });
});

// Admin: delete a user
app.delete("/api/admin/users/:id", adminAuth, requireDb, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "delete failed" });
  }
});

// Admin: delete a result
app.delete("/api/admin/results/:id", adminAuth, requireDb, async (req, res) => {
  try {
    await Result.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "delete failed" });
  }
});

/* ---------- Admin page ---------- */
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "admin.html"));
});

/* ---------- Start ---------- */
app.listen(PORT, () => {
  console.log(`🚀 QuizVerse server running:`);
  console.log(`   App:   http://localhost:${PORT}`);
  console.log(`   Admin: http://localhost:${PORT}/admin`);
});
