import { useState } from "react";
import { cn } from "../../lib/cn.js";

/**
 * Img — a swappable image slot.
 * Until real Hugo Boss assets are dropped into /public/img (and referenced in
 * src/data/images.js), this renders a quiet monogram placeholder so the layout
 * still reads correctly. Swapping in real photography needs no code changes.
 */
export function Img({ src, alt = "", className, monogram = "HB", rounded = "rounded-md" }) {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = !src || failed;

  if (showPlaceholder) {
    return (
      <div
        className={cn(
          "flex items-center justify-center overflow-hidden bg-surface text-muted",
          rounded,
          className
        )}
        aria-label={alt || "Image placeholder"}
        role="img"
      >
        <span className="select-none font-bold tracking-[0.12em] text-[0.7em] opacity-60">
          {monogram}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={cn("h-full w-full object-cover", rounded, className)}
      loading="lazy"
    />
  );
}
