const { escapeHtml, renderList, renderContactLine } = require("../utils/html");

module.exports = function renderMinimalTemplate(resume) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(resume.full_name || "Resume")}</title>
    <style>
      :root {
        --text: #111827;
        --muted: #6b7280;
        --line: #e5e7eb;
        --accent: #0f766e;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: Arial, sans-serif;
        background: linear-gradient(180deg, #f8fafc, #eef6f5);
        color: var(--text);
      }
      .page {
        max-width: 794px;
        min-height: 1123px;
        margin: 0 auto;
        background: white;
        padding: 42px;
      }
      h1 {
        margin: 0;
        font-size: 30px;
      }
      .headline {
        margin-top: 6px;
        color: var(--accent);
        font-size: 14px;
        font-weight: 700;
      }
      .contact {
        margin-top: 10px;
        color: var(--muted);
        font-size: 13px;
      }
      .grid {
        display: grid;
        grid-template-columns: 1fr 220px;
        gap: 28px;
        margin-top: 24px;
      }
      h2 {
        font-size: 13px;
        letter-spacing: 1.3px;
        text-transform: uppercase;
        color: var(--accent);
        margin: 0 0 10px;
      }
      .section {
        margin-bottom: 24px;
      }
      .item {
        margin-bottom: 18px;
      }
      .row {
        display: flex;
        justify-content: space-between;
        gap: 12px;
      }
      .title {
        font-weight: 700;
      }
      .meta {
        color: var(--muted);
        font-size: 12px;
      }
      p, li {
        font-size: 14px;
        line-height: 1.6;
      }
      ul {
        margin: 8px 0 0 18px;
        padding: 0;
      }
      .sidebar {
        border-left: 1px solid var(--line);
        padding-left: 20px;
      }
      .skills-list span {
        display: block;
        padding: 6px 0;
        border-bottom: 1px solid var(--line);
        font-size: 13px;
      }
    </style>
  </head>
  <body>
    <main class="page">
      <header>
        <h1>${escapeHtml(resume.full_name)}</h1>
        <div class="headline">${escapeHtml(resume.headline)}</div>
        <div class="contact">${renderContactLine(resume)}</div>
      </header>

      <section class="section">
        <h2>Summary</h2>
        <p>${escapeHtml(resume.summary)}</p>
      </section>

      <div class="grid">
        <section>
          <div class="section">
            <h2>Experience</h2>
            ${resume.experience
              .map(
                (item) => `
                <div class="item">
                  <div class="row">
                    <div class="title">${escapeHtml(item.role)}</div>
                    <div class="meta">${escapeHtml(item.period)}</div>
                  </div>
                  <div class="meta">${escapeHtml(item.company)} | ${escapeHtml(item.location)}</div>
                  ${renderList(item.achievements)}
                </div>
              `
              )
              .join("")}
          </div>

          ${
            resume.projects.length
              ? `<div class="section">
                  <h2>Projects</h2>
                  ${resume.projects
                    .map(
                      (project) => `
                      <div class="item">
                        <div class="title">${escapeHtml(project.name)}</div>
                        <p>${escapeHtml(project.description)}</p>
                        ${project.technologies.length ? `<div class="meta">${escapeHtml(project.technologies.join(" • "))}</div>` : ""}
                        ${renderList(project.highlights)}
                      </div>
                    `
                    )
                    .join("")}
                </div>`
              : ""
          }
        </section>

        <aside class="sidebar">
          <div class="section">
            <h2>Skills</h2>
            <div class="skills-list">
              ${resume.skills.map((skill) => `<span>${escapeHtml(skill)}</span>`).join("")}
            </div>
          </div>

          <div class="section">
            <h2>Education</h2>
            ${resume.education
              .map(
                (item) => `
                <div class="item">
                  <div class="title">${escapeHtml(item.degree)}</div>
                  <div class="meta">${escapeHtml(item.institution)}</div>
                  <div class="meta">${escapeHtml(item.period)}</div>
                  ${renderList(item.details)}
                </div>
              `
              )
              .join("")}
          </div>

          ${
            resume.certifications.length
              ? `<div class="section"><h2>Certifications</h2>${renderList(resume.certifications)}</div>`
              : ""
          }
        </aside>
      </div>
    </main>
  </body>
  </html>
  `;
};