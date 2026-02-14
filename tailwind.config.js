module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FCFAF8',
        ink: '#1A1A1A',
        nytDivider: '#E5E5E5',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        body: ['Lora', 'Source Serif 4', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      maxWidth: {
        'prose-nyt': '65ch',
      },
      lineHeight: {
        'prose-nyt': '1.7',
      },
    },
  },
  plugins: [],
};