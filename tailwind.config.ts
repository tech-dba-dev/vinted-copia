import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#13ec5b",
        "background-light": "#f6f8f6",
        "background-dark": "#102216",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        symbols: ["var(--font-symbols)"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
