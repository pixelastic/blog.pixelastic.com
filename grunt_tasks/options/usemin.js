module.exports = {
  build: {
    options: {
      type: 'html'
    },
    files: [{
      src: ['<%= config.jekyllDestBuild %>/**/*.html']
    }]
  }
};
