import { cn } from "../../lib/cn.js";
import { Img } from "../primitives/Img.jsx";

/**
 * Card — the single content primitive of the platform.
 *
 * Every list/grid/table item is the same DOM:
 *   Card ▸ [Checkbox] · Media · Content ▸ (Header · Info · Actions)
 *
 * Orientation, padding and the aspect of Media change per surface, but the
 * structure never does. That consistency is the whole point of the system.
 *
 *   <Card orientation="row|column">
 *     <Card.Media ratio="square|portrait" src=... />
 *     <Card.Content>
 *       <Card.Header>…</Card.Header>
 *       <Card.Info>…</Card.Info>
 *       <Card.Actions>…</Card.Actions>
 *     </Card.Content>
 *   </Card>
 */
export function Card({ orientation = "row", interactive = false, className, children, ...props }) {
  return (
    <div
      className={cn(
        "relative flex gap-2 rounded-md border border-line bg-white p-2",
        orientation === "column" ? "flex-col" : "flex-row items-stretch",
        interactive &&
          "cursor-pointer transition-[box-shadow,border-color,background-color] duration-150 hover:border-primary hover:bg-white hover:shadow-l3",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

const ratios = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/9]",
  auto: "",
};

Card.Media = function CardMedia({ ratio = "square", src, alt, monogram, className, children }) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-md bg-surface",
        ratios[ratio],
        className
      )}
    >
      {children ?? <Img src={src} alt={alt} monogram={monogram} rounded="rounded-md" />}
    </div>
  );
};

Card.Content = function CardContent({ orientation = "row", className, children }) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 gap-2 p-1",
        orientation === "column" ? "flex-col" : "flex-row items-start",
        className
      )}
    >
      {children}
    </div>
  );
};

Card.Header = function CardHeader({ className, children }) {
  return <div className={cn("flex min-w-0 flex-col gap-1", className)}>{children}</div>;
};

Card.Info = function CardInfo({ className, children }) {
  return <div className={cn("flex min-w-0 flex-1 flex-col gap-2", className)}>{children}</div>;
};

Card.Actions = function CardActions({ className, children }) {
  return (
    <div className={cn("flex shrink-0 items-center justify-end gap-1", className)}>{children}</div>
  );
};

/* A labelled metric row used inside Card.Info on article cards. */
Card.Metric = function CardMetric({ label, children }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-muted">{label}</span>
      <span className="text-sm font-bold text-ink">{children}</span>
    </div>
  );
};
