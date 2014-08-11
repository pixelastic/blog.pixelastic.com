module.exports = {
  dev: {
    files: [{
      expand: true,
      cwd: '<%= config.app %>/css',
      src: '*.scss',
      dest: '<%= config.srcBuildDev %>/css',
      ext: '.css'
    }]
  },
  livereload: {
    files: [{
      expand: true,
      cwd: '<%= config.app %>/css',
      src: '*.scss',
      dest: '<%= config.destBuildDev %>/css',
      ext: '.css'
    }]
  },
  full: {
    files: [{
      expand: true,
      cwd: '<%= config.app %>/css',
      src: '*.scss',
      dest: '<%= config.tmp %>/css',
      ext: '.css'
    }]
  }

};

