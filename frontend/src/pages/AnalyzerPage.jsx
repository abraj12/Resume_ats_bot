import SectionTitle from "../components/SectionTitle";
import JobDescriptionInput from "../components/JobDescriptionInput";
import ResumeUpload from "../components/ResumeUpload";
import AnalyzePanel from "../components/AnalyzePanel";

function AnalyzerPage({
  jobDescription,
  onJobDescriptionChange,
  file,
  onFileChange,
  dragActive,
  onDragStateChange,
  onDropFile,
  onAnalyze,
  loading,
  uploadError,
  apiError
}) {
  return (
    <div className="space-y-10 pb-24 pt-10">
      <section className="section-shell">
        <SectionTitle
          eyebrow="Analyzer"
          title="Paste the role, upload the resume, and let the AI do the heavy lifting."
          description="The analyzer accepts a job description and a PDF or DOCX resume, then sends multipart form-data to the backend API for scoring."
        />
      </section>

      <section className="section-shell grid gap-6 xl:grid-cols-[1fr_1fr_0.8fr]">
        <JobDescriptionInput value={jobDescription} onChange={onJobDescriptionChange} />
        <ResumeUpload
          file={file}
          onFileChange={onFileChange}
          dragActive={dragActive}
          onDragStateChange={onDragStateChange}
          onDropFile={onDropFile}
          error={uploadError}
        />
        <AnalyzePanel disabled={!jobDescription.trim() || !file} loading={loading} onAnalyze={onAnalyze} />
      </section>

      {apiError ? (
        <section className="section-shell">
          <div className="rounded-3xl border border-rose-300/40 bg-rose-500/10 px-5 py-4 text-sm text-rose-600 dark:text-rose-300">
            {apiError}
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default AnalyzerPage;
