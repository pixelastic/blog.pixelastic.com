/* jshint camelcase: false */
module.exports = {
  options: {
    config: '_config.yml'
  },
  dev: {
    options: {
      src: '<%= config.srcBuildDev %>',
      dest: '<%= config.destBuildDev %>',
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
