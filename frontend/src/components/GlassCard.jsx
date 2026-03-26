import { cn } from "./cn";

function GlassCard({ className = "", children }) {
  return <div className={cn("glass rounded-[28px] border border-white/10", className)}>{children}</div>;
}

export default GlassCard;
