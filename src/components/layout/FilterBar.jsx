import { cn } from "../../lib/cn.js";

/**
 * FilterBar — responsive grid of filter controls. When a Display toggle is
 * provided it occupies the final cell with the label left and the toggle
 * pinned to the right edge of the filter container (no floating gap).
 */
export function FilterBar({ children, display, className }) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
        className
      )}
    >
      {children}
      {display && (
        <div className="flex h-12 items-center justify-between gap-3 xl:col-start-5">
          <span className="text-[11px] font-medium text-muted">Display</span>
          {display}
        </div>
      )}
    </div>
  );
}
