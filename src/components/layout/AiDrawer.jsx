import { useEffect, useRef, useState } from "react";
import { X, ArrowUp } from "lucide-react";
import { RobotIcon } from "../ds/RobotIcon.jsx";
import { cn } from "../../lib/cn.js";

const prompts = [
  {
    q: "Check STRs in my Region",
    a: "Across your region the average sell-through rate is 87% this season — up 3 points versus last year. Footwear leads at 94%, while outerwear is lagging at 71% and worth a closer look.",
    link: "Open the Reorder dashboard",
  },
  {
    q: "Connect Retailers",
    a: "You have 3 retailers awaiting an EDI connection: Breuninger, Zalando and Number Nine. Approving them switches on Smart Replenishment so reorders flow automatically.",
    link: "Go to Customers",
  },
  {
    q: "Create a Presentation for the new Season",
    a: "I've drafted an FW26 master presentation built from your current bestsellers and De Bijenkorf's assortment plan. You can review and share it in a couple of clicks.",
    link: "Open it in the Showroom",
  },
];

const disclaimer =
  "This is a prototype, so I can't answer free-form questions just yet — sorry! You can try one of the suggested prompts above and I'll show you what's possible.";

const greeting = { role: "ai", text: "Hello! How may I help you today?" };

export function AiDrawer({ open, onClose }) {
  const [messages, setMessages] = useState([greeting]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open, thinking]);

  // Question bubble appears first; the answer cascades in shortly after.
  const converse = (userText, aiMsg) => {
    setMessages((m) => [...m, { role: "user", text: userText }]);
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setMessages((m) => [...m, aiMsg]);
    }, 550);
  };

  const askPrompt = (p) => converse(p.q, { role: "ai", text: p.a, link: p.link });
  const send = () => {
    const q = draft.trim();
    if (!q) return;
    setDraft("");
    converse(q, { role: "ai", text: disclaimer });
  };

  return (
    <div
      className={cn(
        "h-full shrink-0 overflow-hidden transition-[width] duration-300 ease-out",
        open ? "w-[340px]" : "w-0"
      )}
    >
      <aside className="flex h-full w-[340px] flex-col bg-ink text-white">
        <div className="flex items-center gap-2 p-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
            <RobotIcon size={16} />
          </span>
          <span className="text-sm font-bold">Ask AI</span>
          <button
            onClick={onClose}
            aria-label="Close assistant"
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-md text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div ref={scrollRef} className="fc-scroll flex flex-1 flex-col gap-3 overflow-y-auto p-4">
          {messages.map((m, i) =>
            m.role === "ai" ? (
              <div key={i} className="animate-msg flex items-end gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                  <RobotIcon size={16} />
                </span>
                <div className="max-w-[240px] rounded-2xl rounded-bl-sm bg-white px-4 py-3 text-sm text-ink">
                  <p>{m.text}</p>
                  {m.link && (
                    <button
                      type="button"
                      onClick={(e) => e.preventDefault()}
                      className="mt-2 inline-flex items-center gap-1 font-bold text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary"
                    >
                      {m.link} →
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div key={i} className="animate-msg flex justify-end">
                <div className="max-w-[240px] rounded-2xl rounded-br-sm bg-primary px-4 py-3 text-sm text-white">
                  {m.text}
                </div>
              </div>
            )
          )}

          {thinking && (
            <div className="animate-msg flex items-end gap-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                <RobotIcon size={16} />
              </span>
              <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3.5">
                <Dot /> <Dot delay="0.15s" /> <Dot delay="0.3s" />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 px-4 pb-2 pt-1">
          {prompts.map((p) => (
            <button
              key={p.q}
              onClick={() => askPrompt(p)}
              className="self-end rounded-pill border border-white/15 bg-white/5 px-4 py-2 text-right text-sm text-white/90 transition-colors hover:border-white/40 hover:bg-white/10"
            >
              {p.q}
            </button>
          ))}
        </div>

        <div className="p-4 pt-2">
          <div className="flex items-center gap-2 rounded-pill bg-white/10 px-4 py-2.5 transition-colors focus-within:bg-white/15">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask Anything"
              className="w-full bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
            />
            <button
              onClick={send}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-[filter] hover:brightness-110"
              aria-label="Send"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Dot({ delay = "0s" }) {
  return (
    <span
      className="h-1.5 w-1.5 rounded-full bg-ink-soft"
      style={{ animation: "fcbounce 0.9s ease-in-out infinite", animationDelay: delay }}
    />
  );
}
