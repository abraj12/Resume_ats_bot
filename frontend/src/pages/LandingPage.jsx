import { ArrowRight, BrainCircuit, LayoutTemplate, ScanSearch } from "lucide-react";
import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import FeatureCard from "../components/FeatureCard";
import DemoPreview from "../components/DemoPreview";

function LandingPage({ onTryNow }) {
  const features = [
    {
      icon: ScanSearch,
      title: "ATS Score",
      description: "Understand resume match quality with clear scoring, animated progress, and recruiter-style signal breakdowns.",
      accent: "from-sky-500 to-cyan-400"
    },
    {
      icon: BrainCircuit,
      title: "AI Suggestions",
      description: "Spot missing keywords, weak positioning, and summary opportunities before your application goes out.",
      accent: "from-indigo-500 to-violet-500"
    },
    {
      icon: LayoutTemplate,
      title: "Resume Templates",
      description: "Move from analysis to polished output with premium template choices for different hiring styles.",
      accent: "from-emerald-500 to-teal-400"
    }
  ];

  const openTelegram = () => {
    window.open("https://t.me/findperfectjobforu_bot", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-24 pb-24 pt-10 sm:pt-14">
      <section className="section-shell">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mb-4 inline-flex rounded-full border border-sky-400/20 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-300">
              AI-powered resume optimization
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-balance font-display text-5xl font-bold tracking-tight text-white sm:text-6xl"
            >
              AI Resume Analyzer
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-xl text-lg leading-8 text-gray-300"
            >
              Boost your ATS score instantly with a startup-polished workflow for analysis, rewriting, templates, and downloads.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={onTryNow}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-600"
              >
                Try Now
                <ArrowRight className="h-5 w-5" />
              </button>
              <a href="#demo" className="inline-flex items-center justify-center rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 font-semibold text-white transition hover:bg-slate-700">
                Explore Demo
              </a>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="animate-float">
            <DemoPreview />
          </motion.div>
        </div>
      </section>

      <section className="section-shell">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-6 text-center">
          <h2 className="text-xl font-semibold mb-2 text-white">Use Telegram Bot</h2>
          <p className="text-gray-400 mb-4">
            You can also optimize your resume using our Telegram bot
          </p>
          <button
            onClick={openTelegram}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white font-semibold"
          >
            Open Telegram Bot
          </button>
        </div>
      </section>

      <section className="section-shell">
        <SectionTitle
          eyebrow="Features"
          title="Built for ambitious applicants, recruiters, and career pivots."
          description="Every interaction is designed to feel fast, premium, and obvious the moment you land on the product."
          align="center"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section id="demo" className="section-shell">
        <SectionTitle
          eyebrow="Preview"
          title="A result view that feels actionable, not overwhelming."
          description="Circular score visuals, focused keyword chips, and immediately usable next steps make the analysis easy to trust."
        />
        <div className="mt-10">
          <DemoPreview />
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
