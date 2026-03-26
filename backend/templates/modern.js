const { escapeHtml, renderList, renderContactLine } = require("../utils/html");

module.exports = function renderModernTemplate(resume) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(resume.full_name || "Resume")}</title>
    <style>
      :root {
        --bg: #f4f7fb;
        --card: #ffffff;
        --primary: #0f4c81;
        --secondary: #1c7c7d;
        --text: #1f2937;
        --muted: #6b7280;
        --line: #d7e0ea;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        background: radial-gradient(circle at top left, #dbeafe 0%, var(--bg) 42%, #eef2ff 100%);
        color: var(--text);
        font-family: "Segoe UI", Arial, sans-serif;
      }
      .page {
        width: 100%;
        max-width: 794px;
        margin: 0 auto;
        background: var(--card);
        min-height: 1123px;
        display: grid;
        grid-template-columns: 240px 1fr;
      }
      .sidebar {
        background: linear-gradient(180deg, var(--primary), #15324d);
        color: white;
        padding: 34px 24px;
      }
      .main {
        padding: 34px 30px;
      }
      h1 {
        margin: 0;
        font-size: 31px;
        line-height: 1.1;
      }
      .headline {
        margin-top: 8px;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        color: #d2e6ff;
      }
      .contact, .tag-list {
        font-size: 12px;
        line-height: 1.8;
      }
      .section-title {
        margin: 24px 0 12px;
        font-size: 12px;
        letter-spacing: 1.8px;
        text-transform: uppercase;
        color: #d8e8ff;
      }
      .main .section-title {
        color: var(--primary);
        border-bottom: 2px solid var(--line);
        padding-bottom: 8px;
      }
      .summary {
        margin-top: 16px;
        line-height: 1.7;
        font-size: 14px;
      }
      .item {
        margin-bottom: 18px;
      }
      .item-header {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        align-items: baseline;
      }
      .item-title {
        font-weight: 700;
        font-size: 16px;
      }
      .item-meta {
        color: var(--muted);
        font-size: 12px;
      }
      ul {
        margin: 8px 0 0 18px;
        padding: 0;
      }
      li {
        margin-bottom: 6px;
        line-height: 1.55;
      }
      .chip {
        display: inline-block;
        margin: 0 6px 6px 0;
        padding: 6px 10px;
        border-radius: 999px;
        background: rgba(255,255,255,0.12);
        border: 1px solid rgba(255,255,255,0.16);
      }
    </style>
  </head>
  <body>
    <main class="page">
      <aside class="sidebar">
        <h1>${escapeHtml(resume.full_name)}</h1>
        <div class="headline">${escapeHtml(resume.headline)}</div>

        <div class="section-title">Contact</div>
        <div class="contact">${renderContactLine(resume)}</div>

        <div class="section-title">Skills</div>
        <div class="tag-list">
          ${resume.skills.map((skill) => `<span class="chip">${escapeHtml(skill)}</span>`).join("")}
        </div>

        ${
          resume.certifications.length
            ? `<div class="section-title">Certifications</div>${renderList(resume.certifications)}`
            : ""
        }
      </aside>

      <section class="main">
        <div class="section-title">Profile</div>
        <div class="summary">${escapeHtml(resume.summary)}</div>

        <div class="section-title">Experience</div>
        ${resume.experience
          .map(
            (item) => `
            <div class="item">
              <div class="item-header">
                <div class="item-title">${escapeHtml(item.role)} | ${escapeHtml(item.company)}</div>
                <div class="item-meta">${escapeHtml(item.period)}</div>
              </div>
              <div class="item-meta">${escapeHtml(item.location)}</div>
              ${renderList(item.achievements)}
            </div>
          `
          )
          .join("")}

        ${
          resume.projects.length
            ? `<div class="section-title">Projects</div>${resume.projects
                .map(
                  (project) => `
                  <div class="item">
                    <div class="item-title">${escapeHtml(project.name)}</div>
                    <div class="summary">${escapeHtml(project.description)}</div>
                    ${project.technologies.length ? `<div class="item-meta">Tech: ${escapeHtml(project.technologies.join(", "))}</div>` : ""}
                    ${renderList(project.highlights)}
                  </div>
                `
                )
                .join("")}`
            : ""
        }

        <div class="section-title">Education</div>
        ${resume.education
          .map(
            (item) => `
            <div class="item">
              <div class="item-header">
                <div class="item-title">${escapeHtml(item.degree)}</div>
                <div class="item-meta">${escapeHtml(item.period)}</div>
              </div>
              <div class="item-meta">${escapeHtml(item.institution)} | ${escapeHtml(item.location)}</div>
              ${renderList(item.details)}
            </div>
          `
          )
          .join("")}
      </section>
    </main>
  </body>
  </html>
  `;
};