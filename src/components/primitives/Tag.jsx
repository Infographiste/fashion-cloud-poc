import { cn } from "../../lib/cn.js";

/**
 * Tag — the pill used for deltas, labels and statuses across the system.
 * tone maps to the token palette. "solid" tones are used for stock-health.
 */
const tones = {
  primary: "bg-primary-weak text-primary-weakInk",
  info: "bg-info-weak text-info-weakInk",
  promo: "bg-promo-weak text-promo-weakInk",
  neutral: "bg-surface text-ink-soft",
  active: "bg-state-activeBg text-state-activeInk",
  inactive: "bg-state-inactiveBg text-state-inactiveInk",
  expiring: "bg-state-expiringBg text-state-expiringInk",
  // solid health
  good: "bg-health-good text-white",
  poor: "bg-health-poor text-[#3a2600]",
  critical: "bg-health-critical text-white",
};

export function Tag({ tone = "primary", icon: Icon, className, children }) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center justify-center gap-1 rounded-pill px-2.5 text-sm font-bold leading-5",
        tones[tone],
        className
      )}
    >
      {Icon && <Icon size={16} strokeWidth={2.2} className="-ml-0.5 shrink-0" />}
      {children}
    </span>
  );
}
