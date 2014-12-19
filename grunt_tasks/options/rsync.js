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
  // Copy all bower js files to build-dev
  devBowerJs: {
    options: {
      src: [
        '<%= config.bower %>/zepto/zepto.js',
        '<%= config.bower %>/lodash/dist/lodash.min.js',
        '<%= config.bower %>/typeahead.js/dist/typeahead.bundle.js',
        '<%= config.bower %>/algoliasearch/dist/algoliasearch.min.js',
      ],
      dest: '<%= config.srcBuildDev %>/js'
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
  // Copy app JS files to dist when updated
  watchJsCopyAppToDist: {
    options: {
      src: '<%= config.app %>/js/*.js',
      dest: '<%= config.destBuildDev %>/js'
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
