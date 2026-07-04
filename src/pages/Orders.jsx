import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronsUpDown } from "lucide-react";
import { Top, TitleBanner } from "../components/layout/Top.jsx";
import { Tabs } from "../components/ds/Tabs.jsx";
import { Panel } from "../components/ds/Panel.jsx";
import { Card } from "../components/ds/Card.jsx";
import { Checkbox } from "../components/primitives/Checkbox.jsx";
import { Button } from "../components/primitives/Button.jsx";
import { Img } from "../components/primitives/Img.jsx";
import { SearchInput, Select } from "../components/primitives/Field.jsx";
import { FilterBar } from "../components/layout/FilterBar.jsx";
import { orderTabs, returnRequests, returnsTotal, cancelledOrders } from "../data/orders.js";
import { EmptyState } from "../components/ds/EmptyState.jsx";
import { cn } from "../lib/cn.js";

export default function Orders() {
  const [sp] = useSearchParams();
  const initial = ["all", "preorder", "reorder", "returns", "cancelled"].includes(sp.get("tab")) ? sp.get("tab") : "returns";
  const [tab, setTab] = useState(initial);

  const filters =
    tab === "cancelled" ? (
      <FilterBar className="lg:grid-cols-3 xl:grid-cols-3">
        <SearchInput placeholder="Search by Name, Customer…" />
        <Select label="Retailer" placeholder="Retailer" />
        <Select label="Order Types" placeholder="Order Types" />
      </FilterBar>
    ) : (
      <FilterBar className="lg:grid-cols-2 xl:grid-cols-2">
        <Select label="Retailer" value="Number Nine" onClear={() => {}} />
        <SearchInput placeholder="Search by Name, Customer…" />
      </FilterBar>
    );

  return (
    <>
      <Top
        banner={<TitleBanner title="Orders" />}
        tabs={<Tabs items={orderTabs} value={tab} onChange={setTab} />}
        filters={filters}
      />
      {tab === "returns" && <ReturnRequests />}
      {tab === "cancelled" && <CancelledStyles />}
      {tab !== "returns" && tab !== "cancelled" && (
        <EmptyState label={orderTabs.find((t) => t.value === tab)?.label} />
      )}
    </>
  );
}

/* ---------------- Return Requests ---------------- */
const RR = "grid-cols-[28px_minmax(200px,1.4fr)_70px_minmax(140px,1fr)_150px_minmax(160px,1fr)_170px]";

function ReturnRequests() {
  return (
    <Panel className="!p-0 overflow-hidden">
      <div className={cn("grid items-center gap-3 px-6 py-5 text-sm font-bold text-ink-soft", RR)}>
        <span />
        <button className="flex items-center gap-1">Article <ChevronsUpDown size={14} className="text-muted" /></button>
        <span>Pieces</span>
        <span>Reason for return</span>
        <span>Photos</span>
        <span>Message</span>
        <span />
      </div>
      <div className="flex flex-col">
        {returnRequests.map((r) => (
          <div key={r.id} className={cn("grid items-center gap-3 border-t border-line bg-white px-6 py-4", RR)}>
            <Checkbox />
            <div className="flex min-w-0 items-center gap-3">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-line">
                <Img src={r.product.img} monogram="HB" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-bold text-ink">{r.product.name}</p>
                <p className="truncate text-sm text-muted">{r.product.art}</p>
              </div>
            </div>
            <span className="text-sm font-bold text-ink">{r.pieces}</span>
            <span className="text-sm text-ink-soft">{r.reason}</span>
            <div className="flex gap-1.5">
              {r.photos.slice(0, 2).map((src, i) => (
                <div key={i} className="h-11 w-11 overflow-hidden rounded-md border border-line">
                  <Img src={src} monogram="" />
                </div>
              ))}
            </div>
            <span className={cn("text-sm", r.message ? "text-ink-soft" : "text-muted")}>{r.message || "—"}</span>
            <div className="flex items-center justify-end gap-2">
              <Button variant="danger" size="sm">Deny</Button>
              <Button variant="tertiary" size="sm" className="!bg-primary-weak !text-primary">Approve</Button>
            </div>
          </div>
        ))}
      </div>
      <div className="py-4 text-center text-sm text-ink-soft">Total pieces: <b className="text-ink">{returnsTotal}</b></div>
    </Panel>
  );
}

/* ---------------- Cancelled Styles ---------------- */
function CancelledStyles() {
  return (
    <div className="flex flex-col gap-2">
      {cancelledOrders.map((o) => (
        <Panel key={o.orderNr} className="!p-0 overflow-hidden">
          <div className="grid grid-cols-2 gap-y-3 px-6 py-4 md:grid-cols-4 xl:grid-cols-8">
            <Meta label="Order Nr" value={o.orderNr} />
            <Meta label="Date" value={o.date} />
            <Meta label="Retailer" value={o.retailer} />
            <Meta label="Store" value={o.store} />
            <Meta label="GLN" value={o.gln} />
            <Meta label="Type" value={o.type} />
            <Meta label="Impacted Pieces" value={o.pieces} />
            <Meta label="Impacted Budget" value={o.budget} />
          </div>

          <div className="grid grid-cols-[minmax(200px,1.6fr)_120px_minmax(120px,1fr)_120px_120px_200px] items-center gap-3 bg-surface px-6 py-2.5 text-xs font-bold uppercase tracking-wide text-ink-soft">
            <span>Cancelled Style</span><span>Art Code</span><span>Brand</span>
            <span>Impacted Pieces</span><span>Impacted Budget</span><span className="text-right">Actions</span>
          </div>

          {o.styles.map((s, i) => (
            <div key={i} className="grid grid-cols-[minmax(200px,1.6fr)_120px_minmax(120px,1fr)_120px_120px_200px] items-center gap-3 border-t border-line bg-white px-6 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md border border-line">
                  <Img src={s.product.img} monogram="HB" />
                </div>
                <span className="truncate font-bold text-ink">{s.product.name}</span>
              </div>
              <span className="text-sm text-ink-soft">{s.product.art}</span>
              <span className="text-sm text-ink-soft">{o.brand}</span>
              <span className="text-sm font-bold text-ink">{s.pieces}</span>
              <span className="text-sm text-ink">{s.budget}</span>
              <div className="flex flex-col items-end gap-1">
                <Button variant="tertiary" size="sm">Contact retailer</Button>
                <Button variant="secondary" size="sm">Replace style</Button>
              </div>
            </div>
          ))}
        </Panel>
      ))}
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-muted">{label}</p>
      <p className="truncate text-sm font-medium text-ink">{value}</p>
    </div>
  );
}
