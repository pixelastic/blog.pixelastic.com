/*eslint-env node*/

module.exports = {
  options: {
    encoding: 'utf8',
    algorithm: 'md5',
    length: 8
  },
  prodFontsAppToJekyll: {
    src: 'app/fonts/*',
    dest: 'tmp/jekyll/fonts/'
  },
  prodCssOutputToJekyll: {
    src: 'tmp/css/output/main.css',
    dest: 'tmp/jekyll/'
  },
  prodJsOutputToJekyll: {
    src: 'tmp/js/output/main.js',
    dest: 'tmp/jekyll/'
  }
};
