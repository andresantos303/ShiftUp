module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Ensure your Vue files are inside src/
  ],
  theme: {
    extend: {
      colors: {
        'custom-gradient-start': '#4241FF',
        'custom-gradient-end': '#6F4AE7',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, #4241FF 0%, #6F4AE7 100%)',
      },
    },
  },
  plugins: [],
};
