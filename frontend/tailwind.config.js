/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        leftGradientColor : '#000000',
        rightGradientColor : '#130F40'
      },
      fontFamily:{
        cursive: 'Pacifico',
        rubik:'Rubik'
      }
    },
  },
  plugins: [],
}

