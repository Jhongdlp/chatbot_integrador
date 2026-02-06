/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gob-blue': '#0255ba', // Azul gobierno oficial
        'gob-red': '#EF3E42',  // Rojo gobierno
        'gob-slate': '#1a1a1a',   // Negro suave
        'gob-gold': '#FFD700', // Dorado oficial (restored)
        'gob-electric': '#38bdf8', // Azul brillante (cyan/sky) para efectos de luz
      }
    },
  },
  plugins: [],
}
