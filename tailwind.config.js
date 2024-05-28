/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "fantasy",
      "sunset",
      // {
      //   light: {
      //     ...require("daisyui/src/theming/themes")["light"],
      //     primary: "#813588",
      //   },
      //   dark: {
      //     ...require("daisyui/src/theming/themes")["dark"],
      //     primary: "#813588",
      //   },
      // },
    ],
  },
};
