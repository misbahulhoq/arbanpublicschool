/** @type {import('tailwindcss').Config} */
export default {
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
        fantasy: {
          ...require("daisyui/src/theming/themes")["fantasy"],
          primary: "#813588",
          "primary-content": "#fff",
        },
        sunset: {
          ...require("daisyui/src/theming/themes")["sunset"],
          primary: "#813588",
          "primary-content": "#fff",
        },
      },
    ],
  },
};
