import { Panel } from "./Panel.jsx";

/**
 * EmptyState — shown on tabs/areas that aren't part of the prototype yet.
 * Mirrors the placeholder pages (e.g. Content) so the message reads the same.
 */
export function EmptyState({ label = "This view", note }) {
  return (
    <Panel className="flex min-h-[300px] flex-1 flex-col items-center justify-center text-center">
      <div className="max-w-sm">
        <h2 className="text-h2 font-bold text-ink">{label} isn't prototyped yet</h2>
        <p className="mt-2 text-sm text-ink-soft">
          {note ||
            "This part of the prototype runs on mock data for concept presentation only and hasn't been designed yet. It uses the same shell, so it'll slot straight in once the screens exist."}
        </p>
      </div>
    </Panel>
  );
}
