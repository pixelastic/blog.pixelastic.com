module.exports = {
  // First task will create a compiled .css file in build-dev whenever the
  // source .scss changes.
  // Second task will tell the browser de livereload whenever a .css file in
  // build-dev changes.
  // We need to separate this two tasks to be able to only reload the
  // changed css file and not the whole page
  devCompileScss: {
    files: ['<%= config.app %>/css/*.scss'],
    tasks: ['newer:sass:livereload']
  },
  devLivereloadScss: {
    files: ['<%= config.destBuildDev %>/css/*.css'],
    options: {
      livereload: true
    }
  }
};

