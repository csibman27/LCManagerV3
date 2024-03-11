/** @type {import('tailwindcss').Config} */
module.exports = {
  animation: {
    vote: "vote 1s ease-in-out",
  },
  keyframes: {
    vote: {
      "0%, 100%": {
        transform: "rotate(-30deg)",
      },
      "50%": {
        transform: "rotate(30deg)",
      },
    },
  },
  darkMode: ["class"],
  content: [
    "./src/**/*.{html,js}",
    "./src/views/**/*.{html,js}",
    "./src/views/*.{html,js}",
    "./src/views/partials/*.{html,js}",
    "./src/views/partials/*.{html,js}"
  ],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
