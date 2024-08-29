/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'noto-sans': ['Noto Sans', 'sans-serif'],
        'outfit': ['Outfit', 'sans-serif'],
        'urbanist': ['Urbanist', 'sans-serif'],
        'nevan': ['Nevan', 'sans-serif'],
      },
      backgroundImage: {
        "signin-bg": "url('images/signin-bg.webp')",
        "signup-bg": "url('images/signup-bg.webp')",
        "blurred-signin-bg": "url('images/signup-blurred.webp')",
        "blurred-signup-bg": "url('images/signup-blurred.webp')",
      }
    },
  },
  plugins: [],
}