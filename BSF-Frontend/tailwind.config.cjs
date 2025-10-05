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
        'mint': {
          50: '#f0f9f4',
          100: '#daf0e3',
          200: '#b8e0ca',
          300: '#8fcbaa',
          400: '#65b187',
          500: '#3a9c67',
          600: '#2a7d4e',
          700: '#236641',
          800: '#1e5035',
          900: '#1a432d',
        },
      },
      maxWidth: {
        'content': '100%',
        'section': '100%',
        'narrow': '900px',
      },
    },
  },
  plugins: [],
}
