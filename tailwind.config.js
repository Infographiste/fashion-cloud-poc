/** @type {import('tailwindcss').Config} */
// Tokens mirror the Fashion Cloud Figma design system. Colors resolve to CSS
// variables (see src/styles/tokens.css) so the whole system is themeable from
// one place — this is what makes the components behave like a real DS.
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        black: "var(--fc-black)",
        ink: {
          DEFAULT: "var(--fc-ink)", // neutral/950
          soft: "var(--fc-ink-2)", // neutral/900
          text: "var(--fc-text-default)",
        },
        surface: "var(--fc-surface)", // tertiary panel bg
        line: "var(--fc-line)", // container border
        muted: "var(--fc-muted)", // inactive nav text
        primary: {
          DEFAULT: "var(--fc-primary)",
          weak: "var(--fc-primary-weak)",
          weakInk: "var(--fc-primary-weak-ink)",
        },
        info: { weak: "var(--fc-info)", weakInk: "var(--fc-info-ink)" },
        promo: { weak: "var(--fc-promo)", weakInk: "var(--fc-promo-ink)" },
        control: "var(--fc-control-border)",
        // Reorder status system
        health: {
          good: "var(--fc-good)",
          poor: "var(--fc-poor)",
          critical: "var(--fc-critical)",
        },
        state: {
          activeBg: "var(--fc-active-bg)",
          activeInk: "var(--fc-active-ink)",
          inactiveBg: "var(--fc-inactive-bg)",
          inactiveInk: "var(--fc-inactive-ink)",
          expiringBg: "var(--fc-expiring-bg)",
          expiringInk: "var(--fc-expiring-ink)",
        },
      },
      fontFamily: {
        sans: ["Satoshi", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        // name: [size, lineHeight]
        hero: ["50px", { lineHeight: "60px", letterSpacing: "0" }],
        h1: ["30px", { lineHeight: "40px" }],
        kpi: ["24px", { lineHeight: "32px" }],
        h2: ["20px", { lineHeight: "30px" }],
        base: ["16px", { lineHeight: "20px" }],
        sm: ["14px", { lineHeight: "20px" }],
        btn: ["14px", { lineHeight: "16px", letterSpacing: "0.04em" }],
        xs: ["12px", { lineHeight: "16px" }],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        top: "10px",
        panel: "30px",
        pill: "999px",
      },
      boxShadow: {
        l3: "0px 2px 6px 0px rgba(33,32,45,0.12)",
        pill: "0px 2px 6px 0px rgba(33,32,45,0.12)",
        raise: "0px 20px 25px -12px rgba(24,29,58,0.18)",
      },
      maxWidth: {
        content: "1728px",
      },
    },
  },
  plugins: [],
};
