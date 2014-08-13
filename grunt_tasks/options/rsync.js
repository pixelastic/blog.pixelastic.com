module.exports = {
  options: {
    recursive: true,
    'delete': true
  },
  // Copy jekyll source for dev build
  preBuildDev: {
    options: {
      src: '<%= config.app %>/*',
      dest: '<%= config.srcBuildDev %>',
      exclude: ['css/']
    }
  },
  // Copy all bower css files to css
  devBowerCss: {
    options: {
      src: '<%= config.bower %>/**/*.css',
      dest: '<%= config.srcBuildDev %>/css'
    }
  },
  // Copy jekyll source for full build
  preBuildFull: {
    options: {
      src: '<%= config.app %>/*',
      dest: '<%= config.srcBuildFull %>',
      exclude: ['css/']
    }
  }
};
