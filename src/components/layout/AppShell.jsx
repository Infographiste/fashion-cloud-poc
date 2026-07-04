import { useState } from "react";
import { Sidebar } from "./Sidebar.jsx";
import { AiDrawer } from "./AiDrawer.jsx";
import { DisclaimerBanner } from "./DisclaimerBanner.jsx";

/**
 * AppShell — full-width disclaimer banner on top, then the frame:
 * Sidebar + (animated) AI drawer + scrollable content.
 */
export function AppShell({ children }) {
  const [aiOpen, setAiOpen] = useState(false);
  return (
    <div className="flex h-full flex-col bg-black">
      <DisclaimerBanner />
      <div className="flex min-h-0 flex-1 gap-1">
        <Sidebar aiOpen={aiOpen} onToggleAi={() => setAiOpen((o) => !o)} />
        <AiDrawer open={aiOpen} onClose={() => setAiOpen(false)} />
        <main className="fc-scroll flex h-full min-w-0 flex-1 flex-col gap-2 overflow-y-auto p-2 [&>*]:shrink-0">
          {children}
        </main>
      </div>
    </div>
  );
}
