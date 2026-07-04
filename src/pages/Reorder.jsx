import { useState } from "react";
import { ChevronRight, ChevronDown, Store, Trash2, Plus, Pencil, X } from "lucide-react";
import { Top, TitleBanner } from "../components/layout/Top.jsx";
import { Tabs } from "../components/ds/Tabs.jsx";
import { FilterBar } from "../components/layout/FilterBar.jsx";
import { Panel, SectionHeader } from "../components/ds/Panel.jsx";
import { BrandTile } from "../components/ds/Media.jsx";
import { Checkbox } from "../components/primitives/Checkbox.jsx";
import { Tag } from "../components/primitives/Tag.jsx";
import { Button } from "../components/primitives/Button.jsx";
import { Toggle } from "../components/primitives/Toggle.jsx";
import { Img } from "../components/primitives/Img.jsx";
import { Popover, MenuItem, MenuLabel, MenuSeparator } from "../components/primitives/Popover.jsx";
import { SearchInput, Select, RangeSlider } from "../components/primitives/Field.jsx";
import { reorderTabs, reorderTable, healthLabel } from "../data/reorder.js";
import { EmptyState } from "../components/ds/EmptyState.jsx";
import { cn } from "../lib/cn.js";

export default function Reorder() {
  const [tab, setTab] = useState("auto");
  const [seasonA, setSeasonA] = useState("FW26");
  const [seasonB, setSeasonB] = useState("W26");
  const [recommend, setRecommend] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Top
        banner={<TitleBanner title="Reorder" />}
        tabs={<Tabs items={reorderTabs} value={tab} onChange={setTab} />}
        filters={
          <FilterBar>
            <SearchInput placeholder="Search by EAN, Article Name" />
            <Select label="Seasons" placeholder="Seasons" />
            <Select label="Target Group" placeholder="Target Group" />
            <Select label="Categories" placeholder="Categories" />
            <RangeSlider label="Stock Turn" from={12} to={79} />
            <RangeSlider label="Sell through rate" from={12} to={79} />
          </FilterBar>
        }
      />
      {tab === "auto" ? (
        <div className="flex min-w-0 gap-2">
          <div className="flex min-w-0 flex-1 flex-col">
            <ListView
              seasonA={seasonA}
              seasonB={seasonB}
              setSeasonA={setSeasonA}
              setSeasonB={setSeasonB}
              recommend={recommend}
              setRecommend={setRecommend}
              onAdjust={() => setDrawerOpen(true)}
            />
          </div>
          <TargetDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </div>
      ) : (
        <EmptyState label={reorderTabs.find((t) => t.value === tab)?.label} />
      )}
    </>
  );
}

const health = (h) => <Tag tone={h}>{healthLabel[h]}</Tag>;

/* =============== Seasonal comparison helpers =============== */
const SEASONS = ["FW26", "W26", "SS26", "FW25", "SS25", "SF25"];
const SHIFT = { FW26: 0, W26: 5, SS26: 9, FW25: 14, SS25: 19, SF25: 24, None: 0 };

const deltaVal = (seed, salt, seasonB) => {
  if (!seasonB || seasonB === "None") return null;
  return ((seed * 7 + salt * 3 + SHIFT[seasonB]) % 29) - 14;
};

function Delta({ d }) {
  if (d === null || d === 0) return null;
  const up = d > 0;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-1.5 py-0.5 text-[11px] font-bold leading-none",
        up ? "bg-state-activeBg text-state-activeInk" : "bg-state-inactiveBg text-state-inactiveInk"
      )}
    >
      {up ? `+${d}` : d}
    </span>
  );
}

function MetricHead({ label, seasonA, seasonB }) {
  const cmp = seasonB && seasonB !== "None";
  return (
    <span className="flex flex-col leading-tight">
      <span>{label}</span>
      {cmp && <span className="text-[10px] font-medium normal-case text-muted">{seasonA} ∆ vs {seasonB}</span>}
    </span>
  );
}

