/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        background : {
          DEFAULT : '#060D17',
          100 : '#10161D',
        }
      }
    },
  },
  plugins: [],
}