import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, TriangleAlert, X } from "lucide-react";

function ToastContainer({ toasts, onDismiss }) {
  return (
    <div className="fixed right-4 top-20 z-[60] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => {
          const isError = toast.type === "error";
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 30, scale: 0.96 }}
              className={`glass flex items-start gap-3 rounded-2xl p-4 ${isError ? "border-rose-300/30" : "border-emerald-300/30"}`}
            >
              <span className={`mt-0.5 ${isError ? "text-rose-500" : "text-emerald-500"}`}>
                {isError ? <TriangleAlert className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
              </span>
              <div className="flex-1">
                <p className="font-semibold text-slate-900 dark:text-white">{toast.title}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{toast.message}</p>
              </div>
              <button onClick={() => onDismiss(toast.id)} className="text-slate-400 transition hover:text-slate-700 dark:hover:text-slate-100">
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export default ToastContainer;
