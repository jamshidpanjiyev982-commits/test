/**
 * Mongoose models — defined once and reused.
 * Guards against "OverwriteModelError" on serverless hot reloads.
 */
const { mongoose } = require("./db");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true, maxlength: 60 },
    lastName: { type: String, required: true, trim: true, maxlength: 60 },
    school: { type: String, required: true, trim: true, maxlength: 120 },
    grade: { type: String, required: true, trim: true, maxlength: 20 },
    phone1: { type: String, required: true, trim: true, maxlength: 20 },
    phone2: { type: String, default: "", trim: true, maxlength: 20 },
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
    score: { type: Number, default: 0 },
    correct: { type: Number, default: 0 },
    wrong: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    accuracy: { type: Number, default: 0 },
    level: String,
    badges: [String],
  },
  { timestamps: true }
);

const AdminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true, lowercase: true, maxlength: 40 },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["super", "admin"], default: "admin" },
    lastLoginAt: { type: Date },
    failedAttempts: { type: Number, default: 0 },
    lockedUntil: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
const Result = mongoose.models.Result || mongoose.model("Result", ResultSchema);
const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

module.exports = { User, Result, Admin };
