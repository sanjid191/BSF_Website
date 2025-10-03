/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem',
      },
      screens: {
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '100%',
        '2xl': '100%',
      },
    },
    extend: {
      colors: {
        'bsf-gray': '#82858a',
        'bsf-red': '#eb222a',
        'bsf-green': '#0e7f41',
        'bsf-teal': '#6dc8bf',
      },
      maxWidth: {
        'content': '1400px',
        'section': '1200px',
        'narrow': '900px',
      },
    },
  },
  plugins: [],
}
