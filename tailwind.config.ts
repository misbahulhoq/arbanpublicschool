/* eslint-disable @typescript-eslint/no-var-requires */
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const lightThemePalette = {
  primary: "#FF8C69", // Soft Coral (Warm, inviting, lively)
  "primary-content": "#4A4A4A", //Warm Gray. Dark text provides excellent readability on the coral background.
  secondary: "#F7D046",
  "secondary-content": "#4A4A4A",
  accent: "#17A2B8", // Bright Teal (Confident, eye-catching, great for CTAs)
  "accent-content": "#fff",
  "base-100": "#FCF8F3",
  "base-content": "#4A4A4A",
};

const dark = {
  primary: "#FF9A80",
  "primary-content": "#1A1A1A",
  secondary: "#F8D86A",
  "secondary-content": "#2A2A2A",
  accent: "#20C9E4",
  "accent-content": "#FFFFFF",
  "base-100": "#2D2D2D",
  "base-200": "#3B3B3B",
  "base-content": "#EAEAEA",
};

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "marquee-left": "marquee-left linear infinite",
        "marquee-right": "marquee-right linear infinite",
        blob: "blob 7s infinite",
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
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
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
          ...lightThemePalette,
        },
        dim: {
          ...require("daisyui/src/theming/themes")["dim"],
          ...dark,
        },
      },
    ],
  },
};

export default config;
