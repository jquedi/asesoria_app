/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colores: {
      'principal': '#56307f',
      'segundario': '#29fd53',
      'fondo1': '#1e293b',
      'fondo2': 'white',
      'fondo3': '#334155',
      'fuente1': 'white',
      'fuente2': '#3730a3',
      'boxShadow1': '0.5rem 1rem 1rem rgb(0 0 0 / 40%)',
    },
    extend: {},
  },
  plugins: [],
}
