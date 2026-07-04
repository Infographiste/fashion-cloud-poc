/**
 * DisclaimerBanner — a slim, full-width strip pinned above the app frame,
 * flagging that this is a mock-data prototype.
 */
const DISCLAIMER =
  "This is a prototype running on mock data for concept presentation only. You may try to click everything, but some elements might not contain proper logic built just yet.";

export function DisclaimerBanner() {
  return (
    <div className="flex w-full items-center bg-black px-4 py-1.5 text-white/55">
      <p className="min-w-0 flex-1 truncate text-[12px] leading-tight">
        <span className="font-bold text-white/70">Prototype</span>
        <span className="mx-2 text-white/25">—</span>
        {DISCLAIMER}
      </p>
    </div>
  );
}
