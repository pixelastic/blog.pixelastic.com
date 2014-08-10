module.exports = {
  dev: {},
  full: {
    files: {
      '<%= config.srcBuildFull %>/main.css': ['<%= config.app %>/css/*.css']
    }
  }
};
