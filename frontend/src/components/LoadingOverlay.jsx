import { motion, AnimatePresence } from "framer-motion";

function LoadingOverlay({ visible }) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 backdrop-blur-md"
        >
          <div className="glass rounded-[32px] p-8 text-center">
            <div className="mx-auto flex w-48 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <motion.div
                className="h-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500"
                initial={{ x: "-100%" }}
                animate={{ x: "180%" }}
                transition={{ repeat: Infinity, duration: 1.25, ease: "easeInOut" }}
                style={{ width: "50%" }}
              />
            </div>
            <h3 className="mt-6 font-display text-2xl font-bold text-slate-950 dark:text-white">Analyzing your resume</h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Scoring ATS fit, reading keyword gaps, and preparing polished suggestions.</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default LoadingOverlay;
