/** @type {import('tailwindcss').Config} */
const tailwind = require("chai");
tailwind.config = {
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
  theme: {
    extend: {
      colors: {
        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"}
      }
    },
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
