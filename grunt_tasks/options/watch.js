module.exports = {
  options: {
    livereload: true
  },
  // Note: The task that triggers the livereload in the browser must only watch
  // .css file to trigger a soft reload (only reloading CSS files, not the
  // whole page). So we put it in its own task (devLivereloadCss) that watches
  // the build-dev folder
  //
  // The other task will compile css from SCSS to autoprefixed-css, by using
  // a temporary folder and outputting the final result in build-dev
  devCompileCss: {
    options: {
      livereload: false
    },
    files: ['<%= config.app %>/css/*.scss'],
    tasks: [
      'newer:sass:livereload',
      'newer:autoprefixer:livereload'
    ]
  },
  devLivereloadScss: {
    files: ['<%= config.destBuildDev %>/css/*.css']
  },
  devCompileJs: {
    files: ['<%= config.app %>/js/*.js'],
    tasks: ['rsync:watchJsCopyAppToDist']
  },
  devRebuild: {
    files: [
      '<%= config.app %>/_layouts/*.html',
      '<%= config.app %>/_drafts/*.md'
    ],
    tasks: ['build:dev']
  }
};
