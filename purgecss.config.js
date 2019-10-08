/* eslint-disable import/no-commonjs */
module.exports = {
  content: ['./dist/**/*.html'],
  css: ['./dist/style.css'],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
};
