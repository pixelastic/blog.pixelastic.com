/*eslint-env node*/

module.exports = {
  prodJsTmpToOutput: {
    src: [
      'tmp/js/src/jquery.min.js',
      'tmp/js/src/lodash.min.js',
      'tmp/js/src/moment.min.js',
      'tmp/js/src/hogan-3.0.2.min.js',
      'tmp/js/src/algoliasearch-lite.umd.js',
      'tmp/js/src/instantsearch.production.min.js',
      'tmp/js/src/app.js'
    ],
    dest: 'tmp/js/output/main.js'
  }
};
