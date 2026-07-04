import { cn } from "../../lib/cn.js";

export function Toggle({ checked = false, onChange, label }) {
  return (
    <label className="inline-flex cursor-pointer select-none items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange?.(!checked)}
        className={cn(
          "flex h-6 w-11 shrink-0 items-center rounded-pill px-0.5 transition-colors",
          checked ? "justify-end bg-primary" : "justify-start bg-[#c5c4ce]"
        )}
      >
        <span className="h-5 w-5 rounded-pill bg-white shadow-sm" />
      </button>
      {label && <span className="whitespace-nowrap text-sm font-medium text-ink">{label}</span>}
    </label>
  );
}
