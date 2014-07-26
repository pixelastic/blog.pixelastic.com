module.exports = {
  // We make a copy of tho original jekyll dir
  // But without the CSS and JS files, and on which we'll update the layouts
  // to include minified files
  jekyll: {
    files: [{
      expand: true,
      cwd: '<%= config.jekyllSrc %>',
      dest: '<%= config.jekyllSrcBuild %>',
      src: [
        '**/*',
        '!css/**'
      ]
    }]
  }
};
