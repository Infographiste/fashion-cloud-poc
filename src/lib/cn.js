// Tiny classNames joiner (no dependency needed).
export function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}
