'use strict';

module.exports = {
  dev: {
    src: 'tmp/html/src/default.html',
    blocks: {
      css: {
        cwd: 'tmp/css/src',
        prefix: '/css',
        src: [
          'normalize.css',
          '*.css'
        ]
      },
      js: {
        cwd: 'tmp/js/src',
        prefix: '/js',
        src: [
          'zepto.min.js',
          'moment.js',
          'lodash.min.js',
          'algoliasearch.min.js',
          'steppe.js',
          'search.js'
        ]
      }
    }
  },
  prod: {
    src: 'tmp/html/src/default.html',
    blocks: {
      css: {
        cwd: 'tmp/jekyll',
        prefix: '/',
        src: 'main.*.css'
      },
      js: {
        cwd: 'tmp/jekyll',
        prefix: '/',
        src: 'main.*.js'
      }
    }
  }
};
