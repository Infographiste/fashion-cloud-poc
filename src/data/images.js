// Central image registry — Hugo Boss FW26 assets live in /public/img.
// BASE_URL keeps paths correct under a GitHub Pages sub-path.
const B = import.meta.env.BASE_URL;
const P = (slug) => `${B}img/products/${slug}.jpg`;

export const images = {
  bannerHome: `${B}img/banner-home.png`,
};

// Presentation cover pool (Showroom) — mix of look + product imagery.
export const covers = [
  P("look-model"), P("polo"), P("harrington"), P("sneaker-white"),
  P("runner-white"), P("loafer"), P("holdall-top"), P("belt"),
  P("tie"), P("briefcase"), P("sneaker-brown"), P("swimshorts"),
];

export function cover(i) {
  return covers[i % covers.length];
}

export { P as productImg };
