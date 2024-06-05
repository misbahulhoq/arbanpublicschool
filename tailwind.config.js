/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      minHeight: {
        "form-lg": "calc(100vh - 160px)",
        "form-sm": "calc(100vh - 235px)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      // "fantasy",
      // "sunset",
      {
        fantasy: {
          ...require("daisyui/src/theming/themes")["fantasy"],
          "primary-content": "#fff",
        },
        sunset: {
          ...require("daisyui/src/theming/themes")["sunset"],
          primary: "#813588",
        },
      },
    ],
  },
};
