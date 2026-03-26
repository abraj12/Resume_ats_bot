import { motion } from "framer-motion";
import GlassCard from "./GlassCard";

function FeatureCard({ icon: Icon, title, description, accent }) {
  return (
    <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 240, damping: 18 }}>
      <GlassCard className="h-full p-6">
        <div className={`mb-5 inline-flex rounded-2xl bg-gradient-to-br ${accent} p-3 text-white shadow-glow`}>
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>
      </GlassCard>
    </motion.div>
  );
}

export default FeatureCard;
