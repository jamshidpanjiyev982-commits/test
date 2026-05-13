/* ============================================================
   QuizVerse — Local Dev Server
   Production deploys (Vercel/Netlify) DO NOT use this file.
   They wrap `app.js` directly via serverless-http.
   ============================================================ */

require("dotenv").config();

const app = require("./app");
const { connectDB } = require("./lib/db");

const PORT = Number(process.env.PORT) || 3000;

if (!process.env.MONGODB_URI) {
  console.warn("⚠️  MONGODB_URI is not set in .env — DB calls will fail until you set it.");
}

// Eager-connect for nicer dev UX (errors logged, not fatal)
connectDB().catch((e) => {
  console.error("⚠️  Initial DB connect failed:", e && e.message);
});

app.listen(PORT, () => {
  console.log("🚀 QuizVerse server running:");
  console.log(`   App:   http://localhost:${PORT}`);
  console.log(`   Admin: http://localhost:${PORT}/admin`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
});
