/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        linkedin: {
          blue: '#0077B5',
          darkBlue: '#004182',
          lightBlue: '#E8F3FF',
          gray: '#666666',
          lightGray: '#F3F2EF',
          darkGray: '#191919',
          border: '#E0E0E0'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 