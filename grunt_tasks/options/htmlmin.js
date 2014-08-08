module.exports = {
  options: {
    removeComments: true,
    removeAttributesQuotes: true,
    collapseBooleanAttributes: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    collapseWhitespace: true
  },
  dev: {
    files: [{
      expand: true,
      cwd: '<%= config.destBuildDev %>',
      dest: '<%= config.destBuildDev %>',
      src: ['**/*.html']
    }]
  }
};
