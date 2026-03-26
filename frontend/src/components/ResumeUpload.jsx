import { FileUp, FileText, ShieldCheck } from "lucide-react";
import GlassCard from "./GlassCard";

function ResumeUpload({ file, onFileChange, dragActive, onDragStateChange, onDropFile, error }) {
  const handleDrop = (event) => {
    event.preventDefault();
    onDragStateChange(false);
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      onDropFile(droppedFile);
    }
  };

  return (
    <GlassCard className="p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="rounded-2xl bg-indigo-500/10 p-3 text-indigo-500">
          <FileUp className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-semibold text-slate-950 dark:text-white">Resume Upload</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Drop a PDF or DOCX file and let AI inspect the fit.</p>
        </div>
      </div>

      <label
        onDragOver={(event) => {
          event.preventDefault();
          onDragStateChange(true);
        }}
        onDragLeave={() => onDragStateChange(false)}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-[28px] border border-dashed px-6 py-10 text-center transition ${
          dragActive
            ? "border-sky-500 bg-sky-500/10"
            : "border-slate-300/70 bg-white/55 hover:border-sky-400 dark:border-slate-700 dark:bg-slate-950/40"
        }`}
      >
        <div className="mb-4 flex items-center gap-3 text-slate-500 dark:text-slate-400">
          <FileText className="h-5 w-5" />
          <ShieldCheck className="h-5 w-5" />
        </div>
        <p className="font-semibold text-slate-900 dark:text-white">Drag and drop your resume</p>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Supports PDF and DOCX up to 10MB</p>
        <span className="mt-5 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-slate-900">Choose File</span>
        <input
          type="file"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="hidden"
          onChange={(event) => onFileChange(event.target.files?.[0] || null)}
        />
      </label>

      <div className="mt-4 min-h-6 text-sm">
        {file ? <p className="text-emerald-500">Selected: {file.name}</p> : <p className="text-slate-500 dark:text-slate-400">No file selected yet.</p>}
        {error ? <p className="mt-2 text-rose-500">{error}</p> : null}
      </div>
    </GlassCard>
  );
}

export default ResumeUpload;
