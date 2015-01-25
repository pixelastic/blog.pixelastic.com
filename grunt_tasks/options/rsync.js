module.exports = {
  options: {
    recursive: true,
    args: [
      '--archive',
      '--prune-empty-dirs'
    ]
  },

  /* DEV */
  // CSS
  devCssDependenciesToTmp: {
    options: {
      src: [
        'bower_components/normalize-css/normalize.css'
      ],
      dest: 'tmp/css/src'
    }
  },
  // JS
  devJsDependenciesToTmp: {
    options: {
      src: [
        'bower_components/zepto/zepto.min.js',
        'bower_components/lodash/dist/lodash.min.js',
        'bower_components/algoliasearch/dist/algoliasearch.min.js'
      ],
      dest: 'tmp/js/src'
    }
  },
  devJsAppToTmp: {
    options: {
      src: [
        'app/js/steppe.js',
        'app/js/search.js'
      ],
      dest: 'tmp/js/src'
    }
  },
  devJsTmpToJekyll: {
    options: {
      src: 'tmp/js/src/*.js',
      dest: 'tmp/jekyll/js'
    }
  },
  // HTML
  devHtmlAppToTmp: {
    options: {
      src: 'app/_layouts/',
      dest: 'tmp/html/src',
      args: [
        '--archive',
        '--recursive',
        '--delete',
        '--prune-empty-dirs',
        '--include=*/',
        '--include=*.html',
        '--exclude=*'
      ]
    }
  },
  devHtmlTmpToJekyll: {
    options: {
      src: 'tmp/html/src/',
      dest: 'tmp/jekyll/_layouts',
      args: [
        '--archive',
        '--recursive',
        '--delete',
        '--prune-empty-dirs',
        '--include=*/',
        '--include=*.html',
        '--exclude=*'
      ]
    }
  },
  // JEKYLL
  devJekyllPrepare: {
    options: {
      src: './app/*',
      dest: './tmp/jekyll',
      exclude: [
        'css/',
        'js/',
        '_layouts'
      ]
    }
  },

  /* WATCH */
  watchJsAppToDist: {
    options: {
      src: 'app/js/*.js',
      dest: 'dist/js/'
    }
  },
  





  // /**
  //  * DEV
  //  **/
  // // JEKYLL : Copy jekyll source for dev build
  // preBuildDev: {
  //   options: {
  //     src: '<%= config.app %>/*',
  //     dest: '<%= config.srcBuildDev %>',
  //     exclude: ['css/']
  //   }
  // },
  // // CSS : Copy all bower css files to build-dev
  // devBowerCss: {
  //   options: {
  //     src: '<%= config.bower %>/**/*.css',
  //     dest: '<%= config.srcBuildDev %>/css'
  //   }
  // },
  // // JS :  Copy all js files to build-dev
  // devJs: {
  //   options: {
  //     src: [
  //       '<%= config.bower %>/zepto/zepto.js',
  //       '<%= config.bower %>/lodash/dist/lodash.min.js',
  //       '<%= config.bower %>/algoliasearch/dist/algoliasearch.min.js',
  //       '<%= config.app %>/js/steppe.js',
  //       '<%= config.app %>/js/search.js'
  //     ],
  //     dest: '<%= config.srcBuildDev %>/js'
  //   }
  // },

  // /**
  //  * WATCH
  //  **/
  // // JS : Copy app JS files to dist when updated
  // watchJsCopyAppToDist: {
  //   options: {
  //     src: '<%= config.app %>/js/*.js',
  //     dest: '<%= config.destBuildDev %>/js'
  //   }
  // },

  // /**
  //  * FULL
  //  **/
  // // JEKYLL : Copy jekyll source for full build
  // preBuildFull: {
  //   options: {
  //     src: '<%= config.app %>/*',
  //     dest: '<%= config.srcBuildFull %>',
  //     exclude: ['css/', 'fonts/']
  //   }
  // },
  // // CSS : Copy all bower css files to tmp
  // fullBowerCss: {
  //   options: {
  //     src: '<%= config.bower %>/**/*.css',
  //     dest: '<%= config.tmpCssBuildFull %>'
  //   }
  // },
  // // JS : Copy all js files to tmp
  // fullJs: {
  //   options: {
  //     src: [
  //       '<%= config.bower %>/zepto/zepto.js',
  //       '<%= config.bower %>/lodash/dist/lodash.min.js',
  //       '<%= config.bower %>/algoliasearch/dist/algoliasearch.min.js',
  //       '<%= config.app %>/js/steppe.js',
  //       '<%= config.app %>/js/search.js'
  //     ],
  //     dest: '<%= config.tmpCssBuildFull %>/js'
  //   }
  // },
  // // FONTS : Copy all fonts to for full build
  // fullFonts: {
  //   options: {
  //     src: '<%= config.app %>/fonts/',
  //     dest: '<%= config.srcBuildFull %>/fonts'
  //   }
  // },

  // /**
  //  * DEPLOY
  //  **/
  // deployToPixelastic: {
  //   options: {
  //     src: '<%= config.destBuildFull %>/',
  //     dest: 'pixelastic:/var/www/pixelastic.com/blog.pixelastic.com/',
  //     args: [
  //       '--verbose',
  //       '--archive',
  //       '--update',
  //       '--prune-empty-dirs',
  //       '--compress'
  //     ]
  //   }
  // }
};
