/* eslint-env node */

module.exports = {
  dev: {
    options: {
      create: [
        'tmp',
        'tmp/jekyll',
        'tmp/jekyll/css',
        'tmp/jekyll/js',
        'tmp/jekyll/fonts',
        'tmp/js',
        'tmp/js/src',
        'tmp/css',
        'tmp/css/src',
        'tmp/fonts',
        'tmp/fonts/src',
        'tmp/html',
        'tmp/html/src',
        'dist/'
      ]
    }
  },
  prod: {
    options: {
      create: [
        'tmp',
        'tmp/jekyll',
        'tmp/js',
        'tmp/js/src',
        'tmp/js/output',
        'tmp/css',
        'tmp/css/src',
        'tmp/css/output',
        'tmp/fonts',
        'tmp/fonts/src',
        'tmp/fonts/output',
        'tmp/html',
        'tmp/html/src',
        'tmp/html/output',
        'dist/'
      ]
    }
  }
};
