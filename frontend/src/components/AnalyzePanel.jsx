import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";

function AnalyzePanel({ disabled, loading, onAnalyze }) {
  return (
    <GlassCard className="p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-500">Analyze</p>
      <h3 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">See the ATS story before the recruiter does.</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
        We compare your resume against the target role, surface missing keywords, and package the insights into an actionable result view.
      </p>

      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        disabled={disabled || loading}
        onClick={onAnalyze}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-400 to-indigo-500 px-5 py-4 font-semibold text-white shadow-glow transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? <Sparkles className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
        {loading ? "Analyzing Resume..." : "Analyze Resume"}
      </motion.button>
    </GlassCard>
  );
}

export default AnalyzePanel;
