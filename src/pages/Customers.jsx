import { useState } from "react";
import { ChevronRight, ChevronsUpDown, Ban } from "lucide-react";
import { Top, TitleBanner } from "../components/layout/Top.jsx";
import { Tabs } from "../components/ds/Tabs.jsx";
import { Panel } from "../components/ds/Panel.jsx";
import { Card } from "../components/ds/Card.jsx";
import { BrandTile } from "../components/ds/Media.jsx";
import { Checkbox } from "../components/primitives/Checkbox.jsx";
import { Tag } from "../components/primitives/Tag.jsx";
import { SearchInput, Select } from "../components/primitives/Field.jsx";
import { FilterBar } from "../components/layout/FilterBar.jsx";
import { customerTabs, customers } from "../data/customers.js";
import { cn } from "../lib/cn.js";

const COLS = "grid-cols-[28px_minmax(180px,1.4fr)_120px_minmax(160px,1fr)_minmax(160px,1fr)_44px]";

export default function Customers() {
  const [tab, setTab] = useState("mine");
  return (
    <>
      <Top
        banner={<TitleBanner title="Customers" />}
        tabs={<Tabs items={customerTabs} value={tab} onChange={setTab} />}
        filters={
          <FilterBar className="lg:grid-cols-3 xl:grid-cols-3">
            <SearchInput placeholder="Search by Name, Customer…" />
            <Select label="Country" placeholder="Country" />
            <Select label="Access to" placeholder="Access to" />
          </FilterBar>
        }
      />

      <Panel>
        <div className={cn("grid items-center gap-3 px-3 pb-3 text-sm font-bold text-ink-soft", COLS)}>
          <span />
          <Th>Retailer Name</Th>
          <Th>Account Type</Th>
          <Th>Country</Th>
          <Th>Brand Access</Th>
          <span />
        </div>
        <div className="flex flex-col gap-2">
          {customers.map((c) => (
            <Row key={c.id} c={c} />
          ))}
        </div>
      </Panel>
    </>
  );
}

function Th({ children }) {
  return (
    <button className="flex items-center gap-1 text-left hover:text-ink">
      {children}
      <ChevronsUpDown size={14} className="text-muted" />
    </button>
  );
}

function Row({ c }) {
  return (
    <Card orientation="row" interactive className="items-center">
      <div className={cn("grid w-full items-center gap-3 px-1", COLS)}>
        <Checkbox />
        <div className="flex min-w-0 items-center gap-3">
          <div className="h-11 w-11 shrink-0 overflow-hidden rounded-md border border-line">
            <BrandTile retailer={c} />
          </div>
          <span className="truncate font-bold text-ink">{c.name}</span>
        </div>
        <Tag tone={c.account === "Active" ? "active" : "expiring"}>{c.account}</Tag>
        <div className="min-w-0 text-sm text-ink-soft">
          <p className="truncate">{c.addr}</p>
          <p className="truncate font-medium text-ink">{c.country}</p>
        </div>
        <div className="flex min-w-0 items-center gap-1.5 text-sm text-ink-soft">
          <Ban size={16} className="shrink-0 text-muted" />
          <span className="truncate">BOSS Menswear</span>
          <span className="font-bold text-ink">| {c.access}</span>
        </div>
        <ChevronRight size={18} className="justify-self-end text-muted" />
      </div>
    </Card>
  );
}
