const { Markup } = require("telegraf");

function getTemplateKeyboard(extraKeyboard) {
  const baseButtons = [
    [
      Markup.button.callback("Modern", "template:modern"),
      Markup.button.callback("Professional", "template:professional"),
      Markup.button.callback("Minimal", "template:minimal")
    ]
  ];

  if (extraKeyboard?.reply_markup?.inline_keyboard) {
    baseButtons.push(...extraKeyboard.reply_markup.inline_keyboard);
  }

  return Markup.inlineKeyboard(baseButtons);
}

function getRestartKeyboard() {
  return Markup.inlineKeyboard([
    [Markup.button.callback("Start Over", "restart")]
  ]);
}

function formatAnalysisMessage(analysis) {
  const keywordLine = analysis.missing_keywords.length
    ? analysis.missing_keywords.map((keyword) => `• ${escapeMarkdown(keyword)}`).join("\n")
    : "• No major keyword gaps found";

  const gapLine = analysis.skill_gap_analysis.length
    ? analysis.skill_gap_analysis.map((gap) => `• ${escapeMarkdown(gap)}`).join("\n")
    : "• No obvious skill gaps found";

  const suggestionLine = analysis.suggestions.length
    ? analysis.suggestions.map((suggestion) => `• ${escapeMarkdown(suggestion)}`).join("\n")
    : "• No additional suggestions";

  return [
    `*ATS Score:* ${analysis.ats_score}/100`,
    "",
    "*Missing Keywords*",
    keywordLine,
    "",
    "*Skill Gap Analysis*",
    gapLine,
    "",
    "*Suggestions*",
    suggestionLine,
    "",
    "*Improved Summary*",
    escapeMarkdown(analysis.improved_summary || "Not available"),
    "",
    "Select a template to generate an optimized resume:"
  ].join("\n");
}

function escapeMarkdown(value) {
  return String(value || "").replace(/([_*\[\]()~`>#+\-=|{}.!])/g, "\\$1");
}

module.exports = {
  getTemplateKeyboard,
  getRestartKeyboard,
  formatAnalysisMessage
};