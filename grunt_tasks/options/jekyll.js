/* jshint camelcase: false */
module.exports = {
  options: {
    config: '_config.yml'
  },
  dev: {
    options: {
      src: '<%= config.app %>',
      dest: '<%= config.destBuildDev %>',
      drafts: true,
      limit_posts: 10
    }
  }
};
