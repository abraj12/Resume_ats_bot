function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderList(items, className = "") {
  if (!items || items.length === 0) {
    return "";
  }

  return `<ul class="${className}">${items
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("")}</ul>`;
}

function renderContactLine(resume) {
  const fields = [
    resume.email,
    resume.phone,
    resume.location,
    resume.linkedin,
    resume.portfolio
  ].filter(Boolean);

  return fields.map((field) => escapeHtml(field)).join(" | ");
}

module.exports = {
  escapeHtml,
  renderList,
  renderContactLine
};