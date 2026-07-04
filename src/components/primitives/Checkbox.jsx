import { Check } from "lucide-react";
import { cn } from "../../lib/cn.js";

export function Checkbox({ checked = false, onChange, className, "aria-label": ariaLabel = "Select" }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange?.(!checked)}
      className={cn(
        "flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border transition-colors",
        checked ? "border-primary bg-primary text-white" : "border-control bg-white text-transparent hover:border-ink-soft",
        className
      )}
    >
      <Check size={14} strokeWidth={3} />
    </button>
  );
}
