/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "poppins": ["Poppins", "sans-serif"]
      }
    },
    screens: {
      vsm:"450px",
      msm:"530px",
      sm: "640px",
      md: "768px",
      mxd: "830px",
      blg:"992px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [
    // require('flowbite/plugin')
  ],
}

