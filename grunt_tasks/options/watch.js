/* eslint-env node */

module.exports = {
  options: {
    livereload: false
  },
  livereload: {
    options: {
      livereload: true
    },
    files: [
      'dist/css/*.css',
      'dist/js/*.js',
      'dist/fonts/*',
      'dist/img/*'
    ]
  },
  jekyll: {
    files: [
      'app/**/index.html',
      'app/**/_layouts/**/*.html',
      'app/**/*.md',
      'app/**/_plugins/*.rb'
    ],
    tasks: [
      'rsync:devHtmlAppToTmp',
      'fileblocks:dev',
      'rsync:devHtmlTmpToJekyll',
      'rsync:devJekyllPrepare',
      'shell:jekyllDev'
    ]
  },
  bowerCss: {
    files: 'bower_components/**/*.css',
    tasks: [
      'rsync:devCssDependenciesToJekyll',
      'rsync:devCssDependenciesToDist'
    ]
  },
  css: {
    files: 'app/css/*.scss',
    tasks: [
      'newer:sass:devAppToTmp',
      'newer:autoprefixer:devTmpToJekyll',
      'rsync:devCssTmpToDist'
    ]
  },
  bowerJs: {
    files: 'bower_components/**/*.js',
    task: [
      'rsync:devJsDependenciesToJekyll',
      'rsync:devJsDependenciesToDist'
    ]
  },
  js: {
    files: 'app/js/*.js',
    tasks: [
      'rsync:devJsAppToJekyll',
      'rsync:devJsAppToDist'
    ]
  }
};
