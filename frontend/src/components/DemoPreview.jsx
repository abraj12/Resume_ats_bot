import { motion } from "framer-motion";
import GlassCard from "./GlassCard";

function DemoPreview() {
  const bars = [92, 74, 65, 88, 58];

  return (
    <GlassCard className="overflow-hidden p-6 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-500">Live Demo</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-slate-950 dark:text-white">From raw resume to shortlisted candidate.</h3>
            </div>
            <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-500">ATS 86%</div>
          </div>

          <div className="mt-8 space-y-4">
            {bars.map((bar, index) => (
              <div key={bar}>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                  <span>{["Keywords", "Formatting", "Impact", "Match", "Readability"][index]}</span>
                  <span>{bar}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-200/70 dark:bg-slate-800/80">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${bar}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.08 }}
                    className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-indigo-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-slate-950 p-6 text-white shadow-2xl">
          <p className="text-sm text-slate-400">Missing keywords</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Kubernetes', 'CI/CD', 'GraphQL', 'Leadership'].map((item) => (
              <span key={item} className="rounded-full bg-white/10 px-3 py-2 text-sm">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-white/5 p-4">
            <p className="text-sm text-slate-400">Improved summary</p>
            <p className="mt-2 text-sm leading-7 text-slate-200">
              Product-minded engineer with measurable delivery outcomes, deep backend systems experience, and strong collaboration across hiring-critical initiatives.
            </p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

export default DemoPreview;
