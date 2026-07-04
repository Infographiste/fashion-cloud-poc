import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../lib/cn.js";

/**
 * Top — content header region. Banner (title/hero) + Tabs + Filters share one
 * uniform surface background.
 */
export function Top({ banner, tabs, filters, className }) {
  return (
    <div className={cn("flex w-full flex-col overflow-hidden rounded-top bg-surface", className)}>
      {banner}
      {(tabs || filters) && (
        <div className="flex flex-col gap-5 px-5 pb-5 pt-5">
          {tabs}
          {filters}
        </div>
      )}
    </div>
  );
}

/** Image hero banner (Portal). */
export function HeroBanner({ image, eyebrow, title }) {
  return (
    <div className="relative flex flex-col justify-end px-8 pb-8 pt-8" style={{ minHeight: 340 }}>
      {image && <img src={image} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover" />}
      {image && <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/70 via-white/25 to-transparent" />}
      <div className="relative">
        {eyebrow && <p className="mb-1 text-sm font-bold uppercase tracking-wide text-ink-soft">{eyebrow}</p>}
        <h1 className="text-hero font-bold text-ink">{title}</h1>
      </div>
    </div>
  );
}

/** Title banner with a back link. */
export function TitleBanner({ title, back = true }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-2 px-8 pb-4 pt-6">
      {back && (
        <button onClick={() => navigate("/")} className="flex w-fit items-center gap-1.5 text-sm font-bold text-ink-soft hover:text-primary">
          <ArrowLeft size={18} strokeWidth={2.4} /> Back
        </button>
      )}
      <h1 className="text-h1 font-bold text-black">{title}</h1>
    </div>
  );
}
