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
      'sass:devAppToTmp',
      'newer:autoprefixer:watchTmpToDist'
    ]
  },
  js: {
    files: 'app/js/*.js',
    tasks: [
      'rsync:watchJsAppToDist'
    ]
  },
  layouts: {
    files: 'app/_layouts/**/*.html',
    tasks: [
      'rsync:devHtmlAppToTmp',
      'fileblocks:dev',
      'rsync:devHtmlTmpToJekyll',
      'jekyll:dev'
    ]
  },
  markdown: {
    files: [
      'app/_posts/*.md',
      'app/_drafts/*.md'
    ],
    tasks: [
      'rsync:devJekyllPrepare',
      'jekyll:dev'
    ]
  }
};
