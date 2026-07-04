import { cn } from "../../lib/cn.js";

/**
 * Button — matches the Figma button component set.
 * variants: primary (filled violet), secondary (violet text link-button),
 *           tertiary (grey chip), ghost (transparent), icon (square).
 */
const base =
  "inline-flex items-center justify-center gap-2 font-bold whitespace-nowrap " +
  "transition-colors duration-150 disabled:opacity-40 disabled:pointer-events-none";

const sizes = {
  md: "h-9 px-3 text-btn rounded-md",
  sm: "h-7 px-2.5 text-xs rounded-md",
  icon: "h-9 w-9 rounded-md",
  iconSm: "h-7 w-7 rounded-md",
};

const variants = {
  primary: "bg-primary text-white hover:brightness-110",
  secondary: "text-primary hover:bg-primary/5",
  tertiary: "bg-surface text-ink-soft hover:bg-line",
  outline: "border border-line bg-white text-ink hover:border-primary hover:text-black",
  ghost: "text-ink-soft hover:bg-surface",
  danger: "text-health-critical hover:bg-promo/40",
};

export function Button({
  as: Tag = "button",
  variant = "secondary",
  size = "md",
  icon: Icon,
  iconRight: IconRight,
  className,
  children,
  ...props
}) {
  const iconOnly = !children;
  return (
    <Tag
      className={cn(base, iconOnly ? sizes[size === "sm" ? "iconSm" : "icon"] : sizes[size], variants[variant], className)}
      {...props}
    >
      {Icon && <Icon size={18} strokeWidth={2} className="shrink-0" />}
      {children}
      {IconRight && <IconRight size={18} strokeWidth={2} className="shrink-0" />}
    </Tag>
  );
}
