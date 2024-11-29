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
