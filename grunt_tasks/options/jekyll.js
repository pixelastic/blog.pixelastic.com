/* eslint-env node */

/* jshint camelcase: false */
module.exports = {
  options: {
    config: '_config.yml',
    bundleExec: true
  },
  dev: {
    options: {
      src: 'tmp/jekyll',
      dest: 'dist/',
      drafts: true,
      limit_posts: 10
    }
  },
  prod: {
    options: {
      src: 'tmp/jekyll',
      dest: 'dist/'
    }
  }
};
