import { cover } from "./images.js";
import { retailers } from "./catalog.js";

export const showroomTabs = [
  { value: "mine", label: "My Presentations" },
  { value: "new", label: "New Presentation" },
  { value: "backstage", label: "Showroom Backstage" },
];

const names = [
  "FW26 Buying Session", "Pre-Spring Edit", "Core Carryover Review",
  "Tailoring Focus", "Athleisure Capsule", "Key Account Preview",
  "Accessories Deep-Dive", "Footwear Reorder", "Holiday Gifting", "Denim Story",
];

const p = (i, master) => {
  const r = retailers[i % retailers.length];
  return {
    id: i + 1,
    customer: r.name,
    presentation: names[i % names.length],
    collection: "BOSS Menswear",
    season: "Summer 2026",
    created: "25 June 2026 15:30",
    updated: "26-06-26 15:30",
    type: master ? { label: "Master", tone: "info" } : { label: "Self Service", tone: "primary" },
    ordered: "Order sent 25-12-13",
    master,
    cover: cover(i),
  };
};

export const presentations = Array.from({ length: 10 }, (_, i) => p(i, i % 3 === 2));
