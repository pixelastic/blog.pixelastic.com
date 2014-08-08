module.exports = {
  css: {
    files: ['<%= config.app %>/css/*.css'],
    tasks: ['optimize:css:dev'],
    options: {
      livereload: true
    }
  }
};

