module.exports = {
  // Copy jekyll source for dev build
  preBuildDev: {
    files: [{
      expand: true,
      cwd: '<%= config.app %>',
      src: '**',
      dest: '<%= config.srcBuildDev %>'
    }]
  },
  // Copy jekyll source for full build
  preBuildFull: {
    files: [{
      expand: true,
      cwd: '<%= config.app %>',
      src: ['**', '!css', '!css/*'],
      dest: '<%= config.srcBuildFull %>'
    }]
  },
  // Copy updated css files for dev livereload
  livereloadCss: {
    files: [{
      expand: true,
      cwd: '<%= config.app %>/css',
      src: '*.css',
      dest: '<%= config.destBuildDev %>/css'
    }]
  }
};


