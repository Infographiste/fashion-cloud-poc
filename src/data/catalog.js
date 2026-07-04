import { productImg } from "./images.js";

// ---- Hugo Boss FW26 catalog (mock, POC) ----
export const catalog = [
  { id: "blazer", name: "Slim-Fit Houndstooth Blazer", art: "50511357", color: "Open Green", cat: "Tailoring", img: productImg("look-model") },
  { id: "belt", name: "Italian Suede Belt", art: "50488002", color: "Light Beige", cat: "Accessories", img: productImg("belt") },
  { id: "loafer", name: "Colby Leather Loafers", art: "50503412", color: "Dark Green", cat: "Shoes", img: productImg("loafer") },
  { id: "harrington", name: "Cotton Harrington Jacket", art: "50515678", color: "Light Beige", cat: "Outerwear", img: productImg("harrington") },
  { id: "swim", name: "Recycled Print Swim Shorts", art: "50499021", color: "Olive", cat: "Swimwear", img: productImg("swimshorts") },
  { id: "polo", name: "Mercerised Knitted Polo", art: "50502988", color: "Ochre", cat: "Knitwear", img: productImg("polo") },
  { id: "sneaker-navy", name: "Clay Leather Trainers", art: "50496655", color: "Dark Blue", cat: "Shoes", img: productImg("sneaker-navy") },
  { id: "sneaker-white", name: "Bumper Cupsole Trainers", art: "50496656", color: "White", cat: "Shoes", img: productImg("sneaker-white") },
  { id: "sneaker-brown", name: "Bumper Leather Trainers", art: "50496657", color: "Dark Brown", cat: "Shoes", img: productImg("sneaker-brown") },
  { id: "holdall", name: "Saffiano Holdall", art: "50488900", color: "Dark Green", cat: "Bags", img: productImg("holdall-top") },
  { id: "briefcase", name: "Zair Saffiano Workbag", art: "50488901", color: "Dark Green", cat: "Bags", img: productImg("briefcase") },
  { id: "tie", name: "Silk Jacquard Tie", art: "50477233", color: "Silver", cat: "Accessories", img: productImg("tie") },
  { id: "runner", name: "Kurt Nylon Runners", art: "50496700", color: "White / Grey", cat: "Shoes", img: productImg("runner-white") },
];

export const byId = Object.fromEntries(catalog.map((p) => [p.id, p]));

// ---- Wholesale customers (retailers) ----
export const retailers = [
  { id: "bijenkorf", name: "De Bijenkorf", color: "#E2001A", city: "Amsterdam", country: "Netherlands", addr: "Dam 1, 1012 JS Amsterdam" },
  { id: "aboutyou", name: "ABOUT YOU", color: "#111111", city: "Hamburg", country: "Germany", addr: "Domstraße 10, 20095 Hamburg" },
  { id: "breuninger", name: "Breuninger", color: "#1D1D1B", city: "Stuttgart", country: "Germany", addr: "Marktstraße 1–3, 70173 Stuttgart" },
  { id: "zalando", name: "Zalando", color: "#FF6900", city: "Berlin", country: "Germany", addr: "Valeska-Gert-Straße 5, 10243 Berlin" },
  { id: "pc", name: "Peek & Cloppenburg", color: "#0A2A66", city: "Düsseldorf", country: "Germany", addr: "Berliner Allee 2, 40212 Düsseldorf" },
  { id: "selfridges", name: "Selfridges", color: "#F2E600", ink: "#111", city: "London", country: "United Kingdom", addr: "400 Oxford St, London W1A 1AB" },
  { id: "galeries", name: "Galeries Lafayette", color: "#0F1E3D", city: "Paris", country: "France", addr: "40 Bd Haussmann, 75009 Paris" },
  { id: "numbernine", name: "Number Nine", color: "#111111", city: "Antwerp", country: "Belgium", addr: "Meir 78, 2000 Antwerpen" },
  { id: "jansen", name: "Jansen Mode", color: "#6B4F3A", city: "Utrecht", country: "Netherlands", addr: "Oudegracht 12, 3511 AA Utrecht" },
];

export const byRetailer = Object.fromEntries(retailers.map((r) => [r.id, r]));
