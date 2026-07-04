import { retailers } from "./catalog.js";

export const customerTabs = [
  { value: "mine", label: "My Retailers" },
  { value: "requests", label: "Open Requests (9)" },
  { value: "explore", label: "Explore Retailers" },
];

// Flat list of retailer accounts (POC).
export const customers = retailers.map((r, i) => ({
  id: r.id,
  name: r.name,
  color: r.color,
  ink: r.ink,
  account: i % 5 === 3 ? "Pending" : "Active",
  addr: r.addr,
  country: r.country,
  access: i % 2 === 0 ? "Full catalog" : "Custom",
}));
