const { escapeHtml, renderList, renderContactLine } = require("../utils/html");

module.exports = function renderProfessionalTemplate(resume) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(resume.full_name || "Resume")}</title>
    <style>
      :root {
        --ink: #1b1b1b;
        --muted: #5e6472;
        --accent: #7c4f35;
        --line: #d8d4cf;
        --paper: #fffdf9;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        background: linear-gradient(180deg, #efe7dc, #f8f4ef 32%, #ece8e1 100%);
        font-family: Georgia, "Times New Roman", serif;
        color: var(--ink);
      }
      .page {
        max-width: 794px;
        margin: 0 auto;
        min-height: 1123px;
        background: var(--paper);
        padding: 40px 44px;
      }
      .header {
        border-bottom: 3px solid var(--accent);
        padding-bottom: 14px;
        margin-bottom: 22px;
      }
      h1 {
        margin: 0;
        font-size: 34px;
        letter-spacing: 0.5px;
      }
      .headline {
        margin-top: 6px;
        font-size: 15px;
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 1.1px;
      }
      .contact {
        margin-top: 12px;
        color: var(--muted);
        font-size: 13px;
      }
      .section {
        margin-top: 24px;
      }
      .section h2 {
        font-size: 15px;
        margin: 0 0 10px;
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 1.4px;
      }
      .section p, li, .meta {
        font-size: 14px;
        line-height: 1.65;
      }
      .item {
        margin-bottom: 18px;
      }
      .item-top {
        display: flex;
        justify-content: space-between;
        gap: 12px;
      }
      .title {
        font-weight: 700;
      }
      .meta {
        color: var(--muted);
      }
      ul {
        margin: 8px 0 0 18px;
        padding: 0;
      }
      .skills {
        border: 1px solid var(--line);
        padding: 12px 14px;
        background: #f7f1ea;
      }
    </style>
  </head>
  <body>
    <main class="page">
      <header class="header">
        <h1>${escapeHtml(resume.full_name)}</h1>
        <div class="headline">${escapeHtml(resume.headline)}</div>
        <div class="contact">${renderContactLine(resume)}</div>
      </header>

      <section class="section">
        <h2>Executive Summary</h2>
        <p>${escapeHtml(resume.summary)}</p>
      </section>

      <section class="section">
        <h2>Core Skills</h2>
        <div class="skills">${escapeHtml(resume.skills.join(" | "))}</div>
      </section>

      <section class="section">
        <h2>Professional Experience</h2>
        ${resume.experience
          .map(
            (item) => `
            <div class="item">
              <div class="item-top">
                <div class="title">${escapeHtml(item.role)} | ${escapeHtml(item.company)}</div>
                <div class="meta">${escapeHtml(item.period)}</div>
              </div>
              <div class="meta">${escapeHtml(item.location)}</div>
              ${renderList(item.achievements)}
            </div>
          `
          )
          .join("")}
      </section>

      ${
        resume.projects.length
          ? `<section class="section">
              <h2>Selected Projects</h2>
              ${resume.projects
                .map(
                  (project) => `
                  <div class="item">
                    <div class="title">${escapeHtml(project.name)}</div>
                    <p>${escapeHtml(project.description)}</p>
                    ${project.technologies.length ? `<div class="meta">Technologies: ${escapeHtml(project.technologies.join(", "))}</div>` : ""}
                    ${renderList(project.highlights)}
                  </div>
                `
                )
                .join("")}
            </section>`
          : ""
      }

      <section class="section">
        <h2>Education</h2>
        ${resume.education
          .map(
            (item) => `
            <div class="item">
              <div class="item-top">
                <div class="title">${escapeHtml(item.degree)}</div>
                <div class="meta">${escapeHtml(item.period)}</div>
              </div>
              <div class="meta">${escapeHtml(item.institution)} | ${escapeHtml(item.location)}</div>
              ${renderList(item.details)}
            </div>
          `
          )
          .join("")}
      </section>

      ${
        resume.certifications.length
          ? `<section class="section"><h2>Certifications</h2>${renderList(resume.certifications)}</section>`
          : ""
      }
    </main>
  </body>
  </html>
  `;
};