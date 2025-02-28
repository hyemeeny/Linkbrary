import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white01: "#ffffff",
        white02: "#f5f5f5",
        black01: "#000000",
        black02: "#111322",
        red01: "#ff5b56",
        gray01: "#f0f6ff",
        gray02: "#e7effb",
        gray03: "#ccd5e3",
        gray04: "#9fa6b2",
        gray05: "#3e3e43",
        purple01: "#6d6afe",
        sky01: "#6AE3FE",
      },
    },
  },
  plugins: [],
};
export default config;
