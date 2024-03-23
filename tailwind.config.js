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
  darkMode: "class",
  content: [
    "./node_modules/flowbite/**/*.js",
    "./src/**/*.{html,js}",
    "./src/views/**/*.{html,js}",
    "./src/views/*.{html,js}",
    "./src/views/partials/*.{html,js}",
    "./src/views/partials/*.{html,js}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0% 100%": {
            transform: "rotate(-3deg)",
          },
          "50%": { transform: "rotate(3de)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require("tailwindcss"), require("autoprefixer"), require("flowbite/plugin")],
};
