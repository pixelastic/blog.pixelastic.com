module.exports = {
  options: {
    // args: ['--verbose'],
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
  // Copy all bower css files to build-dev
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
      exclude: ['css/', 'fonts/']
    }
  },
  // Copy all fonts to for full build
  // Note: not included in preBuildFull so we can run all font-related tasks
  // together
  fullFonts: {
    options: {
      src: '<%= config.app %>/fonts/',
      dest: '<%= config.srcBuildFull %>/fonts'
    }
  },
  // Copy all bower css files to tmp
  fullBowerCss: {
    options: {
      src: '<%= config.bower %>/**/*.css',
      dest: '<%= config.tmpCssBuildFull %>'
    }
  }
};
