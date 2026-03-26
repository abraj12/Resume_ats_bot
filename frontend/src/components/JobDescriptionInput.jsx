import { FileText } from "lucide-react";
import GlassCard from "./GlassCard";

function JobDescriptionInput({ value, onChange }) {
  return (
    <GlassCard className="p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="rounded-2xl bg-sky-500/10 p-3 text-sky-500">
          <FileText className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-semibold text-slate-950 dark:text-white">Job Description</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Paste the role details, skills, and expectations.</p>
        </div>
      </div>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={10}
        placeholder="Paste the target job description here..."
        className="w-full rounded-[24px] border border-slate-200/70 bg-white/70 px-4 py-4 text-sm text-slate-700 outline-none ring-0 transition placeholder:text-slate-400 focus:border-sky-400 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100"
      />
    </GlassCard>
  );
}

export default JobDescriptionInput;
