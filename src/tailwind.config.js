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
  darkMode: "media",
  content: ["./src/**/*.{html,js}"],
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
