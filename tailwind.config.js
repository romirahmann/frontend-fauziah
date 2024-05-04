/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    fontFamily: {
      primary: "Poppins",
    },
    colors: {
      primary: "#DCF2F1",
      secondary: "#365486",
    },
  },
  plugins: [require("flowbite/plugin")],
};
