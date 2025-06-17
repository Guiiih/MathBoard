/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-light': '#F7F9F9',
        'brand-green': '#00856F',
        'input': '#DCE9E2',
        'input-text': '#00453A'
      },
      height: {
        'Table': '28rem',
      },
      minHeight: {
        'Table': '28rem',
      },
      width: {
        'Table': '28rem',
      },
    },
    fontFamily: {
      sigmar: ['Sigmar', 'sans-serif'],
    },
  },
  plugins: [],
}