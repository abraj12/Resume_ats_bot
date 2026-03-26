const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const envPath = path.resolve(__dirname, "..", ".env");

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}

const BOT_TOKEN = process.env.BOT_TOKEN;
const GROQ_API_KEY = process.env.GROQ_API_KEY || process.env.GRUQ_API_KEY || process.env.OPENAI_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
const GROQ_BASE_URL = process.env.GROQ_BASE_URL || "https://api.groq.com/openai/v1";
const PORT = Number(process.env.PORT || 5000);
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const STORAGE_DIR = process.env.STORAGE_DIR || "storage";
const ENABLE_JPG_EXPORT = String(process.env.ENABLE_JPG_EXPORT || "true").toLowerCase() === "true";

function validateEnv() {
  const missing = [];

  if (!BOT_TOKEN) {
    missing.push("BOT_TOKEN");
  }

  if (!GROQ_API_KEY) {
    missing.push("GROQ_API_KEY");
  }

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
}

module.exports = {
  BOT_TOKEN,
  GROQ_API_KEY,
  GROQ_MODEL,
  GROQ_BASE_URL,
  PORT,
  FRONTEND_URL,
  STORAGE_DIR,
  ENABLE_JPG_EXPORT,
  validateEnv
};
