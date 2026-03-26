import { MoonStar, Sparkles, SunMedium } from "lucide-react";
import { motion } from "framer-motion";

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      onClick={onToggle}
      className="relative flex h-11 w-24 items-center rounded-full border border-white/20 bg-white/70 px-1 text-slate-700 shadow-soft backdrop-blur dark:bg-slate-900/70 dark:text-slate-100"
      aria-label="Toggle theme"
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute h-9 w-11 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 shadow-glow"
        style={{ left: isDark ? 46 : 4 }}
      />
      <span className="relative z-10 flex flex-1 items-center justify-center">
        <SunMedium className={`h-4 w-4 ${isDark ? "text-slate-400" : "text-white"}`} />
      </span>
      <span className="relative z-10 flex flex-1 items-center justify-center">
        {isDark ? <MoonStar className="h-4 w-4 text-white" /> : <Sparkles className="h-4 w-4 text-slate-400" />}
      </span>
    </motion.button>
  );
}

export default ThemeToggle;
