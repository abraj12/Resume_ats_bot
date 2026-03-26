const fs = require("fs/promises");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

async function parseResumeFile(filePath, extension) {
  if (extension === ".pdf") {
    return extractTextFromPdf(filePath);
  }

  if (extension === ".docx") {
    return extractTextFromDocx(filePath);
  }

  throw new Error("Unsupported resume format.");
}

async function parseResumeBuffer(buffer, extension) {
  if (extension === ".pdf") {
    return extractTextFromPdfBuffer(buffer);
  }

  if (extension === ".docx") {
    return extractTextFromDocxBuffer(buffer);
  }

  throw new Error("Unsupported resume format.");
}

async function extractTextFromPdf(filePath) {
  const buffer = await fs.readFile(filePath);
  return extractTextFromPdfBuffer(buffer);
}

async function extractTextFromDocx(filePath) {
  const buffer = await fs.readFile(filePath);
  return extractTextFromDocxBuffer(buffer);
}

async function extractTextFromPdfBuffer(buffer) {
  const parsed = await pdfParse(buffer);
  return normalizeText(parsed.text);
}

async function extractTextFromDocxBuffer(buffer) {
  const parsed = await mammoth.extractRawText({ buffer });
  return normalizeText(parsed.value);
}

function normalizeText(text) {
  return text
    .replace(/\r/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

module.exports = {
  parseResumeBuffer,
  parseResumeFile
};