function SeasonPicker({ value, onChange, options }) {
  return (
    <Popover
      align="end"
      trigger={
        <button className="flex h-8 items-center gap-1 rounded-md border border-control bg-white px-2.5 text-sm font-bold text-ink transition-colors hover:border-primary">
          {value}
          <ChevronDown size={14} className="text-muted" />
        </button>
      }
    >
      {options.map((o) => (
        <MenuItem key={o} onClick={() => onChange(o)}>{o}</MenuItem>
      ))}
    </Popover>
  );
}

/* =============== Recommendation layer =============== */
// A pool of short, non-urgent strategic notes. Shown sparingly (not every row),
// all in a neutral grey — no colour-coded urgency.
const RECOS = [
  "To be watched over next week",
  "Adjust target quantities for small sizes",
  "Auto restock expiring soon",
  "Consider consolidating orders",
  "Review size curve before next drop",
  "Shift budget towards bestsellers",
];
const recoFor = (seed) => (seed % 3 === 1 ? RECOS[(seed * 4) % RECOS.length] : null);

function Reco({ seed }) {
  const text = recoFor(seed);
  if (!text) return <span className="text-muted">—</span>;
  return (
    <span className="line-clamp-2 text-xs leading-tight text-ink-soft" title={text}>
      {text}
    </span>
  );
}

function Target({ target, stock }) {
  const diff = stock - target;
  return (<>{target}{diff < 0 && <span className="text-health-critical"> {diff}</span>}</>);
}

/* =============== LIST (table) VIEW =============== */
/* Name column gets the most room; metric/status/reco share the rest equally; actions are compact. */
const COLS_BASE =
  "grid-cols-[28px_minmax(160px,2.4fr)_minmax(56px,1fr)_minmax(56px,1fr)_minmax(56px,1fr)_minmax(56px,1fr)_minmax(56px,1fr)_150px]";
const COLS_RECO =
  "grid-cols-[28px_minmax(160px,2.4fr)_minmax(56px,1fr)_minmax(56px,1fr)_minmax(56px,1fr)_minmax(56px,1fr)_minmax(56px,1fr)_minmax(56px,1fr)_150px]";
const colsFor = (recommend) => (recommend ? COLS_RECO : COLS_BASE);

const listMenu = (
  <>
    <MenuLabel>Columns</MenuLabel>
    <MenuItem>Stock</MenuItem>
    <MenuItem>Target</MenuItem>
    <MenuItem>Avg STR</MenuItem>
    <MenuItem>Stock Health per store</MenuItem>
    <MenuSeparator />
    <MenuItem>Collapse all</MenuItem>
  </>
);

const statusPills = (a, i) => {
  const out = [];
  if (a) out.push({ tone: "active", label: `${a} active` });
  if (i) out.push({ tone: "inactive", label: `${i} inactive` });
  if (!a && !i) out.push({ tone: "neutral", label: "—" });
  return out;
};

function ListView({ seasonA, seasonB, setSeasonA, setSeasonB, recommend, setRecommend, onAdjust }) {
  const cols = colsFor(recommend);
  return (
    <Panel className="!p-0">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 px-6 pt-5">
        <SectionHeader title="Articles" menu={listMenu} className="!mb-0" />
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-ink-soft">Compare</span>
          <SeasonPicker value={seasonA} onChange={setSeasonA} options={SEASONS} />
          <span className="text-xs font-medium text-ink-soft">∆ vs</span>
          <SeasonPicker value={seasonB} onChange={setSeasonB} options={[...SEASONS, "None"]} />
          <span className="mx-1 h-5 w-px bg-line" />
          <Toggle checked={recommend} onChange={setRecommend} label="Recommendations" />
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-b-panel">
        <div className={cn("grid items-end gap-3 border-b border-line px-4 pb-3 pt-1 text-sm font-bold text-ink-soft", cols)}>
          <span />
          <span>Articles &nbsp;›&nbsp; Retailers &nbsp;›&nbsp; Stores</span>
          <MetricHead label="Stock" seasonA={seasonA} seasonB={seasonB} />
          <MetricHead label="Target" seasonA={seasonA} seasonB={seasonB} />
          <MetricHead label="Avg STR" seasonA={seasonA} seasonB={seasonB} />
          <span>Stock Health per store</span>
          <span>Status per store</span>
          {recommend && <span>Recommendation</span>}
          <span />
        </div>
        <div className="flex flex-col">
          {reorderTable.map((a) => (
            <ArticleRow key={a.id} article={a} cols={cols} seasonB={seasonB} recommend={recommend} onAdjust={onAdjust} />
          ))}
        </div>
      </div>
    </Panel>
  );
}

