import { Github, Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

function Navbar({ theme, onToggleTheme, onNavigate, activeView }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-white/55 backdrop-blur-xl dark:bg-slate-950/45">
      <div className="section-shell flex items-center justify-between py-4">
        <button onClick={() => onNavigate("landing")} className="flex items-center gap-3 text-left">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 text-white shadow-glow">
            <Sparkles className="h-5 w-5" />
          </span>
          <span>
            <span className="block font-display text-lg font-bold">AI Resume Analyzer</span>
            <span className="block text-sm text-slate-500 dark:text-slate-400">Startup-grade ATS copilot</span>
          </span>
        </button>

        <nav className="hidden items-center gap-6 md:flex">
          {[
            ["Landing", "landing"],
            ["Analyzer", "analyzer"],
            ["Results", "results"]
          ].map(([label, key]) => (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className={`text-sm font-medium transition ${activeView === key ? "text-sky-500" : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"}`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full border border-white/10 bg-white/70 p-3 text-slate-700 shadow-soft transition hover:-translate-y-0.5 hover:text-sky-500 dark:bg-slate-900/70 dark:text-slate-100 sm:block"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
