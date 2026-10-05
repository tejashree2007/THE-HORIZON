/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Lora', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
      colors: {
        brand: {
          50: '#fef2f2',
          100: '#ffe1e1',
          200: '#ffc8c8',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          accent: '#e11d48',
        },
        editorial: {
          lightBg: '#F8F9FA',
          lightSurface: '#FFFFFF',
          darkBg: '#090D14',
          darkSurface: '#111726',
          darkCard: '#151D2F',
        }
      },
      maxWidth: {
        'reading-narrow': '640px',
        'reading-comfortable': '768px',
        'reading-wide': '920px',
      }
    },
  },
  plugins: [],
}
