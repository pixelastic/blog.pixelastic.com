/* eslint-disable import/no-commonjs */
module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss')(
      './node_modules/tailwind-config-norska/build/index.js'
    ),
    require('autoprefixer'),
  ],
};
