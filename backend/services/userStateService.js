const { STEPS } = require("../utils/constants");

function resetUserSession(session) {
  session.step = STEPS.AWAITING_JOB_DESCRIPTION;
  session.jobDescription = "";
  session.resume = null;
  session.analysis = null;
  session.selectedTemplate = null;
  session.optimizedResume = null;
}

function updateUserProgress(session, step) {
  session.step = step;
}

function storeJobDescription(session, jobDescription) {
  session.jobDescription = jobDescription;
}

function storeResumePayload(session, resume) {
  session.resume = {
    ...(session.resume || {}),
    ...resume
  };
}

function storeAnalysisResult(session, analysis) {
  session.analysis = analysis;
}

function storeSelectedTemplate(session, templateId) {
  session.selectedTemplate = templateId;
}

function storeOptimizedResume(session, optimizedResume) {
  session.optimizedResume = optimizedResume;
}

module.exports = {
  resetUserSession,
  updateUserProgress,
  storeJobDescription,
  storeResumePayload,
  storeAnalysisResult,
  storeSelectedTemplate,
  storeOptimizedResume
};