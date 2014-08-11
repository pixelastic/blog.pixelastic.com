module.exports = {
  livereloadCss: {
    files: ['<%= config.app %>/css/*.css'],
    tasks: ['newer:copy:livereloadCss'],
    options: {
      livereload: true
    }
  }
};

