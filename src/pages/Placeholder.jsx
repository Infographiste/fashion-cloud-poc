import { Top, TitleBanner } from "../components/layout/Top.jsx";
import { Panel } from "../components/ds/Panel.jsx";

export default function Placeholder({ title }) {
  return (
    <>
      <Top banner={<TitleBanner title={title} />} />
      <Panel className="flex min-h-0 flex-1 flex-col items-center justify-center text-center">
        <div className="max-w-sm">
          <h2 className="text-h2 font-bold text-ink">{title} is coming next</h2>
          <p className="mt-2 text-sm text-ink-soft">
            This area of the portal isn't part of the current prototype yet. It uses the
            same shell, so it'll drop straight in once the screens are designed.
          </p>
        </div>
      </Panel>
    </>
  );
}
