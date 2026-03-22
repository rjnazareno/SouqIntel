/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Middle Eastern inspired color palette
        gold: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        oud: {
          50: '#fdf4f3',
          100: '#fce8e4',
          200: '#f9d5ce',
          300: '#f4b8ab',
          400: '#ec917d',
          500: '#e06a55',
          600: '#cc5039',
          700: '#ab402d',
          800: '#8e3829',
          900: '#763428',
        },
        musk: {
          50: '#f8f6f4',
          100: '#efeae4',
          200: '#ddd3c8',
          300: '#c7b6a5',
          400: '#b09581',
          500: '#a07d67',
          600: '#936c5b',
          700: '#7a594d',
          800: '#654a43',
          900: '#543f39',
        },
      },
      fontFamily: {
        arabic: ['Noto Sans Arabic', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
