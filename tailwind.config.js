/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: {
          primary: "#2D4A3E",
          dark: "#1a3a2e",
          light: "#4A7C59",
        },
        gold: {
          DEFAULT: "#D4A853",
          light: "#E8C87A",
        },
        cream: {
          DEFAULT: "#FFFEF5",
          warm: "#FFF9E6",
        },
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', "Microsoft YaHei", "sans-serif"],
        serif: ['"Noto Serif SC"', "SimSun", "serif"],
        ui: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
