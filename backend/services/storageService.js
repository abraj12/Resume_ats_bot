const fs = require("fs/promises");
const path = require("path");
const { STORAGE_DIR } = require("../utils/env");
const { downloadTelegramFile, sanitizeFileName, writeJsonFile } = require("../utils/files");

const baseStoragePath = path.resolve(STORAGE_DIR);

async function ensureBaseStorage() {
  await fs.mkdir(baseStoragePath, { recursive: true });
  await fs.mkdir(path.join(baseStoragePath, "users"), { recursive: true });
  await fs.mkdir(path.join(baseStoragePath, "tmp"), { recursive: true });
}

async function ensureUserDirectory(userId) {
  const userDirectory = getUserDirectory(userId);
  await fs.mkdir(userDirectory, { recursive: true });
  return userDirectory;
}

function getUserDirectory(userId) {
  return path.join(baseStoragePath, "users", String(userId));
}

async function saveResumeDocument(telegram, userId, document) {
  const userDirectory = await ensureUserDirectory(userId);
  const extension = path.extname(document.file_name || "").toLowerCase();
  const safeName = sanitizeFileName(`resume${extension}`);
  const filePath = path.join(userDirectory, safeName);
  const fileLink = await telegram.getFileLink(document.file_id);

  await downloadTelegramFile(fileLink.href, filePath);

  return {
    fileName: document.file_name,
    filePath,
    extension,
    mimeType: document.mime_type || "application/octet-stream"
  };
}

async function persistJobDescription(userId, jobDescription) {
  const userDirectory = await ensureUserDirectory(userId);
  await fs.writeFile(path.join(userDirectory, "job-description.txt"), jobDescription, "utf8");
}

async function persistAnalysis(userId, payload) {
  const userDirectory = await ensureUserDirectory(userId);
  await writeJsonFile(path.join(userDirectory, "analysis.json"), payload);
}

async function persistOptimizedResume(userId, payload) {
  const userDirectory = await ensureUserDirectory(userId);
  await writeJsonFile(path.join(userDirectory, "optimized-resume.json"), payload);
}

module.exports = {
  ensureBaseStorage,
  ensureUserDirectory,
  getUserDirectory,
  saveResumeDocument,
  persistJobDescription,
  persistAnalysis,
  persistOptimizedResume
};