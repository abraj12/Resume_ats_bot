const { STEPS } = require("./constants");

function createSessionState() {
  return {
    step: STEPS.AWAITING_JOB_DESCRIPTION,
    jobDescription: "",
    resume: null,
    analysis: null,
    selectedTemplate: null,
    optimizedResume: null
  };
}

module.exports = {
  createSessionState
};