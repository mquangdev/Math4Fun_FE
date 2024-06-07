/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#58cc02",
        grayColor: "#e5e5e5",
        description: "#afb0b2",
        blueColor: "#1cb0f6",
      },
    },
  },
  plugins: [],
};
