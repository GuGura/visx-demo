import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        fd: "281px",
        sm: "480px",
        md: "768px",
        lg: "1040px",
        xl: "1440px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {},
      boxShadow: {
        card: "0 1px 2px 0 rgba(88,102,126,0.12), 0 4px 24px 0 rgba(88,102,126,0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
