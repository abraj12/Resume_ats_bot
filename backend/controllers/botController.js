const {
  resetUserSession,
  updateUserProgress,
  storeJobDescription,
  storeResumePayload,
  storeAnalysisResult,
  storeOptimizedResume,
  storeSelectedTemplate
} = require("../services/userStateService");
const {
  saveResumeDocument,
  ensureUserDirectory,
  persistJobDescription,
  persistAnalysis,
  persistOptimizedResume
} = require("../services/storageService");
const { parseResumeFile } = require("../services/resumeParserService");
const {
  analyzeResumeAgainstJob,
  buildOptimizedResume
} = require("../services/resumeAiService");
const {
  getTemplateKeyboard,
  getRestartKeyboard,
  formatAnalysisMessage
} = require("../utils/telegram");
const { exportResumeFiles } = require("../services/exportService");
const { STEPS, TEMPLATE_IDS } = require("../utils/constants");
const logger = require("../utils/logger");

function registerHandlers(bot) {
  bot.start(handleStart);
  bot.command("reset", handleReset);
  bot.command("help", handleHelp);
  bot.on("text", handleTextMessage);
  bot.on("document", handleDocumentUpload);
  bot.action(/^template:(modern|professional|minimal)$/, handleTemplateSelection);
  bot.action("restart", handleResetAction);
}

async function handleStart(ctx) {
  resetUserSession(ctx.session);
  await ensureUserDirectory(ctx.from.id);

  await ctx.reply(
    [
      "Welcome to the Resume Optimizer Bot.",
      "",
      "Step 1: Send the full job description as a text message.",
      "Step 2: Upload your resume as a PDF or DOCX file.",
      "Step 3: Review the ATS analysis and choose a resume template."
    ].join("\n")
  );
}

async function handleReset(ctx) {
  resetUserSession(ctx.session);
  await ensureUserDirectory(ctx.from.id);
  await ctx.reply(
    "Your session has been reset. Please send a new job description to begin."
  );
}

async function handleResetAction(ctx) {
  await ctx.answerCbQuery();
  return handleReset(ctx);
}

async function handleHelp(ctx) {
  await ctx.reply(
    [
      "How to use this bot:",
      "1. Send a job description as plain text.",
      "2. Upload your resume in PDF or DOCX format.",
      "3. Review the ATS analysis.",
      "4. Pick a template to receive an optimized resume PDF.",
      "",
      "Commands:",
      "/start - Start a new session",
      "/reset - Clear current session",
      "/help - Show help"
    ].join("\n")
  );
}

async function handleTextMessage(ctx) {
  const messageText = ctx.message.text.trim();

  if (messageText.startsWith("/")) {
    return;
  }

  storeJobDescription(ctx.session, messageText);
  updateUserProgress(ctx.session, STEPS.AWAITING_RESUME);
  await persistJobDescription(ctx.from.id, messageText);

  await ctx.reply(
    "Job description saved. Now upload your resume as a PDF or DOCX file."
  );
}

async function handleDocumentUpload(ctx) {
  const { session } = ctx;

  if (!session.jobDescription) {
    await ctx.reply("Please send the job description first, then upload your resume.");
    return;
  }

  const document = ctx.message.document;

  if (!isSupportedResume(document)) {
    await ctx.reply("Please upload a resume in PDF or DOCX format.");
    return;
  }

  const loadingMessage = await ctx.reply("Analyzing resume...");

  try {
    const savedResume = await saveResumeDocument(ctx.telegram, ctx.from.id, document);
    storeResumePayload(session, savedResume);

    const extractedText = await parseResumeFile(savedResume.filePath, savedResume.extension);
    storeResumePayload(session, { ...savedResume, text: extractedText });

    const analysis = await analyzeResumeAgainstJob({
      jobDescription: session.jobDescription,
      resumeText: extractedText
    });

    storeAnalysisResult(session, analysis);
    updateUserProgress(session, STEPS.AWAITING_TEMPLATE);
    await persistAnalysis(ctx.from.id, {
      analysis,
      resume: session.resume,
      jobDescription: session.jobDescription
    });

    await ctx.telegram.editMessageText(
      ctx.chat.id,
      loadingMessage.message_id,
      undefined,
      formatAnalysisMessage(analysis),
      {
        parse_mode: "Markdown",
        ...getTemplateKeyboard()
      }
    );
  } catch (error) {
    logger.error("Failed to analyze resume", error);
    await safeEditLoadingMessage(ctx, loadingMessage.message_id, "I could not process that resume. Please upload a valid PDF or DOCX and try again.");
  }
}

async function handleTemplateSelection(ctx) {
  await ctx.answerCbQuery("Generating your resume...");

  const templateId = ctx.match[1];
  const { session } = ctx;

  if (!session.resume?.text || !session.analysis || !session.jobDescription) {
    await ctx.reply("I need a job description and resume analysis before generating a template. Send /start to begin again.");
    return;
  }

  storeSelectedTemplate(session, templateId);

  const loadingMessage = await ctx.reply("Generating optimized resume...");

  try {
    const optimizedResume = await buildOptimizedResume({
      jobDescription: session.jobDescription,
      resumeText: session.resume.text,
      analysis: session.analysis
    });

    storeOptimizedResume(session, optimizedResume);
    await persistOptimizedResume(ctx.from.id, {
      templateId,
      optimizedResume
    });

    const generatedFiles = await exportResumeFiles({
      userId: ctx.from.id,
      templateId,
      resumeData: optimizedResume
    });

    await safeEditLoadingMessage(
      ctx,
      loadingMessage.message_id,
      `Your ${TEMPLATE_IDS[templateId].label} resume is ready.`
    );

    await ctx.replyWithDocument({
      source: generatedFiles.pdfPath,
      filename: generatedFiles.pdfName
    });

    if (generatedFiles.jpgPath) {
      await ctx.replyWithPhoto({
        source: generatedFiles.jpgPath
      });
    }

    await ctx.reply(
      "You can pick another template anytime or send /reset to start over.",
      getTemplateKeyboard(getRestartKeyboard())
    );
  } catch (error) {
    logger.error("Failed to generate optimized resume", error);
    await safeEditLoadingMessage(
      ctx,
      loadingMessage.message_id,
      "I ran into a problem while generating the optimized resume. Please try again."
    );
  }
}

function isSupportedResume(document) {
  const fileName = document.file_name?.toLowerCase() || "";
  return fileName.endsWith(".pdf") || fileName.endsWith(".docx");
}

async function safeEditLoadingMessage(ctx, messageId, text) {
  try {
    await ctx.telegram.editMessageText(ctx.chat.id, messageId, undefined, text);
  } catch (error) {
    await ctx.reply(text).catch(() => {});
  }
}

module.exports = {
  registerHandlers
};