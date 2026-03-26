import { Check } from "lucide-react";
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";

function TemplateCard({ template, selected, onSelect }) {
  return (
    <motion.button whileHover={{ y: -6 }} whileTap={{ scale: 0.98 }} onClick={() => onSelect(template.id)} className="w-full text-left">
      <GlassCard className={`overflow-hidden p-0 ${selected ? "ring-2 ring-sky-400" : ""}`}>
        <div className={`h-32 bg-gradient-to-br ${template.preview}`}>
          <div className="flex h-full items-end justify-between bg-slate-950/25 p-4">
            <div>
              <p className="text-sm text-white/70">Template</p>
              <h3 className="font-display text-2xl font-bold text-white">{template.name}</h3>
            </div>
            {selected ? <Check className="h-5 w-5 text-white" /> : null}
          </div>
        </div>
        <div className="p-5">
          <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{template.description}</p>
        </div>
      </GlassCard>
    </motion.button>
  );
}

export default TemplateCard;
