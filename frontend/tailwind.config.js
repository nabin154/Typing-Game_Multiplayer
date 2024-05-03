/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '788px',
        lg: '976px',
        xl: '1440px',
      },
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

