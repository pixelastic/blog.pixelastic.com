module.exports = {
  options: {
    prefix: '/'
  },
  dev: {
    src: '<%= config.srcBuildDev %>/_layouts/default.html',
    blocks: {
      css: {
        cwd: '<%= config.srcBuildDev %>',
        src: [
          'css/normalize.css',
          'css/*.css'
        ]
      }
    }
  },
  full: {
    src: '<%= config.srcBuildFull %>/_layouts/default.html',
    blocks: {
      css: {
        cwd: '<%= config.srcBuildFull %>',
        src: '*.css'
      }
    }
  }
};
