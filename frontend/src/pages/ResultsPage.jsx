import GlassCard from "../components/GlassCard";
import SectionTitle from "../components/SectionTitle";
import ATSScoreRing from "../components/ATSScoreRing";
import KeywordChips from "../components/KeywordChips";
import SuggestionsPanel from "../components/SuggestionsPanel";
import TemplateSelector from "../components/TemplateSelector";
import DownloadSection from "../components/DownloadSection";

function ResultsPage({ result, templates, selectedTemplate, onSelectTemplate, onDownload, downloadAvailable }) {
  const templateName = templates.find((item) => item.id === selectedTemplate)?.name || "Professional";

  return (
    <div className="space-y-10 pb-24 pt-10">
      <section className="section-shell">
        <SectionTitle
          eyebrow="Results"
          title="A premium analysis surface for clear decisions and faster resume upgrades."
          description="Review ATS score, keyword gaps, improvement guidance, and template choices in one polished workspace."
        />
      </section>

      <section className="section-shell grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
        <GlassCard className="flex flex-col items-center justify-center bg-gray-800 p-8 shadow-lg">
          <ATSScoreRing score={result.ats_score} />
          <p className="mt-6 text-center text-sm leading-7 text-gray-400">
            Your resume fit is evaluated against the provided job description and surfaced as an ATS-friendly score.
          </p>
        </GlassCard>

        <GlassCard className="bg-gray-800 p-6 shadow-lg sm:p-8">
          <div className="grid gap-8 md:grid-cols-2">
            <KeywordChips title="Missing Keywords" items={result.missing_keywords} />
            <SuggestionsPanel title="AI Suggestions" suggestions={result.suggestions} />
          </div>
          <div className="mt-8 rounded-[24px] border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-400">Improved Summary</p>
            <p className="mt-4 text-sm leading-8 text-gray-300">{result.improved_summary}</p>
          </div>
          <div className="mt-8">
            <SuggestionsPanel title="Skill Gap Analysis" suggestions={result.skill_gap_analysis} />
          </div>
        </GlassCard>
      </section>

      <section className="section-shell space-y-6">
        <SectionTitle
          eyebrow="Templates"
          title="Choose the visual direction for your upgraded resume."
          description="Professional for trusted clarity, Modern for standout polish, and Minimal for elegant simplicity."
        />
        <TemplateSelector templates={templates} selectedTemplate={selectedTemplate} onSelect={onSelectTemplate} />
      </section>

      <section className="section-shell">
        <DownloadSection selectedTemplateName={templateName} onDownload={onDownload} downloadAvailable={downloadAvailable} />
      </section>
    </div>
  );
}

export default ResultsPage;
