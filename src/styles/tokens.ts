/**
 * @deprecated — globals.css is the single source of truth for all design tokens.
 * All tokens are defined as CSS custom properties in src/app/globals.css:
 *   - Primitive + semantic colors → :root {}
 *   - Spacing, radius, breakpoints, typography → @theme inline {}
 *
 * This file is kept for reference only and is not imported anywhere.
 * Do not add new tokens here — add them directly to globals.css.
 */

// ─── Color Primitives ────────────────────────────────────────
export const colors = {
  gray: {
    0: "#ffffff",
    10: "#fafafa",
    50: "#f2f2f2",
    100: "#e5e5e5",
    200: "#cccccc",
    300: "#999999",
    400: "#808080",
    500: "#666666",
    600: "#4d4d4d",
    700: "#333333",
    800: "#1a1a1a",
    900: "#0f0f0f",
  },
  pink: {
    50: "#ffe6f1",
    100: "#fdb0d3",
    200: "#fd8abd",
    300: "#fc549f",
    400: "#fb338d",
    500: "#fa0070",
    600: "#e40066",
    700: "#b20050",
    800: "#8a003e",
    900: "#69002f",
  },
  brand: {
    primary: {
      50: "#e8f1ff",
      100: "#b7d4ff",
      200: "#94bfff",
      300: "#64a2ff",
      400: "#4590ff",
      500: "#1774ff",
      600: "#156ae8",
      700: "#1052b5",
      800: "#0d408c",
      900: "#0a316b",
    },
    secondary: {
      50: "#f1e6ff",
      100: "#d4b0fd",
      200: "#bf8afd",
      300: "#a154fc",
      400: "#8f33fb",
      500: "#7300fa",
      600: "#6900e4",
      700: "#5200b2",
      800: "#3f008a",
      900: "#300069",
    },
  },
  critical: {
    50: "#feeceb",
    100: "#fac5c1",
    200: "#f8a9a3",
    300: "#f5827a",
    400: "#f36960",
    500: "#f04438",
    600: "#da3e33",
    700: "#aa3028",
    800: "#84251f",
    900: "#651d18",
  },
  warning: {
    50: "#fff7e9",
    100: "#fee7ba",
    200: "#fedb99",
    300: "#feca6b",
    400: "#fdc04e",
    500: "#fdb022",
    600: "#e6a01f",
    700: "#b47d18",
    800: "#8b6113",
    900: "#6a4a0e",
  },
  success: {
    50: "#ebfbf3",
    100: "#bff2d9",
    200: "#a1ecc6",
    300: "#76e3ac",
    400: "#5bdd9c",
    500: "#32d583",
    600: "#2ec277",
    700: "#24975d",
    800: "#1c7548",
    900: "#155937",
  },
  sidebar: {
    background: "#0c1014",
    navActive: "#1b232d",
    navHover: "#171c22",
    navSettings: "#131518",
    inner: "#f6f6f6",
  },
  toggleInactive: "#787880",
} as const;

// ─── Spacing ─────────────────────────────────────────────────
export const spacing = {
  0: "0px",
  25: "2px",
  50: "4px",
  100: "8px",
  150: "12px",
  200: "16px",
  250: "20px",
  300: "24px",
  400: "32px",
  500: "40px",
  600: "48px",
  700: "56px",
  800: "64px",
  900: "72px",
  1000: "80px",
  1200: "96px",
  1400: "112px",
  1600: "128px",
} as const;

// ─── Border Radius ───────────────────────────────────────────
export const radius = {
  0: "0px",
  "050": "4px",
  100: "8px",
  150: "12px",
  200: "16px",
  300: "24px",
  400: "32px",
  500: "9999px",
} as const;

// ─── Border Width ────────────────────────────────────────────
export const borderWidth = {
  0: "0px",
  "0165": "0.66px",
  25: "1px",
  50: "2px",
  100: "4px",
} as const;

// ─── Breakpoints ─────────────────────────────────────────────
export const breakpoints = {
  xs: "0px",
  sm: "600px",
  md: "840px",
  lg: "1200px",
  xl: "1440px",
} as const;

// ─── Typography ──────────────────────────────────────────────
export const typography = {
  h0: { fontSize: "36px", lineHeight: "54px" },
  h1: { fontSize: "26px", lineHeight: "39px" },
  h2: { fontSize: "24px", lineHeight: "36px" },
  h3: { fontSize: "20px", lineHeight: "30px" },
  h4: { fontSize: "18px", lineHeight: "27px" },
  title: { fontSize: "16px", lineHeight: "22px" },
  body: { fontSize: "14px", lineHeight: "21px" },
  supporting: { fontSize: "12px", lineHeight: "18px", letterSpacing: "0.02em" },
} as const;

export const fontWeight = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;
