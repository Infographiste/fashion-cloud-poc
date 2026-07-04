import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, MoreVertical, Box, Images, FileText, ChevronDown } from "lucide-react";
import { Top, HeroBanner } from "../components/layout/Top.jsx";
import { Tabs } from "../components/ds/Tabs.jsx";
import { Panel, SectionHeader } from "../components/ds/Panel.jsx";
import { Card } from "../components/ds/Card.jsx";
import { KpiCard } from "../components/ds/KpiCard.jsx";
import { BrandTile, HangerIcon } from "../components/ds/Media.jsx";
import { Checkbox } from "../components/primitives/Checkbox.jsx";
import { Tag } from "../components/primitives/Tag.jsx";
import { Button } from "../components/primitives/Button.jsx";
import { MenuLabel, MenuItem, MenuSeparator } from "../components/primitives/Popover.jsx";
import { portalTabs, tasksByTab, moreTasks, kpiGroups } from "../data/portal.jsx";
import { images } from "../data/images.js";
import { byRetailer } from "../data/catalog.js";
import { cn } from "../lib/cn.js";

const tasksMenu = (
  <>
    <MenuLabel>Show task types</MenuLabel>
    <MenuItem>Preorder</MenuItem>
    <MenuItem>Reorder</MenuItem>
    <MenuItem>After Sales</MenuItem>
    <MenuSeparator />
    <MenuItem>Collapse completed</MenuItem>
    <MenuItem danger>Clear all</MenuItem>
  </>
);

const kpiMenu = (
  <>
    <MenuLabel>Show KPIs</MenuLabel>
    <MenuItem>PreOrder</MenuItem>
    <MenuItem>ReOrder</MenuItem>
    <MenuItem>After Sales</MenuItem>
    <MenuSeparator />
    <MenuItem>Compare to last season</MenuItem>
  </>
);

export default function Portal() {
  const [tab, setTab] = useState("all");
  const [renderTab, setRenderTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [completing, setCompleting] = useState({});
  const [removed, setRemoved] = useState({});
  const [extra, setExtra] = useState([]);
  const [kpiCollapsed, setKpiCollapsed] = useState(false);

  const changeTab = (next) => {
    setTab(next);
    if (next === renderTab) return;
    setLoading(true);
    setExtra([]);
    setTimeout(() => {
      setRenderTab(next);
      setLoading(false);
    }, 300);
  };

  const complete = (id) => {
    setCompleting((c) => ({ ...c, [id]: true }));
    setTimeout(() => setRemoved((r) => ({ ...r, [id]: true })), 340);
  };

  const loadMore = () => {
    setExtra((prev) => {
      const batch = [0, 1, 2].map((k) => {
        const src = moreTasks[(prev.length + k) % moreTasks.length];
        return { ...src, id: `${renderTab}-more-${prev.length + k}` };
      });
      return [...prev, ...batch];
    });
  };

  const base = tasksByTab[renderTab] || tasksByTab.all;
  const visible = [...base, ...extra].filter((t) => !removed[t.id]);
  const empty = visible.length === 0;

  return (
    <>
      <Top
        banner={<HeroBanner image={images.bannerHome} eyebrow="Wholesale Portal" title="Welcome Franka!" />}
        tabs={<Tabs items={portalTabs} value={tab} onChange={changeTab} />}
      />

      <div className="flex flex-col gap-2 lg:flex-row">
        <Panel className="flex min-w-0 flex-1 flex-col">
          <SectionHeader title="Tasks" menu={tasksMenu} />
          <div className={cn("flex flex-1 flex-col transition-opacity duration-200", loading ? "opacity-0" : "opacity-100")}>
            {empty ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 py-16 text-center">
                <div>
                  <h3 className="text-h1 font-bold text-ink">Good job today</h3>
                  <p className="mt-1 text-sm text-ink-soft">Would you like to see more suggestions?</p>
                </div>
                <Button variant="primary" size="md" onClick={loadMore}>Load more tasks</Button>
              </div>
            ) : (
              <>
                <div key={renderTab} className="flex animate-fadein flex-col gap-2">
                  {visible.map((t) => (
                    <TaskCard key={t.id} task={t} completing={!!completing[t.id]} onComplete={() => complete(t.id)} />
                  ))}
                </div>
                <div className="mt-6 flex justify-center">
                  <Button variant="secondary" size="sm" className="shadow-raise" onClick={loadMore}>Load more tasks</Button>
                </div>
              </>
            )}
          </div>
        </Panel>

        <aside className={cn("flex w-full shrink-0 lg:w-[340px]", kpiCollapsed && "lg:self-start")}>
          <Panel className={cn("flex w-full flex-col", !kpiCollapsed && "lg:h-full")}>
            <SectionHeader
              title="KPIs"
              menu={kpiMenu}
              right={
                <button
                  onClick={() => setKpiCollapsed((v) => !v)}
                  aria-label={kpiCollapsed ? "Expand KPIs" : "Collapse KPIs"}
                  className="flex h-8 w-8 items-center justify-center rounded-md text-ink-soft transition-colors hover:bg-white/60"
                >
                  <ChevronDown size={20} className={cn("transition-transform", kpiCollapsed && "-rotate-90")} />
                </button>
              }
            />
            <div className={cn("flex flex-col gap-4 overflow-hidden transition-all duration-300", kpiCollapsed ? "max-h-0 opacity-0" : "max-h-[2000px] opacity-100")}>
              {kpiGroups.map((g) => (
                <div key={g.group} className="flex flex-col gap-2">
                  <p className="text-xs text-ink-soft">{g.group}</p>
                  {g.items.map((k, i) => (
                    <KpiCard key={i} {...k} />
                  ))}
                </div>
              ))}
            </div>
          </Panel>
        </aside>
      </div>
    </>
  );
}

