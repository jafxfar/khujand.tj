/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/app/admin/**/*.{js,ts,jsx,tsx}',
    './src/components/admin/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Source Sans 3"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        admin: {
          bg: '#f1f5f9',
          sidebar: '#0f172a',
          accent: '#0d9488',
        },
      },
    },
  },
  plugins: [],
}

export default config
