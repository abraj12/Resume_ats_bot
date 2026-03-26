import { Download, ImageDown } from "lucide-react";
import GlassCard from "./GlassCard";

function DownloadSection({ selectedTemplateName, onDownload, downloadAvailable }) {
  return (
    <GlassCard className="bg-gray-800 p-6 shadow-lg">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-400">Download</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">Generate your upgraded resume</h3>
          <p className="mt-2 text-sm text-gray-400">Selected template: {selectedTemplateName}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            onClick={() => onDownload("pdf")}
            disabled={!downloadAvailable}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </button>
          <button
            onClick={() => onDownload("image")}
            disabled={!downloadAvailable}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 font-semibold text-white transition hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
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
