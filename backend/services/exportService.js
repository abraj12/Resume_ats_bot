const fs = require("fs/promises");
const path = require("path");
const puppeteer = require("puppeteer");
const { getTemplateRenderer } = require("./templateService");
const { getUserDirectory } = require("./storageService");
const { ENABLE_JPG_EXPORT } = require("../utils/env");

async function exportResumeFiles({ userId, templateId, resumeData }) {
  const userDirectory = getUserDirectory(userId);
  await fs.mkdir(userDirectory, { recursive: true });

  const renderer = getTemplateRenderer(templateId);
  const html = renderer(resumeData);

  const pdfPath = path.join(userDirectory, `${templateId}-resume.pdf`);
  const jpgPath = ENABLE_JPG_EXPORT ? path.join(userDirectory, `${templateId}-resume.jpg`) : null;

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 2000, deviceScaleFactor: 2 });
    await page.setContent(html, { waitUntil: "networkidle0" });

    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: {
        top: "12mm",
        right: "10mm",
        bottom: "12mm",
        left: "10mm"
      }
    });

    if (jpgPath) {
      await page.screenshot({
        path: jpgPath,
        type: "jpeg",
        quality: 90,
        fullPage: true
      });
    }
  } finally {
    await browser.close();
  }

  return {
    pdfPath,
    pdfName: `${templateId}-resume.pdf`,
    jpgPath
  };
}

module.exports = {
  exportResumeFiles
};