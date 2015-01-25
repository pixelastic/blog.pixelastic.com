/* jshint camelcase: false */
module.exports = {
  options: {
    config: '_config.yml'
  },
  dev: {
    options: {
      src: 'tmp/jekyll',
      dest: 'dist/',
      drafts: true,
      limit_posts: 10
    }
  },
  full: {
    options: {
      src: '<%= config.srcBuildFull %>',
      dest: '<%= config.destBuildFull %>'
    }
  }
};