function Cell({ children }) {
  return <div className="flex flex-wrap items-center gap-1">{children}</div>;
}

const rowHover = "cursor-pointer transition-colors hover:bg-primary-weak/25";

function ExpandChevron({ open }) {
  return <span className="text-muted">{open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}</span>;
}

function MetricValue({ children, bold, d }) {
  return (
    <span className={cn("flex items-center gap-1.5 text-sm text-ink", bold && "font-bold")}>
      {children}
      <Delta d={d} />
    </span>
  );
}

function TargetIconBtn({ onAdjust }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      icon={Pencil}
      aria-label="Adjust target quantities"
      className="text-muted hover:text-primary"
      onClick={(e) => { e.stopPropagation(); onAdjust(); }}
    />
  );
}

function ArticleRow({ article, cols, seasonB, recommend, onAdjust }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() => {
    const m = {};
    article.retailers.forEach((r) => r.children.forEach((s, i) => { m[r.id + ":" + i] = s.status.tone === "active"; }));
    return m;
  });

  const setStore = (rid, i, val) => setActive((a) => ({ ...a, [rid + ":" + i]: val }));
  const addAll = () => setActive((a) => { const n = { ...a }; for (const k in n) n[k] = true; return n; });
  const addRetailer = (rid) =>
    setActive((a) => {
      const n = { ...a };
      article.retailers.find((r) => r.id === rid).children.forEach((s, i) => { n[rid + ":" + i] = true; });
      return n;
    });

  const keys = Object.keys(active);
  const act = keys.filter((k) => active[k]).length;
  const statuses = statusPills(act, keys.length - act);

  return (
    <div className="border-t border-line first:border-t-0">
      <div onClick={() => setOpen((o) => !o)} className={cn("grid items-center gap-3 bg-white px-4 py-3", cols, rowHover)}>
        <div onClick={(e) => e.stopPropagation()}><Checkbox /></div>
        <div className="flex min-w-0 items-center gap-3">
          <ExpandChevron open={open} />
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-line">
            <Img src={article.product.img} monogram="HB" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-bold text-ink">{article.product.name}</p>
            <p className="truncate text-sm text-muted">{article.product.art} — {article.product.color}</p>
          </div>
        </div>
        <MetricValue bold d={deltaVal(article.seed, 1, seasonB)}>{article.stock}</MetricValue>
        <MetricValue d={deltaVal(article.seed, 2, seasonB)}><Target target={article.target} stock={article.stock} /></MetricValue>
        <MetricValue d={deltaVal(article.seed, 3, seasonB)}>{article.str}</MetricValue>
        <Cell>{article.healthStatuses.map((h, i) => <Tag key={i} tone={h.tone}>{h.label}</Tag>)}</Cell>
        <Cell>{statuses.map((st, i) => <Tag key={i} tone={st.tone}>{st.label}</Tag>)}</Cell>
        {recommend && <Reco seed={article.seed} />}
        <div className="flex justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <Button variant="outline" size="sm" icon={Plus} onClick={addAll}>Add to all</Button>
        </div>
      </div>
      {open && article.retailers.map((r) => (
        <RetailerRow key={r.id} retailer={r} active={active} onStore={setStore} onAddAll={() => addRetailer(r.id)}
          cols={cols} seasonB={seasonB} recommend={recommend} onAdjust={onAdjust} />
      ))}
    </div>
  );
}

