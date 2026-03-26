import { motion } from "framer-motion";

function ATSScoreRing({ score = 0 }) {
  const radius = 78;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (Math.min(100, Math.max(0, score)) / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="h-52 w-52 -rotate-90" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r={radius} stroke="currentColor" strokeWidth="14" fill="transparent" className="text-slate-200 dark:text-slate-800" />
        <motion.circle
          cx="100"
          cy="100"
          r={radius}
          stroke="url(#scoreGradient)"
          strokeWidth="14"
          strokeLinecap="round"
          fill="transparent"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: progress }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          strokeDasharray={circumference}
          strokeDashoffset={progress}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <div className="font-display text-5xl font-bold text-slate-950 dark:text-white">{score}</div>
        <div className="mt-2 text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">ATS Score</div>
      </div>
    </div>
  );
}

export default ATSScoreRing;
