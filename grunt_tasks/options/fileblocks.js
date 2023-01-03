/*eslint-env node*/

module.exports = {
  dev: {
    src: 'tmp/html/src/default.html',
    blocks: {
      css: {
        cwd: 'tmp/jekyll/css',
        prefix: '/css',
        src: [
          'normalize.css',
          '*.css'
        ]
      },
      js: {
        cwd: 'tmp/jekyll/js',
        prefix: '/js',
        src: [
          // Order here can be important
          'jquery.min.js',
          'lodash.min.js',
          'moment.min.js',
          'hogan-3.0.2.min.js',
          'algoliasearch-lite.umd.js',
          'instantsearch.production.min.js',
          'algolia.js'
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
