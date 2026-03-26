const OpenAI = require("openai");
const { GROQ_API_KEY, GROQ_MODEL, GROQ_BASE_URL } = require("../utils/env");

const openai = new OpenAI({
  apiKey: GROQ_API_KEY,
  baseURL: GROQ_BASE_URL
});

async function analyzeResumeAgainstJob({ jobDescription, resumeText }) {
  const response = await openai.chat.completions.create({
    model: GROQ_MODEL,
    response_format: { type: "json_object" },
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content: [
          "You are an expert ATS resume reviewer.",
          "Compare the resume against the job description.",
          "Return valid JSON only.",
          "Use this schema:",
          "{",
          '  "ats_score": number,',
          '  "missing_keywords": string[],',
          '  "skill_gap_analysis": string[],',
          '  "suggestions": string[],',
          '  "improved_summary": string',
          "}",
          "Keep ats_score between 0 and 100."
        ].join("\n")
      },
      {
        role: "user",
        content: [
          "Job Description:",
          jobDescription,
          "",
          "Resume:",
          resumeText
        ].join("\n")
      }
    ]
  });

  return normalizeAnalysisJson(response.choices[0].message.content);
}

async function buildOptimizedResume({ jobDescription, resumeText, analysis }) {
  const response = await openai.chat.completions.create({
    model: GROQ_MODEL,
    response_format: { type: "json_object" },
    temperature: 0.4,
    messages: [
      {
        role: "system",
        content: [
          "You are a senior resume writer.",
          "Rewrite the candidate's resume for the target job without inventing work history or credentials.",
          "Preserve factual information from the source resume.",
          "Improve wording, keyword targeting, bullet clarity, and summary quality.",
          "Return valid JSON only using this schema:",
          "{",
          '  "full_name": string,',
          '  "headline": string,',
          '  "email": string,',
          '  "phone": string,',
          '  "location": string,',
          '  "linkedin": string,',
          '  "portfolio": string,',
          '  "summary": string,',
          '  "skills": string[],',
          '  "experience": [{"company": string, "role": string, "location": string, "period": string, "achievements": string[]}],',
          '  "education": [{"institution": string, "degree": string, "location": string, "period": string, "details": string[]}],',
          '  "projects": [{"name": string, "description": string, "technologies": string[], "highlights": string[]}],',
          '  "certifications": string[]',
          "}",
          "Use empty strings or empty arrays when data is missing."
        ].join("\n")
      },
      {
        role: "user",
        content: [
          "Target Job Description:",
          jobDescription,
          "",
          "Current Resume:",
          resumeText,
          "",
          "ATS Analysis:",
          JSON.stringify(analysis, null, 2)
        ].join("\n")
      }
    ]
  });

  return normalizeResumeJson(response.choices[0].message.content);
}

function normalizeAnalysisJson(content) {
  const parsed = JSON.parse(stripCodeFence(content));

  return {
    ats_score: clampScore(parsed.ats_score),
    missing_keywords: safeArray(parsed.missing_keywords),
    skill_gap_analysis: safeArray(parsed.skill_gap_analysis),
    suggestions: safeArray(parsed.suggestions),
    improved_summary: String(parsed.improved_summary || "").trim()
  };
}

function normalizeResumeJson(content) {
  const parsed = JSON.parse(stripCodeFence(content));

  return {
    full_name: String(parsed.full_name || "").trim(),
    headline: String(parsed.headline || "").trim(),
    email: String(parsed.email || "").trim(),
    phone: String(parsed.phone || "").trim(),
    location: String(parsed.location || "").trim(),
    linkedin: String(parsed.linkedin || "").trim(),
    portfolio: String(parsed.portfolio || "").trim(),
    summary: String(parsed.summary || "").trim(),
    skills: safeArray(parsed.skills),
    experience: safeRecordArray(parsed.experience, ["company", "role", "location", "period"], "achievements"),
    education: safeRecordArray(parsed.education, ["institution", "degree", "location", "period"], "details"),
    projects: safeProjectArray(parsed.projects),
    certifications: safeArray(parsed.certifications)
  };
}

function safeArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => String(item || "").trim()).filter(Boolean);
}

function safeRecordArray(value, keys, listKey) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => {
    const record = {};

    for (const key of keys) {
      record[key] = String(item?.[key] || "").trim();
    }

    record[listKey] = safeArray(item?.[listKey]);
    return record;
  });
}

function safeProjectArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => ({
    name: String(item?.name || "").trim(),
    description: String(item?.description || "").trim(),
    technologies: safeArray(item?.technologies),
    highlights: safeArray(item?.highlights)
  }));
}

function stripCodeFence(content) {
  return String(content || "")
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

function clampScore(score) {
  const numericScore = Number(score);

  if (Number.isNaN(numericScore)) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round(numericScore)));
}

module.exports = {
  analyzeResumeAgainstJob,
  buildOptimizedResume
};
