import { Presentation, Box, RotateCcw, Images } from "lucide-react";

export const portalTabs = [
  { value: "all", label: "All" },
  { value: "preorder", label: "Preorder" },
  { value: "reorder", label: "Reorder" },
  { value: "aftersales", label: "Aftersales" },
  { value: "content", label: "Content" },
];

const PRE = { label: "Preorder", tone: "primary", icon: Presentation };
const REO = { label: "Reorder", tone: "primary", icon: Box };
const AFT = { label: "After Sales", tone: "primary", icon: RotateCcw };
const CON = { label: "Content", tone: "primary", icon: Images };
const btn = (label) => ({ kind: "button", label });

// "All" — the default mixed set.
const allTasks = [
  { id: "t1", title: (<>Prepare your upcoming <b>appointment</b> with <b>De Bijenkorf</b></>), tag: PRE, action: btn("Prepare a Presentation"), thumb: { type: "logo", retailer: "bijenkorf" }, to: "/showroom?master=1" },
  { id: "t2", title: (<>Review <b>Self Service order</b> from <b>Jansen Mode</b></>), tag: PRE, action: btn("Review Order"), thumb: { type: "logo", retailer: "jansen" }, to: "/showroom?review=1" },
  { id: "t3", title: (<><b>5 submitted orders</b> have been impacted by a <b>cancelled style</b></>), tag: PRE, action: btn("Fix articles"), thumb: { type: "icon", icon: "hanger" }, to: "/orders?tab=cancelled" },
  { id: "t4", title: "3 Bestselling articles are not active in all Smart Replenishment assortments", tag: REO, action: btn("Add articles"), thumb: { type: "icon", icon: "box" }, to: "/reorder" },
  { id: "t5", title: "4 Return Requests from Number Nine need approval", tag: AFT, action: btn("Review requests"), thumb: { type: "logo", retailer: "numbernine" }, to: "/orders?tab=returns" },
  { id: "t6", title: "Stock file for FW26 is ready to review and publish", tag: REO, action: btn("Review file"), thumb: { type: "icon", icon: "box" }, to: "/reorder" },
];

const preorder = [
  { id: "p1", title: (<>Prepare your upcoming <b>appointment</b> with <b>De Bijenkorf</b></>), tag: PRE, action: btn("Prepare a Presentation"), thumb: { type: "logo", retailer: "bijenkorf" }, to: "/showroom?master=1" },
  { id: "p2", title: (<>Review <b>Self Service order</b> from <b>Jansen Mode</b></>), tag: PRE, action: btn("Review Order"), thumb: { type: "logo", retailer: "jansen" }, to: "/showroom?review=1" },
  { id: "p3", title: (<><b>5 submitted orders</b> have been impacted by a <b>cancelled style</b></>), tag: PRE, action: btn("Fix articles"), thumb: { type: "icon", icon: "hanger" }, to: "/orders?tab=cancelled" },
  { id: "p4", title: (<>The <b>FW26 master presentation</b> needs your sign-off</>), tag: PRE, action: btn("Open presentation"), thumb: { type: "logo", retailer: "bijenkorf" }, to: "/showroom?master=1" },
  { id: "p5", title: (<><b>Peek & Cloppenburg</b> requested a preorder appointment</>), tag: PRE, action: btn("Prepare a Presentation"), thumb: { type: "logo", retailer: "pc" }, to: "/showroom" },
];

const reorder = [
  { id: "r1", title: "3 Bestselling articles are not active in all Smart Replenishment assortments", tag: REO, action: btn("Add articles"), thumb: { type: "icon", icon: "box" }, to: "/reorder" },
  { id: "r2", title: (<><b>Zalando</b> assortment plan is awaiting your approval</>), tag: REO, action: btn("Open assortment"), thumb: { type: "logo", retailer: "zalando" }, to: "/reorder" },
  { id: "r3", title: "Stock file for FW26 is ready to review and publish", tag: REO, action: btn("Review file"), thumb: { type: "icon", icon: "box" }, to: "/reorder" },
  { id: "r4", title: "Auto-restock proposal is ready for 12 articles", tag: REO, action: btn("Review proposal"), thumb: { type: "icon", icon: "box" }, to: "/reorder" },
  { id: "r5", title: (<>Low stock: <b>Runner sneaker</b> is below target in 4 stores</>), tag: REO, action: btn("View article"), thumb: { type: "icon", icon: "box" }, to: "/reorder" },
];

