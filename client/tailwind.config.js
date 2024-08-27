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

        "signin-0": "url('images/pexels-quang-nguyen-vinh-222549-2131772.jpg')",
        "signin-1": "url('images/pexels-eberhardgross-1612351.jpg')",
      }
    },
  },
  plugins: [],
}