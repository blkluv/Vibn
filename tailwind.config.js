module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': { 'min': '1360px', 'max': '4096px' },
      'md': { 'min': '768px', 'max': '1360px' }
      // => @media (min-width: 640px and max-width: 767px) { ... }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
