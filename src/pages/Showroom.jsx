import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Share2, Copy, Lock, MoreVertical } from "lucide-react";
import { Top, TitleBanner } from "../components/layout/Top.jsx";
import { Tabs, DisplayToggle } from "../components/ds/Tabs.jsx";
import { FilterBar } from "../components/layout/FilterBar.jsx";
import { Panel } from "../components/ds/Panel.jsx";
import { Card } from "../components/ds/Card.jsx";
import { Checkbox } from "../components/primitives/Checkbox.jsx";
import { Tag } from "../components/primitives/Tag.jsx";
import { Button } from "../components/primitives/Button.jsx";
import { Img } from "../components/primitives/Img.jsx";
import { Toggle } from "../components/primitives/Toggle.jsx";
import { SearchInput, Select } from "../components/primitives/Field.jsx";
import { showroomTabs, presentations } from "../data/showroom.js";
import { cover } from "../data/images.js";
import { EmptyState } from "../components/ds/EmptyState.jsx";
import { cn } from "../lib/cn.js";

// Card shown when arriving from the "Review Self Service order" task.
const reviewCard = {
  id: "review",
  customer: "Jansen Mode",
  presentation: "Self Service Order — FW26",
  collection: "BOSS Menswear",
  season: "Summer 2026",
  created: "26 June 2026 15:30",
  updated: "26-06-26 15:30",
  cover: cover(0),
  type: { label: "Self Service", tone: "primary" },
  master: false,
  reviewPending: true,
};

export default function Showroom() {
  const [sp] = useSearchParams();
  const isReview = sp.get("review") === "1";
  const wantMaster = sp.get("master") === "1";

  const [tab, setTab] = useState("mine");
  const [view, setView] = useState("grid");
  const [master, setMaster] = useState(wantMaster); // nav → off, "prepare a presentation" → on
  const [review, setReview] = useState(isReview);
  const [loading, setLoading] = useState(false);

  const refresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 300);
  };
  const changeMaster = (v) => { setMaster(v); refresh(); };
  const changeReview = (v) => { setReview(v); refresh(); };

  let items = review ? [reviewCard] : presentations;
  if (!review && master) items = items.filter((p) => p.master);

  return (
    <>
      <Top
        banner={<TitleBanner title="Showroom" />}
        tabs={<Tabs items={showroomTabs} value={tab} onChange={setTab} />}
        filters={
          <div className="flex flex-col gap-4">
            <FilterBar>
              <SearchInput placeholder="Search by Name, Customer…" />
              <Select label="Order by" value="Date Created" onClear={() => {}} />
              <Select label="Customer" value={isReview ? "Jansen Mode" : "De Bijenkorf"} onClear={() => {}} />
              <Select label="Season" value="Summer 2026" onClear={() => {}} />
              <Select label="Catalogs" placeholder="Catalogs" />
            </FilterBar>
            <div className="flex flex-wrap items-center gap-8">
              <Toggle checked={master} onChange={changeMaster} label="Only show Master Presentations" />
              <Toggle checked={review} onChange={changeReview} label="Awaiting Review" />
              <div className="ml-auto flex items-center gap-3">
                <span className="text-[11px] font-medium text-muted">Display</span>
                <DisplayToggle value={view} onChange={setView} />
              </div>
            </div>
          </div>
        }
      />
      <div className={cn("transition-opacity duration-200", loading ? "opacity-0" : "opacity-100")}>
        <div key={`${view}-${master}-${review}-${tab}`} className="animate-fadein">
          {tab === "mine" ? (
            view === "grid" ? <GridView items={items} /> : <ListView items={items} />
          ) : (
            <EmptyState label={showroomTabs.find((t) => t.value === tab)?.label} />
          )}
        </div>
      </div>
    </>
  );
}

const actionIcons = [
  { icon: Share2, label: "Share" },
  { icon: Copy, label: "Duplicate" },
  { icon: Lock, label: "Lock" },
  { icon: MoreVertical, label: "More" },
];

function ActionRow() {
  return (
    <div className="flex items-center gap-1">
      {actionIcons.map((a) => (
        <Button key={a.label} variant="ghost" size="sm" icon={a.icon} aria-label={a.label} />
      ))}
    </div>
  );
}

function Tags({ p }) {
  return (
    <div className="flex flex-wrap items-center gap-1">
      <Tag tone={p.type.tone}>{p.type.label}</Tag>
      {p.reviewPending && <Tag tone="expiring">Review Pending</Tag>}
      {!p.reviewPending && !p.master && <Tag tone="active">{p.ordered}</Tag>}
    </div>
  );
}

/* ---------------- GRID view ---------------- */
function GridView({ items }) {
  return (
    <Panel>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {items.map((p) => (
          <PresentationCard key={p.id} p={p} />
        ))}
      </div>
    </Panel>
  );
}

function PresentationCard({ p }) {
  return (
    <Card orientation="column" interactive>
      <Card.Media ratio="wide" className="border border-line">
        <Img src={p.cover} monogram="HB" />
      </Card.Media>
      <Card.Content orientation="column">
        <Card.Header>
          <p className="text-h2 font-bold leading-[26px] text-ink">{p.customer}</p>
          <div className="mt-1 flex flex-col gap-0.5 text-sm text-ink-soft">
            <span>{p.presentation}</span>
            <span>{p.collection}</span>
            <span>{p.season}</span>
          </div>
        </Card.Header>
        <Tags p={p} />
        <p className="text-xs text-muted">Updated {p.updated}</p>
        <div className="mt-1 flex justify-center border-t border-line pt-2">
          <ActionRow />
        </div>
      </Card.Content>
    </Card>
  );
}

/* ---------------- LIST view ---------------- */
function ListView({ items }) {
  return (
    <Panel>
      <div className="flex flex-col gap-3">
        {items.map((p) => (
          <PresentationRow key={p.id} p={p} />
        ))}
      </div>
    </Panel>
  );
}

function PresentationRow({ p }) {
  const [checked, setChecked] = useState(false);
  return (
    <Card orientation="row" interactive className="items-center">
      <div className="flex items-center px-1">
        <Checkbox checked={checked} onChange={setChecked} />
      </div>
      <Card.Media ratio="wide" className="w-[132px] border border-line">
        <Img src={p.cover} monogram="HB" />
      </Card.Media>
      <Card.Content className="items-center gap-6">
        <p className="w-40 shrink-0 truncate text-h2 font-bold leading-[24px] text-ink">{p.customer}</p>
        <span className="hidden flex-1 text-sm text-ink-soft md:block">{p.presentation}</span>
        <span className="hidden flex-1 text-sm text-ink-soft lg:block">{p.collection}</span>
        <span className="hidden flex-1 text-sm text-ink-soft lg:block">{p.season}</span>
        <span className="hidden shrink-0 text-sm text-ink-soft xl:block">{p.created}</span>
        <div className="flex shrink-0 flex-col items-start gap-1">
          <Tags p={p} />
          <span className="text-xs text-muted">Updated {p.updated}</span>
        </div>
        <Card.Actions><ActionRow /></Card.Actions>
      </Card.Content>
    </Card>
  );
}
