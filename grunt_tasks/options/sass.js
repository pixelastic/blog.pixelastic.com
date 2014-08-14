module.exports = {
  options: {
    style: 'expanded'
  },
  // Compile source files to src-dev
  dev: {
    files: [{
      expand: true,
      cwd: '<%= config.app %>/css',
      src: '*.scss',
      dest: '<%= config.srcBuildDev %>/css',
      ext: '.css'
    }]
  },
  // Update build-dev whenever a source file is changed
  livereload: {
    files: [{
      expand: true,
      cwd: '<%= config.app %>/css',
      src: '*.scss',
      dest: '<%= config.tmpCssLivereload %>',
      ext: '.css'
    }]
  },
  // Compile source files to tmp directory
  full: {
    files: [{
      expand: true,
      cwd: '<%= config.app %>/css',
      src: '*.scss',
      dest: '<%= config.tmpCssBuildFull %>',
      ext: '.css'
    }]
  }

};

