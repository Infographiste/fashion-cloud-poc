import { MoreVertical } from "lucide-react";
import { cn } from "../../lib/cn.js";
import { Popover } from "../primitives/Popover.jsx";

/** Panel — the frosted rounded surface that holds a Layout region. */
export function Panel({ className, children, ...props }) {
  return (
    <div className={cn("rounded-panel bg-surface p-8", className)} {...props}>
      {children}
    </div>
  );
}

/**
 * SectionHeader — title row atop a panel. When `menu` is provided, a leading
 * ellipsis opens a context menu (display preferences), matching the design.
 */
export function SectionHeader({ title, count, menu, right, className }) {
  return (
    <div className={cn("mb-6 flex items-center gap-3", className)}>
      {menu && (
        <Popover
          align="start"
          trigger={
            <button
              className="flex h-8 w-6 items-center justify-center rounded text-ink-soft hover:bg-white/60"
              aria-label={`${title} display options`}
            >
              <MoreVertical size={20} strokeWidth={2} />
            </button>
          }
        >
          {menu}
        </Popover>
      )}
      <h2 className="text-h1 font-bold text-black">
        {title}
        {count != null && <span className="text-muted"> ({count})</span>}
      </h2>
      {right && <div className="ml-auto">{right}</div>}
    </div>
  );
}
