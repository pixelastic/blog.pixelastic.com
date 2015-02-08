'use strict';

module.exports = {
  prodJsTmpToOutput: {
    src: [
      'tmp/js/src/zepto.min.js',
      'tmp/js/src/moment.js',
      'tmp/js/src/lodash.min.js',
      'tmp/js/src/algoliasearch.min.js',
      'tmp/js/src/app.js'
    ],
    dest: 'tmp/js/output/main.js'
  }
};
