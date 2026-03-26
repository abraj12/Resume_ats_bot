const fs = require("fs/promises");

async function downloadTelegramFile(fileUrl, destinationPath) {
  const response = await fetch(fileUrl);

  if (!response.ok) {
    throw new Error(`Failed to download Telegram file. Status: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  await fs.writeFile(destinationPath, Buffer.from(arrayBuffer));
}

function sanitizeFileName(fileName) {
  return fileName.replace(/[<>:"/\\|?*]+/g, "_");
}

async function writeJsonFile(filePath, payload) {
  await fs.writeFile(filePath, JSON.stringify(payload, null, 2), "utf8");
}

module.exports = {
  downloadTelegramFile,
  sanitizeFileName,
  writeJsonFile
};