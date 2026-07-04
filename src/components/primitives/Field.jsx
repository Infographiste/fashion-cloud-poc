import { Search, ChevronDown, X } from "lucide-react";
import { cn } from "../../lib/cn.js";

/* Shared field shell — the 48px rounded control used across the filter bar. */
const fieldShell =
  "group/field flex h-12 items-center gap-2 rounded-md border border-line bg-white px-3 text-sm text-ink " +
  "transition-colors duration-150 hover:border-primary hover:bg-white";

export function SearchInput({ placeholder = "Search", value, onChange, className }) {
  return (
    <div className={cn(fieldShell, className)}>
      <Search size={18} className="shrink-0 text-muted" />
      <input
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent placeholder:text-muted focus:outline-none"
      />
    </div>
  );
}

/** Select — presentational (POC). Shows an optional floating label + value. */
export function Select({ label, value, placeholder = "Select", onClear, className }) {
  const hasValue = Boolean(value);
  return (
    <div className={cn(fieldShell, "relative justify-between", className)}>
      <span className="flex min-w-0 flex-col leading-tight">
        {label && (
          <span className="text-[11px] font-medium text-muted">{label}</span>
        )}
        <span className={cn("truncate", hasValue ? "font-bold text-primary" : "text-muted")}>
          {value || placeholder}
        </span>
      </span>
      <span className="flex items-center gap-1 text-muted">
        {hasValue && onClear && (
          <X
            size={16}
            className="cursor-pointer hover:text-ink"
            onClick={onClear}
          />
        )}
        <ChevronDown size={18} />
      </span>
    </div>
  );
}

/** RangeSlider — presentational dual value display (12% – 79% style). */
export function RangeSlider({ label, from = 12, to = 79, className }) {
  return (
    <div className={cn(fieldShell, "flex-col !items-start justify-center gap-1 py-1.5", className)}>
      {label && <span className="text-[11px] font-medium text-muted">{label}</span>}
      <div className="flex w-full items-center gap-2">
        <span className="text-xs text-ink-soft">{from}%</span>
        <span className="relative h-1 flex-1 rounded-pill bg-line">
          <span
            className="absolute inset-y-0 rounded-pill bg-primary"
            style={{ left: `${from}%`, right: `${100 - to}%` }}
          />
          <Knob pct={from} />
          <Knob pct={to} />
        </span>
        <span className="text-xs text-ink-soft">{to}%</span>
      </div>
    </div>
  );
}

function Knob({ pct }) {
  return (
    <span
      className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-pill border-2 border-primary bg-white"
      style={{ left: `${pct}%` }}
    />
  );
}

/** Field — simple labelled text field (e.g. "Label / Sample Text"). */
export function Field({ label, value, placeholder, className }) {
  return (
    <div className={cn(fieldShell, "flex-col !items-start justify-center gap-0.5", className)}>
      {label && <span className="text-[11px] font-medium text-muted">{label}</span>}
      <span className={cn("truncate", value ? "text-ink" : "text-muted")}>
        {value || placeholder}
      </span>
    </div>
  );
}
