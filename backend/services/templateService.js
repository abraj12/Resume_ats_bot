const modernTemplate = require("../templates/modern");
const professionalTemplate = require("../templates/professional");
const minimalTemplate = require("../templates/minimal");

const templateMap = {
  modern: modernTemplate,
  professional: professionalTemplate,
  minimal: minimalTemplate
};

function getTemplateRenderer(templateId) {
  const renderer = templateMap[templateId];

  if (!renderer) {
    throw new Error(`Unknown template: ${templateId}`);
  }

  return renderer;
}

module.exports = {
  getTemplateRenderer
};