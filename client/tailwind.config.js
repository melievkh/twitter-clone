/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bgColor: "#050608",
        textColor: "#bebebe",
        bgHover: "#0e0e11",
        deleteColor: "#a14a4a",
        deleteBgColor: "#151010",
        borderColor: "#3b3b3b",
      },
      fontFamily: {
        body: ["Roboto"],
        logo: ["Raphael Alegbeleye", "Sorkin Type", "Eben Sorkin"],
      },
    },
  },
  plugins: [],
};
