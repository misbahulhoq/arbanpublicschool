/* eslint-disable @typescript-eslint/no-var-requires */
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      // "fantasy",
      // "sunset",
      {
        light: {
          ...require("daisyui/src/theming/themes")["fantasy"],
          primary: "#813588",
          "primary-content": "#fff",
        },
        dim: {
          ...require("daisyui/src/theming/themes")["sunset"],
          primary: "#813588",
          "primary-content": "#fff",
        },
      },
    ],
  },
};

export default config;
