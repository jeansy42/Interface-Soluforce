import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0059ff",

          secondary: "#008000",

          accent: "#00ae00",

          neutral: "#18190f",

          "base-100": "#3b3139",

          info: "#0068ed",

          success: "#00c79c",

          warning: "#ff7800",

          error: "#ff6294",
        },
      },
    ],
  },
  plugins: [daisyui],
};
