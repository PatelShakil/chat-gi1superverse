/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F3BF31',
        'primary-light': '#FDF0D5', // A very light shade of primary
        secondary: '#084595',
        'secondary-light': '#E0EAF7', // A very light shade of secondary
      },
    },
  },
  plugins: [],
}
