import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./src/app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#251814",
        light: "#EFF6FF",
        brand: {
          DEFAULT: "#835546",
        },
        interactive: {
          DEFAULT: "#835546",
          hover: "#251814",
        },
      },
    },
  },
  plugins: [],
};

export default config;
