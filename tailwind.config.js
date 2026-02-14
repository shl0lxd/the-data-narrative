/** Tailwind v4: CSS-first config in src/app/globals.css @theme; this file for content paths only. */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FCFAF8',
        ink: '#1A1A1A',
      },
    },
  },
  plugins: [],
};
