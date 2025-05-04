/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx,scss}"],
  theme: {
    extend: {
      screens: {
        "xs-plus": "501px",
      },
    },
  },
  plugins: [],
};
