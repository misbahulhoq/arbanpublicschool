/* eslint-disable @typescript-eslint/no-var-requires */
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "marquee-left": "marquee-left linear infinite",
        "marquee-right": "marquee-right linear infinite",
      },
      keyframes: {
        "marquee-left": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [
    require("daisyui"),
    plugin(function ({ addComponents }) {
      addComponents({
        ".whitespace-nowrap": {
          whiteSpace: "nowrap",
        },
      });
    }),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#813588",
          "primary-content": "#fff",
        },
        dim: {
          ...require("daisyui/src/theming/themes")["dim"],
          primary: "#813588",
          "primary-content": "#fff",
        },
      },
    ],
  },
};

export default config;
