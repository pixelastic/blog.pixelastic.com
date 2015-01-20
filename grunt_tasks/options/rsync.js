module.exports = {
  options: {
    // args: ['--verbose'],
    recursive: true,
    'delete': true
  },
  /**
   * DEV
   **/
  // JEKYLL : Copy jekyll source for dev build
  preBuildDev: {
    options: {
      src: '<%= config.app %>/*',
      dest: '<%= config.srcBuildDev %>',
      exclude: ['css/']
    }
  },
  // CSS : Copy all bower css files to build-dev
  devBowerCss: {
    options: {
      src: '<%= config.bower %>/**/*.css',
      dest: '<%= config.srcBuildDev %>/css'
    }
  },
  // JS :  Copy all js files to build-dev
  devJs: {
    options: {
      src: [
        '<%= config.bower %>/zepto/zepto.js',
        '<%= config.bower %>/lodash/dist/lodash.min.js',
        '<%= config.bower %>/algoliasearch/dist/algoliasearch.min.js',
        '<%= config.app %>/js/steppe.js',
        '<%= config.app %>/js/search.js'
      ],
      dest: '<%= config.srcBuildDev %>/js'
    }
  },

  /**
   * WATCH
   **/
  // JS : Copy app JS files to dist when updated
  watchJsCopyAppToDist: {
    options: {
      src: '<%= config.app %>/js/*.js',
      dest: '<%= config.destBuildDev %>/js'
    }
  },

  /**
   * FULL
   **/
  // JEKYLL : Copy jekyll source for full build
  preBuildFull: {
    options: {
      src: '<%= config.app %>/*',
      dest: '<%= config.srcBuildFull %>',
      exclude: ['css/', 'fonts/']
    }
  },
  // CSS : Copy all bower css files to tmp
  fullBowerCss: {
    options: {
      src: '<%= config.bower %>/**/*.css',
      dest: '<%= config.tmpCssBuildFull %>'
    }
  },
  // JS : Copy all js files to tmp
  fullJs: {
    options: {
      src: [
        '<%= config.bower %>/zepto/zepto.js',
        '<%= config.bower %>/lodash/dist/lodash.min.js',
        '<%= config.bower %>/algoliasearch/dist/algoliasearch.min.js',
        '<%= config.app %>/js/steppe.js',
        '<%= config.app %>/js/search.js'
      ],
      dest: '<%= config.tmpCssBuildFull %>/js'
    }
  },
  // FONTS : Copy all fonts to for full build
  fullFonts: {
    options: {
      src: '<%= config.app %>/fonts/',
      dest: '<%= config.srcBuildFull %>/fonts'
    }
  },

  /**
   * DEPLOY
   **/
  deployToPixelastic: {
    options: {
      src: '<%= config.destBuildFull %>/',
      dest: 'pixelastic:/var/www/pixelastic.com/blog.pixelastic.com/',
      args: [
        '--verbose',
        '--archive',
        '--update',
        '--prune-empty-dirs',
        '--compress'
      ]
    }
  }
};
