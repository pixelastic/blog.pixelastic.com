/* eslint-disable import/no-commonjs */
const tailwind = require('tailwindcss');
const postcssImport = require('postcss-import');

const plugins = [
  postcssImport(),
  tailwind('./node_modules/tailwind-config-norska/build/index.js'),
];

module.exports = {
  plugins,
};
