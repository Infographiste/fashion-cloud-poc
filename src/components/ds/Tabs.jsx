import { List, Columns3 } from "lucide-react";
import { cn } from "../../lib/cn.js";

/**
 * Tabs — segmented control in the Top region that switches content *type*.
 */
export function Tabs({ items, value, onChange, className }) {
  return (
    <div
      className={cn(
        "flex h-12 items-center gap-2 rounded-pill bg-[#e7e6ed] p-0 shadow-[inset_0px_4px_7px_-2px_rgba(119,117,128,0.18)]",
        className
      )}
      role="tablist"
    >
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange?.(item.value)}
            className={cn(
              "flex h-full flex-1 items-center justify-center rounded-pill px-4 text-base font-bold tracking-[0.01em] transition-colors",
              active ? "bg-white text-primary shadow-l3" : "text-ink-soft hover:text-ink"
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

/**
 * DisplayToggle — flips the Layout between list (rows/table) and grid (columns).
 * Icons match the design: list rows vs. three vertical columns.
 */
export function DisplayToggle({ value = "grid", onChange }) {
  return (
    <div className="flex items-center rounded-md border border-line bg-white p-1">
      <ToggleIcon icon={List} active={value === "list"} onClick={() => onChange?.("list")} label="List view" />
      <ToggleIcon icon={Columns3} active={value === "grid"} onClick={() => onChange?.("grid")} label="Grid view" />
    </div>
  );
}

function ToggleIcon({ icon: Icon, active, onClick, label }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "flex h-8 w-9 items-center justify-center rounded transition-colors",
        active ? "bg-primary-weak text-primary" : "text-muted hover:text-ink"
      )}
    >
      <Icon size={18} strokeWidth={2} />
    </button>
  );
}
