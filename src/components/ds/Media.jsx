import { MapPin } from "lucide-react";
import { cn } from "../../lib/cn.js";

/** MapTile — stylised static map placeholder used as store-card media. */
export function MapTile({ className }) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-[#e9e8ee]", className)}>
      <svg viewBox="0 0 200 200" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <rect width="200" height="200" fill="#e9e8ee" />
        <path d="M0 60 H200 M0 130 H200 M70 0 V200 M140 0 V200" stroke="#d7d6de" strokeWidth="6" />
        <path d="M0 95 H200 M35 0 V200" stroke="#cfced7" strokeWidth="3" />
        <path d="M0 20 L200 180" stroke="#dcdbe3" strokeWidth="10" opacity="0.7" />
      </svg>
      <MapPin size={30} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full text-ink-soft" fill="#8d8c96" strokeWidth={1.5} />
    </div>
  );
}

/**
 * BrandTile — square retailer logo mark. Real brand logos aren't shipped with
 * the POC, so these are scalable SVG monogram marks in each brand's colour
 * (they fill any square cleanly). Swap for real logo files when available.
 */
const marks = {
  bijenkorf: { m: "dB", bg: "#E2001A", fg: "#fff" },
  aboutyou: { m: "AY", bg: "#111111", fg: "#fff" },
  breuninger: { m: "Br", bg: "#1D1D1B", fg: "#fff" },
  zalando: { m: "Z", bg: "#FF6900", fg: "#fff" },
  pc: { m: "P&C", bg: "#0A2A66", fg: "#fff", small: true },
  selfridges: { m: "S", bg: "#F2E600", fg: "#111" },
  galeries: { m: "GL", bg: "#0F1E3D", fg: "#fff" },
  numbernine: { m: "N9", bg: "#111111", fg: "#fff" },
  jansen: { m: "JM", bg: "#6B4F3A", fg: "#fff" },
};

export function BrandTile({ retailer, variant = "solid", className }) {
  const mk = marks[retailer.id] || {
    m: (retailer.name || "?").slice(0, 2),
    bg: retailer.color || "#21202d",
    fg: retailer.ink || "#fff",
  };
  const light = variant === "light";
  return (
    <svg viewBox="0 0 100 100" className={cn("h-full w-full", className)} preserveAspectRatio="xMidYMid slice" role="img" aria-label={retailer.name}>
      <rect width="100" height="100" fill={light ? "#ffffff" : mk.bg} />
      <text
        x="50" y="50" dominantBaseline="central" textAnchor="middle"
        fontFamily="Satoshi, sans-serif" fontWeight="800"
        fontSize={mk.small ? 30 : 44} fill={light ? mk.bg : mk.fg}
      >
        {mk.m}
      </text>
    </svg>
  );
}

/** HangerIcon — clothes-hanger line icon (used for the cancelled-style task). */
export function HangerIcon({ size = 26, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M12 7a2 2 0 1 1 1.4-3.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 7v1.5L3.5 14.2a1 1 0 0 0 .56 1.8h15.88a1 1 0 0 0 .56-1.8L12 8.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
