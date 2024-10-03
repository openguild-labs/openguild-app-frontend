/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const colors = require("tailwindcss/colors");
const { fontFamily } = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        gradientPrimary: "linear-gradient(180deg, rgba(242,38,239,1) 0%, rgba(85,41,218,1) 100%)",
      },
    },
    screens: {
      sm: "540px",
      md: "768px", // Tablets start at 768px
      lg: "1024px", // Desktops start at 1024px
      xl: "1440px", // This could be for large desktops, if necessary
      "2xl": "1536px", // very large devices
    },
    colors: {
      ...colors,
      black: "#060708",
      primary: {
        500: "#412062",
      },
      indigo: {
        600: "#140723",
        500: "#28123e",
      },
      violet: {
        500: "#6b3FFd",
      },
      pink: {
        500: "#f226ef",
      },
      orange: {
        500: "#f77300",
      },
      "primary-color": "#6b3ffd",
    },
    animation: {
      marquee: "marquee 10s linear infinite",
    },
    keyframes: {
      marquee: {
        "0%": { transform: "translateX(0%)" },
        "100%": { transform: "translateX(-100%)" },
      },
    },
  },
  plugins: [],
};
