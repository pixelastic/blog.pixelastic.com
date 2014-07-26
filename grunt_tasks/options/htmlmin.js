module.exports = {
  build: {
    options: {
      removeComments: true,
      removeAttributesQuotes: true,
      collapseBooleanAttributes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      collapseWhitespace: true
    },
    files: [{
      expand: true,
      cwd: '<%= config.jekyllDestBuild %>',
      dest: '<%= config.jekyllDestBuild %>',
      src: ['**/*.html']
    }]
  }
};

