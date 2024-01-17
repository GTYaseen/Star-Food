/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        'custom':'0px 1px 24px 0px rgba(255, 192, 0, 0.30)',
      }
    },
  },
  plugins: [],
}
