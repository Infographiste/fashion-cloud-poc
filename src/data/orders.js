import { catalog, byId, retailers } from "./catalog.js";

export const orderTabs = [
  { value: "all", label: "All" },
  { value: "preorder", label: "Preorder" },
  { value: "reorder", label: "Reorder" },
  { value: "returns", label: "Return Requests" },
  { value: "cancelled", label: "Cancelled Styles" },
];

const reasons = ["Season end return", "Quality issue", "Wrong delivery", "Overstock"];

export const returnRequests = [
  { id: "rr1", product: byId.harrington, pieces: 12, reason: reasons[0], photos: [byId.harrington.img, byId.holdall.img], message: "As discussed over the phone" },
  { id: "rr2", product: byId.polo, pieces: 8, reason: reasons[1], photos: [], message: "" },
  { id: "rr3", product: byId.loafer, pieces: 24, reason: reasons[0], photos: [], message: "" },
  { id: "rr4", product: byId.blazer, pieces: 6, reason: reasons[1], photos: [byId.blazer.img], message: "See attachment" },
  { id: "rr5", product: byId.runner, pieces: 18, reason: reasons[3], photos: [], message: "" },
  { id: "rr6", product: byId.tie, pieces: 4, reason: reasons[2], photos: [], message: "Damaged in transit" },
];

export const returnsTotal = returnRequests.reduce((s, r) => s + r.pieces, 0);

// Cancelled styles grouped per order.
const styleRow = (product, pieces, budget) => ({ product, pieces, budget });

export const cancelledOrders = [
  {
    orderNr: "PREO013898", date: "Mar 3, 2026", retailer: retailers[2].name, store: "Breuninger Stuttgart",
    gln: "4399902321556", type: "Pre Order", brand: "BOSS Menswear", pieces: 21, budget: "€ 2,410.35",
    styles: [
      styleRow(byId.blazer, 8, "€ 1,240.00"),
      styleRow(byId.loafer, 6, "€ 870.35"),
      styleRow(byId.tie, 7, "€ 300.00"),
    ],
  },
  {
    orderNr: "PREO013912", date: "Mar 5, 2026", retailer: retailers[0].name, store: "De Bijenkorf Amsterdam",
    gln: "4399902321557", type: "Pre Order", brand: "BOSS Menswear", pieces: 14, budget: "€ 1,980.00",
    styles: [
      styleRow(byId.harrington, 9, "€ 1,530.00"),
      styleRow(byId.polo, 5, "€ 450.00"),
    ],
  },
  {
    orderNr: "REO004521", date: "Mar 8, 2026", retailer: retailers[1].name, store: "ABOUT YOU Online",
    gln: "4399902321558", type: "Reorder", brand: "BOSS Menswear", pieces: 12, budget: "€ 1,120.50",
    styles: [
      styleRow(byId.sneaker_white ?? byId["sneaker-white"], 12, "€ 1,120.50"),
    ],
  },
];

export { catalog };
