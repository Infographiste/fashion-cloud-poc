import { byId, retailers } from "./catalog.js";

export const reorderTabs = [
  { value: "auto", label: "Auto Restock" },
  { value: "reorder", label: "Reorder" },
  { value: "recommendations", label: "Recommendations" },
  { value: "insights", label: "Insights" },
  { value: "history", label: "Order History" },
];

export const healthLabel = { good: "Good", poor: "Poor", critical: "Critical" };

const S = (name, city, stock, target, health, tone, label, sales, turn, str) => ({
  name, city, stock, target, health, status: { label, tone }, sales, turn, str,
});

const nlStores = [
  ["Amsterdam — Dam", "Amsterdam"], ["Rotterdam — Beurs", "Rotterdam"],
  ["Den Haag — Centrum", "Den Haag"], ["Utrecht — Hoog", "Utrecht"], ["Eindhoven — Piazza", "Eindhoven"],
];
const deStores = [
  ["Hamburg — Mönckeberg", "Hamburg"], ["Berlin — Mitte", "Berlin"],
  ["München — Kaufinger", "München"], ["Köln — Schildergasse", "Köln"], ["Frankfurt — Zeil", "Frankfurt"],
];

// mix of health/status pills, mirroring the "Status per store" column
const healthMix = (counts) => {
  const out = [];
  if (counts.critical) out.push({ tone: "critical", label: `${counts.critical} critical` });
  if (counts.poor) out.push({ tone: "poor", label: `${counts.poor} poor` });
  if (counts.good) out.push({ tone: "good", label: `${counts.good} good` });
  return out;
};

let sid = 0;
const mkStores = (pool, n) =>
  pool.slice(0, n).map(([name, city], i) => {
    sid++;
    const good = i % 3 !== 1;
    const obj = S(
      name, city,
      4 + ((sid * 3) % 8), 10,
      good ? (i % 2 ? "good" : "poor") : "critical",
      good ? "active" : "inactive",
      good ? "active" : "Inactive",
      90 + ((sid * 17) % 180), (1.8 + ((sid * 7) % 26) / 10).toFixed(1) + " X",
      (70 + ((sid * 11) % 26)) + " %"
    );
    obj.seed = sid;
    return obj;
  });

const countHealth = (stores) =>
  stores.reduce((acc, s) => ((acc[s.health] = (acc[s.health] || 0) + 1), acc), {});

let rid = 0;
const mkRetailer = (r, storePool, nStores) => {
  rid++;
  const children = mkStores(storePool, nStores);
  const activeCount = children.filter((c) => c.status.tone === "active").length;
  const statuses = [{ label: `${activeCount} active`, tone: "active" }];
  if (nStores - activeCount > 0) statuses.push({ label: `${nStores - activeCount} inactive`, tone: "inactive" });
  return {
    id: "R" + rid, seed: rid, retailer: r, stores: nStores,
    stock: 12 + ((rid * 5) % 30), target: 45, health: rid % 3 === 0 ? "good" : "critical",
    sales: 150 + ((rid * 13) % 120), turn: (2.1 + ((rid * 9) % 22) / 10).toFixed(1) + " X",
    str: (70 + ((rid * 7) % 26)) + " %",
    statuses, healthStatuses: healthMix(countHealth(children)), children,
  };
};

let aid = 0;
const article = (product, stock, target, health, statuses, retailerDefs) => {
  aid++;
  const retailerList = retailerDefs.map(([r, pool, n]) => mkRetailer(r, pool, n));
  const allStores = retailerList.flatMap((r) => r.children);
  return {
    id: "A" + aid, seed: aid, product, stock, target, health,
    str: (70 + ((aid * 5) % 26)) + " %", statuses,
    healthStatuses: healthMix(countHealth(allStores)),
    retailers: retailerList,
  };
};

const st = (a, e, i) => {
  const out = [{ label: `${a} active`, tone: "active" }];
  if (e) out.push({ label: `${e} expiring`, tone: "expiring" });
  if (i) out.push({ label: `${i} inactive`, tone: "inactive" });
  return out;
};

export const reorderTable = [
  article(byId.blazer, 89, 150, "critical", st(8, 2, 1), [[retailers[0], nlStores, 5], [retailers[1], deStores, 3]]),
  article(byId.polo, 132, 180, "poor", st(6, 1, 0), [[retailers[2], deStores, 4]]),
  article(byId.loafer, 240, 200, "good", st(9, 0, 0), [[retailers[3], deStores, 2], [retailers[0], nlStores, 3]]),
  article(byId.harrington, 76, 140, "critical", st(4, 2, 2), [[retailers[5], nlStores, 3], [retailers[6], deStores, 2]]),
  article(byId.runner, 310, 260, "good", st(11, 0, 0), [[retailers[1], deStores, 4]]),
  article(byId["sneaker-white"], 154, 190, "poor", st(7, 1, 1), [[retailers[0], nlStores, 4], [retailers[4], deStores, 2]]),
  article(byId["sneaker-navy"], 98, 160, "critical", st(5, 1, 2), [[retailers[7], nlStores, 2]]),
  article(byId.holdall, 64, 90, "critical", st(3, 1, 1), [[retailers[6], deStores, 3]]),
  article(byId.tie, 205, 180, "good", st(9, 1, 0), [[retailers[2], deStores, 3], [retailers[8], nlStores, 2]]),
  article(byId.swim, 42, 120, "critical", st(2, 2, 3), [[retailers[3], deStores, 3]]),
  article(byId.briefcase, 118, 130, "poor", st(6, 0, 1), [[retailers[5], nlStores, 2]]),
  article(byId["sneaker-brown"], 176, 170, "good", st(8, 1, 0), [[retailers[1], deStores, 3], [retailers[7], nlStores, 2]]),
];