function TaskThumb({ thumb }) {
  const base = "flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md border border-line bg-white";
  if (thumb.type === "logo") {
    return (
      <div className={cn(base, "self-center")}>
        <BrandTile retailer={byRetailer[thumb.retailer]} variant="light" />
      </div>
    );
  }
  const icons = { box: Box, images: Images, file: FileText };
  const Icon = icons[thumb.icon];
  return (
    <div className={cn(base, "self-center text-muted")}>
      {thumb.icon === "hanger" ? <HangerIcon /> : Icon ? <Icon size={24} strokeWidth={1.8} /> : null}
    </div>
  );
}

function TaskCard({ task, completing, onComplete }) {
  const navigate = useNavigate();
  const done = completing;

  return (
    <div
      className={cn(
        "group transition-all duration-300 ease-out",
        done ? "max-h-0 -my-1 scale-[0.98] opacity-0" : "max-h-48 py-0 opacity-100 hover:py-1"
      )}
    >
      <Card
        orientation="row"
        interactive
        onClick={() => navigate(task.to)}
        className={cn("items-center", done && "!border-transparent !bg-state-activeBg")}
      >
        <div className="flex items-center px-1" onClick={(e) => e.stopPropagation()}>
          <Checkbox checked={done} onChange={onComplete} aria-label="Complete task" />
        </div>
        <TaskThumb thumb={task.thumb} />
        <Card.Content className="items-center">
          <Card.Header className="flex-1">
            <p className="truncate text-h2 leading-[30px] text-ink">{task.title}</p>
          </Card.Header>
          <Card.Info className="!flex-none flex-row items-center">
            <Tag tone={done ? "active" : task.tag.tone} icon={done ? undefined : task.tag.icon}>
              {done ? "Completed" : task.tag.label}
            </Tag>
          </Card.Info>
          <Card.Actions>
            {task.action.kind === "button" ? (
              <Button variant="secondary" size="md" iconRight={ChevronRight} className="fc-task-cta">
                {task.action.label}
              </Button>
            ) : (
              <Button variant="ghost" size="md" icon={MoreVertical} aria-label="More" onClick={(e) => e.stopPropagation()} />
            )}
          </Card.Actions>
        </Card.Content>
      </Card>
    </div>
  );
}
