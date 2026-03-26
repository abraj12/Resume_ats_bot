import { motion } from "framer-motion";

function SectionTitle({ eyebrow, title, description, align = "left" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-sky-500">{eyebrow}</p>
      <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">{description}</p>
    </motion.div>
  );
}

export default SectionTitle;
