/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    textOpacity: false,
    backgroundOpacity: false,
    divideOpacity: false,
    borderOpacity: false,
    placeholderOpacity: false,
  },
};
