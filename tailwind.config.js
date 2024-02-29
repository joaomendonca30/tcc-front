/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      'primary': '#18232a',
      'secondary': '#BDCED9',

      'white': '#FFF',
      'black': '#000',
      'lightgray': '#D3D3D3',
      'darkgray': '#808080',


      success: '#4E41F0',
      info: '#F7931B',
      warning: '#E44C4E',

    },

    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      roboto: ['"roboto"', ...defaultTheme.fontFamily.sans]
    },

    screens: {
      'sm': { 'min': '0px', 'max': '867px' },
      'md': { 'min': '868px', 'max': '1100px' },
      'lg': { 'min': '1101px' }
    },

    plugins: [],
  }
}
