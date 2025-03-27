/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'navy': {
          700: '#1e3a5f',
          900: '#0a1929',
        },
        'blue': {
          500: '#3b82f6',
        },
        'gray': {
          100: '#f3f4f6',
          200: '#e5e7eb',
          400: '#9ca3af',
          800: '#1f2937',
          900: '#111827',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 