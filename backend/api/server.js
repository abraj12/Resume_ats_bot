const path = require("path");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { parseResumeBuffer } = require("../services/resumeParserService");
const { analyzeResumeAgainstJob, buildOptimizedResume } = require("../services/resumeAiService");
const { exportResumeFiles } = require("../services/exportService");
const {
  ensureUserDirectory,
  persistAnalysis,
  persistJobDescription,
  persistOptimizedResume
} = require("../services/storageService");
const { FRONTEND_URL } = require("../utils/env");
const logger = require("../utils/logger");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});

function createApiServer() {
  const app = express();
  const allowedOrigins = FRONTEND_URL.split(",").map((origin) => origin.trim()).filter(Boolean);

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
          return;
        }

        callback(new Error(`Origin not allowed by CORS: ${origin}`));
      }
    })
  );
  app.use(express.json({ limit: "2mb" }));

  app.get("/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.post("/analyze", upload.single("file"), async (req, res) => {
    try {
      const jobDescription = String(req.body?.jobDescription || "").trim();
      const file = req.file;

      logger.info("POST /analyze request received", {
        hasJobDescription: Boolean(jobDescription),
        fileName: file?.originalname || null,
        fileSize: file?.size || 0,
        contentType: req.headers["content-type"] || null
      });

      if (!jobDescription) {
        return res.status(400).json({ error: "Job description is required." });
      }

      if (!file) {
        return res.status(400).json({ error: "No file uploaded." });
      }

      const extension = path.extname(file.originalname || "").toLowerCase();

      if (![".pdf", ".docx"].includes(extension)) {
        return res.status(400).json({ error: "Only PDF and DOCX resumes are supported." });
      }

      const userId = `web-${Date.now()}`;
      await ensureUserDirectory(userId);

      const resumeText = await parseResumeBuffer(file.buffer, extension);
      const analysis = await analyzeResumeAgainstJob({
        jobDescription,
        resumeText
      });
      const optimizedResume = await buildOptimizedResume({
        jobDescription,
        resumeText,
        analysis
      });

      await persistJobDescription(userId, jobDescription);
      await persistAnalysis(userId, { analysis, jobDescription, resumeText });
      await persistOptimizedResume(userId, { optimizedResume });

      return res.json({
        success: true,
        data: {
          ...analysis,
          optimized_resume: optimizedResume,
          metadata: {
            template_ids: ["professional", "modern", "minimal"],
            user_id: userId
          }
        }
      });
    } catch (error) {
      logger.error("HTTP analyze failed", error);
      return res.status(500).json({ error: "Server error" });
    }
  });

  app.post("/download/:format", async (req, res) => {
    const format = String(req.params.format || "").toLowerCase();
    const templateId = String(req.body?.template || "professional").toLowerCase();
    const optimizedResume = req.body?.optimizedResume || req.body?.optimized_resume;
    const userId = String(req.body?.userId || req.body?.user_id || `web-${Date.now()}`);

    logger.info("POST /download request received", { format, templateId, userId });

    if (!["pdf", "image"].includes(format)) {
      return res.status(400).json({ error: "Unsupported download format." });
    }

    if (!optimizedResume || typeof optimizedResume !== "object") {
      return res.status(400).json({ error: "optimizedResume payload is required." });
    }

    try {
      const generatedFiles = await exportResumeFiles({
        userId,
        templateId,
        resumeData: optimizedResume
      });

      if (format === "pdf") {
        return res.download(generatedFiles.pdfPath, generatedFiles.pdfName);
      }

      if (!generatedFiles.jpgPath) {
        return res.status(400).json({ error: "Image export is disabled on the server." });
      }

      return res.download(generatedFiles.jpgPath, `${templateId}-resume.jpg`);
    } catch (error) {
      logger.error("HTTP download failed", error);
      return res.status(500).json({ error: "Failed to generate export." });
    }
  });

  app.use((error, _req, res, _next) => {
    if (error instanceof multer.MulterError) {
      logger.error("Upload middleware failed", error);
      return res.status(400).json({ error: error.message });
    }

    if (error?.message?.startsWith("Origin not allowed by CORS")) {
      logger.error("CORS rejected request", error);
      return res.status(403).json({ error: error.message });
    }

    logger.error("Unhandled API error", error);
    return res.status(500).json({ error: "Unexpected server error." });
  });

  return app;
}

module.exports = {
  createApiServer
};
