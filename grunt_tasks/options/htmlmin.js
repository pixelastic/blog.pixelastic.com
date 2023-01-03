/*eslint-env node*/

module.exports = {
  options: {
    removeComments: true,
    removeAttributesQuotes: true,
    collapseBooleanAttributes: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    collapseWhitespace: true
  },
  prodDistToDist: {
    files: [{
      expand: true,
      cwd: 'dist/',
      dest: 'dist/',
      src: [
        '**/*.html'
      ]
    }]
  }
};
