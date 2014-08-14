module.exports = {
  dev: {
    expand: true,
    flatten: true,
    src: '<%= config.srcBuildDev %>/css/*.css',
    dest: '<%= config.srcBuildDev %>/css/'
  },
  livereload: {
    expand: true,
    flatten: true,
    src: '<%= config.tmpCssLivereload %>/*.css',
    dest: '<%= config.destBuildDev %>/css/'
  },
  full: {
    expand: true,
    flatten: true,
    src: '<%= config.tmpCssBuildFull %>/*.css',
    dest: '<%= config.tmpCssBuildFull %>'
  }

};

