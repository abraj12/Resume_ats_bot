import { Download, ImageDown } from "lucide-react";
import GlassCard from "./GlassCard";

function DownloadSection({ selectedTemplateName, onDownload, downloading }) {
  return (
    <GlassCard className="p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-500">Download</p>
          <h3 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">Generate your upgraded resume</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Selected template: {selectedTemplateName}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            onClick={() => onDownload("pdf")}
            disabled={downloading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-50 dark:bg-white dark:text-slate-950"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </button>
          <button
            onClick={() => onDownload("image")}
            disabled={downloading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300/70 bg-white/70 px-5 py-3 font-semibold text-slate-900 transition hover:-translate-y-0.5 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white"
          >
            <ImageDown className="h-4 w-4" />
            Download Image
          </button>
        </div>
      </div>
    </GlassCard>
  );
}

export default DownloadSection;
