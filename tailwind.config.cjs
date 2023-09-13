/** @type {import('tailwindcss').Config}*/
// const colors = require('tailwindcss/colors')
import colors from 'tailwindcss/colors'

const config = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
  ],

  plugins: [
    require('flowbite/plugin')
  ],

  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        primary: colors.yellow,
        // primary: {
        //   50: colors.yellow[50],
        //   100: colors.yellow[50],
        //   200: colors.yellow[50],
        //   300: colors.yellow[50],
        //   400: colors.yellow[100],
        //   500: colors.yellow[200],
        //   600: colors.yellow[300],
        //   700: colors.yellow[400],
        //   800: colors.yellow[500],
        //   900: colors.yellow[600],
        // },
      },
    },
  },

  safelist: [
    'w-20',
    'h-20',
  ],
};

// module.exports = config;
export default config