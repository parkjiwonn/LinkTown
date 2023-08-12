/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'lilita': ['Lilita One', 'sans-serif'],
        'NotoSan_medium': ['NotoSan_medium', 'sans-serif'],
        'NotoSan_regular': ['NotoSan_regular', 'sans-serif'],
        'NotoSan_bold': ['NotoSan_bold', 'sans-serif'],
      },
      colors: {
        'custom-color': '#72EDF2',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom right, #72EDF2, #5151E5)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}


