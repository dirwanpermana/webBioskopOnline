/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        "premiere-black": "#010101",
        "premiere-grey": "#908E8E",
        "premiere-green": "#009421",
        "premiere-light-green": "#D5FFDE",
        "premiere-red": "#FF2149",
        "premiere-light-red": "#FFDEE4",
        "premiere-yellow": "#E7A436",
        "premiere-purple": "#5236FF",
      }
    },
  },
  plugins: [],
}