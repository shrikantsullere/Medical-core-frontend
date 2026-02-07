/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'med-orange': "#F28B27", // The orange from the image
        'med-bg': "#E9EBED",     // The light gray background
        'med-blue': "#337AB7",   // The link blue color often used in these UIs
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
