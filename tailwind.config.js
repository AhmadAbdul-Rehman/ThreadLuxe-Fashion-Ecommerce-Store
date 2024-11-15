/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,cjs,mjs}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'cart-image': "url('/public/cart.png')",
      }
    },
  },
  plugins: [],
}

