module.exports = {
  dev: {
    files: [{
      expand: true,
      cwd: '<%= config.app %>',
      src: '**',
      dest: '<%= config.srcBuildDev %>'
    }]
  },
  full: {
    files: [{
      expand: true,
      cwd: '<%= config.app %>',
      src: ['**', '!css', '!css/*'],
      dest: '<%= config.srcBuildFull %>'
    }]
  }
};


