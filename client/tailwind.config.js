/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bgColor: "#000000",
        textColor: "#bebebe",
        bgHover: "#1b1b1b",
        deleteColor: "#a14a4a",
        deleteBgColor: "#151010",
        borderColor: "#3b3b3b",
      },
    },
  },
  plugins: [],
};
