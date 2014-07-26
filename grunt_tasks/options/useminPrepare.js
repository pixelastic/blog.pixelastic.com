module.exports = {
  options: {
    staging: '<%= config.tmp %>'
  },
  build: {
    options: {
      root: '<%= config.jekyllSrc %>',
      dest: '<%= config.jekyllDestBuild %>'
    },
    src: ['<%= config.jekyllSrcBuild %>/_layouts/default.html']
  }
};

