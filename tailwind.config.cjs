/** @type {import('tailwindcss').Config}*/
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif']
      },
      width: {
        128: '32rem',
        108: '28rem'
      },
      maxHeight: {
        128: '32rem'
      },
      height: {
        128: '32rem'
      },
      margin: {
        108: '28rem',
        134: '36rem'
      }
    },
  },

  plugins: [require('daisyui')]
};

module.exports = config;
