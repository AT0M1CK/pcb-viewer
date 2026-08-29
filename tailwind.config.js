/** @type {import('tailwindcss').Config} */

/**
 * The canonical palette for the app. The only values duplicated elsewhere are
 * the three status colours in `src/utils/placement.ts`, which three.js
 * materials need as literals because they can't read CSS — keep those in sync.
 */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sidebar: {
          DEFAULT: "#0c1a2e",
          hover: "#16273f",
          muted: "#8ea3bd",
        },
        brand: {
          DEFAULT: "#2563eb",
          hover: "#1d4ed8",
        },
        page: "#f5f7fa",
        line: "#e5e9f0",
        ink: {
          DEFAULT: "#0f172a",
          muted: "#64748b",
        },
        verified: {
          DEFAULT: "#16a34a",
          bg: "#dcfce7",
        },
        caution: {
          DEFAULT: "#f59e0b",
          bg: "#fef3c7",
        },
        critical: {
          DEFAULT: "#dc2626",
          bg: "#fee2e2",
        },
        info: {
          DEFAULT: "#1d4ed8",
          bg: "#dbeafe",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
