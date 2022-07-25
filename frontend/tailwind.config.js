/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        petrona: ['Petrona', 'serif'],
      },
      width: {
        divlogo: '22%',
      },
      height: {
        divproduct: '90%',
        divsearch: '10%',
      },
    },
  },
  plugins: [],
};
