module.exports = {
  dev: {
    files: {
      '<%= config.destBuildDev %>/main.css': ['<%= config.app %>/css/*.css']
    }
  },
  full: {
    files: {
      '<%= config.destBuildFull %>/main.css': ['<%= config.app %>/css/*.css']
    }
  }
};
