/**
 * MongoDB connection — cached for serverless (Vercel/Netlify Functions)
 * Reuses connection across invocations to avoid cold-start overhead.
 */
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not set");
}

let cached = global._mongoose;
if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    mongoose.set("bufferTimeoutMS", 4000);
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 8000,
        maxPoolSize: 10,
      })
      .then((m) => {
        console.log("✅ MongoDB connected");
        return m;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
  return cached.conn;
}

function dbReady() {
  return mongoose.connection.readyState === 1;
}

module.exports = { connectDB, dbReady, mongoose };