const aftersales = [
  { id: "a1", title: "4 Return Requests from Number Nine need approval", tag: AFT, action: btn("Review requests"), thumb: { type: "logo", retailer: "numbernine" }, to: "/orders?tab=returns" },
  { id: "a2", title: (<>Return window closes in <b>3 days</b> for <b>Galeries Lafayette</b></>), tag: AFT, action: btn("Review requests"), thumb: { type: "logo", retailer: "galeries" }, to: "/orders?tab=returns" },
  { id: "a3", title: "2 credit notes are awaiting your confirmation", tag: AFT, action: btn("Review notes"), thumb: { type: "icon", icon: "file" }, to: "/orders" },
  { id: "a4", title: (<><b>Selfridges</b> reported a delivery discrepancy</>), tag: AFT, action: btn("View order"), thumb: { type: "logo", retailer: "selfridges" }, to: "/orders" },
];

const content = [
  { id: "c1", title: "12 new FW26 product images are ready to publish", tag: CON, action: btn("Review content"), thumb: { type: "icon", icon: "images" }, to: "/content" },
  { id: "c2", title: "Update size charts for the BOSS Menswear catalogue", tag: CON, action: btn("Open catalogue"), thumb: { type: "icon", icon: "file" }, to: "/content" },
  { id: "c3", title: "3 products are missing marketing copy", tag: CON, action: btn("Add copy"), thumb: { type: "icon", icon: "file" }, to: "/content" },
  { id: "c4", title: "Seasonal lookbook draft is ready for review", tag: CON, action: btn("Review lookbook"), thumb: { type: "icon", icon: "images" }, to: "/content" },
];

export const tasksByTab = { all: allTasks, preorder, reorder, aftersales, content };

// Backwards-compatible export (the default list).
export const tasks = allTasks;

// Extra tasks appended when "Load more tasks" is clicked.
export const moreTasks = [
  { title: (<>New <b>EDI connection</b> request from <b>Breuninger</b></>), tag: REO, action: btn("Review connection"), thumb: { type: "logo", retailer: "breuninger" }, to: "/customers" },
  { title: (<><b>Zalando</b> assortment plan is awaiting your approval</>), tag: REO, action: btn("Open assortment"), thumb: { type: "logo", retailer: "zalando" }, to: "/reorder" },
  { title: (<>Presentation request from <b>Peek & Cloppenburg</b></>), tag: PRE, action: btn("Prepare a Presentation"), thumb: { type: "logo", retailer: "pc" }, to: "/showroom" },
  { title: (<>Return window closes in <b>3 days</b> for <b>Galeries Lafayette</b></>), tag: AFT, action: btn("Review requests"), thumb: { type: "logo", retailer: "galeries" }, to: "/orders?tab=returns" },
  { title: (<><b>Selfridges</b> order 25-12-13 has been confirmed</>), tag: AFT, action: btn("View order"), thumb: { type: "logo", retailer: "selfridges" }, to: "/orders" },
  { title: "12 new FW26 product images are ready to publish", tag: CON, action: btn("Review content"), thumb: { type: "icon", icon: "images" }, to: "/content" },
];

export const kpiGroups = [
  {
    group: "PreOrder",
    items: [
      { label: "Fall/Winter 2026 Target", value: "€ 234,000", delta: "+2.1%", caption: "compared to Fall/Winter 2025" },
      { label: "Fall/Winter 2026 Order Value", value: "€ 256,000", delta: "+2.1%", caption: "compared to Fall/Winter 2025" },
      { label: "Reorder Share", value: "40%", delta: "-2.1%", caption: "15% Smart Rep, 10% EDI, 10% B2B, 5% CS" },
    ],
  },
  {
    group: "ReOrder",
    items: [
      { label: "Fall/Winter 2026 Forecast", value: "€ 231,000", delta: "+2.1%", caption: "compared to Fall/Winter 2025" },
      { label: "Open-to-Buy remaining", value: "€ 48,900", delta: "+4.4%", caption: "across 9 active retailers" },
      { label: "Average Stock Turn", value: "3.2 X", delta: "+0.3", caption: "vs 2.9 X last season" },
    ],
  },
];
