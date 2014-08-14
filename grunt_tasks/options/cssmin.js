module.exports = {
  full: {
    files: {
      '<%= config.srcBuildFull %>/main.css': [
        '<%= config.tmpCssBuildFull %>/normalize.css',
        '<%= config.tmpCssBuildFull %>/*.css'
      ]
    }
  }
};
