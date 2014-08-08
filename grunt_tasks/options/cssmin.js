module.exports = {
  dev: {
    files: {
      '<%= config.destBuildDev %>/main.css' : ['<%= config.app %>/css/*.css']
    }
  }
};
