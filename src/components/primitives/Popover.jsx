import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn.js";

/**
 * Popover — lightweight click-to-open menu anchored to a trigger.
 * Closes on outside click or Escape.
 */
export function Popover({ trigger, children, align = "start", side = "bottom", className, rootClassName }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn("relative inline-flex", rootClassName)}>
      <span className={cn(rootClassName && "w-full")} onClick={() => setOpen((o) => !o)}>{trigger}</span>
      {open && (
        <div
          role="menu"
          className={cn(
            "absolute z-50 min-w-[200px] rounded-md border border-line bg-white p-1.5 shadow-raise",
            side === "top" ? "bottom-full mb-2" : "top-full mt-2",
            align === "end" ? "right-0" : "left-0",
            className
          )}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function MenuItem({ icon: Icon, children, danger, onClick }) {
  return (
    <button
      role="menuitem"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2.5 rounded px-2.5 py-2 text-left text-sm font-medium transition-colors",
        danger ? "text-health-critical hover:bg-promo/40" : "text-ink hover:bg-surface"
      )}
    >
      {Icon && <Icon size={16} strokeWidth={2} className="shrink-0 text-muted" />}
      {children}
    </button>
  );
}

export function MenuLabel({ children }) {
  return <p className="px-2.5 pb-1 pt-2 text-[11px] font-bold uppercase tracking-wide text-muted">{children}</p>;
}

export function MenuSeparator() {
  return <div className="my-1 h-px bg-line" />;
}
