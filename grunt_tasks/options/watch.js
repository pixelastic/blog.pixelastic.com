'use strict';

module.exports = {
  options: {
    livereload: false
  },
  reload: {
    options: {
      livereload: true
    },
    files: [
      'dist/css/*.css',
      'dist/js/*.js'
    ]
  },
  sass_config: {
    files: 'app/css/_*.scss',
    tasks: [
      'sass:devAppToTmp'
    ]
  },
  sass: {
    files: 'app/css/*.scss',
    tasks: [
      'newer:sass:devAppToTmp',
      'newer:autoprefixer:watchTmpToDist'
    ]
  },
  js: {
    files: 'app/js/*.js',
    tasks: [
      'rsync:watchJsAppToDist'
    ]
  }
};
