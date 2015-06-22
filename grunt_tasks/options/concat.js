/* eslint-env node */

module.exports = {
  prodJsTmpToOutput: {
    src: [
      'tmp/js/src/jquery.min.js',
      'tmp/js/src/hogan-3.0.2.min.js',
      'tmp/js/src/moment.min.js',
      'tmp/js/src/algoliasearch.min.js',
      'tmp/js/src/algoliasearch.helper.min.js',
      'tmp/js/src/app.js'
    ],
    dest: 'tmp/js/output/main.js'
  }
};