function RetailerRow({ retailer, active, onStore, onAddAll, cols, seasonB, recommend, onAdjust }) {
  const [open, setOpen] = useState(false);
  const act = retailer.children.filter((s, i) => active[retailer.id + ":" + i]).length;
  const statuses = statusPills(act, retailer.children.length - act);

  return (
    <>
      <div onClick={() => setOpen((o) => !o)} className={cn("grid items-center gap-3 bg-white px-4 py-3", cols, rowHover)}>
        <div onClick={(e) => e.stopPropagation()}><Checkbox /></div>
        <div className="flex min-w-0 items-center gap-3 pl-7">
          <ExpandChevron open={open} />
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md border border-line">
            <BrandTile retailer={retailer.retailer} />
          </div>
          <div className="min-w-0">
            <p className="truncate font-bold text-ink">{retailer.retailer.name}</p>
            <p className="truncate text-sm text-muted">{retailer.stores} stores</p>
          </div>
        </div>
        <MetricValue bold d={deltaVal(retailer.seed, 1, seasonB)}>{retailer.stock}</MetricValue>
        <MetricValue d={deltaVal(retailer.seed, 2, seasonB)}><Target target={retailer.target} stock={retailer.stock} /></MetricValue>
        <MetricValue d={deltaVal(retailer.seed, 3, seasonB)}>{retailer.str}</MetricValue>
        <Cell>{retailer.healthStatuses.map((h, i) => <Tag key={i} tone={h.tone}>{h.label}</Tag>)}</Cell>
        <Cell>{statuses.map((st, i) => <Tag key={i} tone={st.tone}>{st.label}</Tag>)}</Cell>
        {recommend && <Reco seed={retailer.seed} />}
        <div className="flex justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <Button variant="outline" size="sm" icon={Plus} onClick={onAddAll}>Add to all</Button>
        </div>
      </div>
      {open && retailer.children.map((s, i) => (
        <StoreRow key={i} store={s} active={!!active[retailer.id + ":" + i]} onToggle={(v) => onStore(retailer.id, i, v)}
          cols={cols} seasonB={seasonB} recommend={recommend} onAdjust={onAdjust} />
      ))}
    </>
  );
}

function StoreRow({ store, active, onToggle, cols, seasonB, recommend, onAdjust }) {
  return (
    <div className={cn("grid items-center gap-3 bg-surface/40 px-4 py-2.5 transition-colors hover:bg-surface", cols)}>
      <Checkbox />
      <div className="flex min-w-0 items-center gap-3 pl-[52px]">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted">
          <Store size={20} />
        </div>
        <div className="min-w-0">
          <p className="truncate font-bold text-ink">{store.name}</p>
          <p className="truncate text-sm text-muted">{store.city}</p>
        </div>
      </div>
      <MetricValue bold d={deltaVal(store.seed, 1, seasonB)}>{store.stock}</MetricValue>
      <span className="flex items-center gap-1.5 text-sm text-ink">
        {store.target}
        <Delta d={deltaVal(store.seed, 2, seasonB)} />
        {active && <TargetIconBtn onAdjust={onAdjust} />}
      </span>
      <MetricValue d={deltaVal(store.seed, 3, seasonB)}>{store.str}</MetricValue>
      <Cell>{health(store.health)}</Cell>
      <Cell><Tag tone={active ? "active" : "inactive"}>{active ? "active" : "Inactive"}</Tag></Cell>
      {recommend && <Reco seed={store.seed} />}
      <div className="flex justify-end gap-1">
        {active ? (
          <Button variant="ghost" size="sm" icon={Trash2} onClick={() => onToggle(false)}>Remove</Button>
        ) : (
          <Button variant="primary" size="sm" icon={Plus} onClick={() => onToggle(true)}>Add article</Button>
        )}
      </div>
    </div>
  );
}

/* =============== Target adjustment drawer (pushes the table left) =============== */
function TargetDrawer({ open, onClose }) {
  return (
    <div className={cn("shrink-0 self-stretch overflow-hidden transition-[width] duration-300 ease-out", open ? "w-[320px]" : "w-0")}>
      <div className="flex h-full w-[320px] flex-col rounded-panel bg-surface p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-h2 font-bold text-ink">Target stock quantities</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-ink-soft transition-colors hover:bg-white/60"
          >
            <X size={18} />
          </button>
        </div>
        <p className="mt-6 text-sm text-ink-soft">
          This part of the prototype runs on mock data for concept presentation only and isn't
          built yet.
        </p>
      </div>
    </div>
  );
}
