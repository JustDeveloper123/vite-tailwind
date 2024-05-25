module.exports = {
  plugins: [
    require('postcss-sort-media-queries')({
      sort: 'desktop-first', // sort: mobile-first | desktop-first | custom function
    }),
    require('autoprefixer'), // підтримка стилів визначається в package.json ключем "browserslist", найбільш поширене значення "cover 99.5%"
    // Також, autoprefixer сам по собі може бути підключений в конфігу Vite не прописуючи його в цьому файлі. В інтернеті є інформація
    require('tailwindcss'),
  ],
};
