import { Tag } from "../primitives/Tag.jsx";
import { cn } from "../../lib/cn.js";

/**
 * KpiCard — compact data card for the Portal KPI rail.
 * Delta tone derives from its sign (+ info / - promotional).
 */
export function KpiCard({ label, value, delta, caption, className }) {
  const negative = typeof delta === "string" && delta.trim().startsWith("-");
  return (
    <div className={cn("flex flex-col gap-2 rounded-md border border-line bg-white p-3", className)}>
      <p className="truncate text-xs text-muted">{label}</p>
      <div className="flex items-center gap-2">
        <p className="text-kpi font-bold text-ink">{value}</p>
        {delta && <Tag tone={negative ? "promo" : "info"}>{delta}</Tag>}
      </div>
      {caption && <p className="text-xs text-ink-text/70">{caption}</p>}
    </div>
  );
}
