module.exports = {
  devTmpToJekyll: {
    expand: true,
    flatten: true,
    src: 'tmp/css/src/*.css',
    dest: 'tmp/jekyll/css'
  },
  watchTmpToDist: {
    expand: true,
    flatten: true,
    src: 'tmp/css/src/*.css',
    dest: 'dist/css'
  },
  // full: {
  //   expand: true,
  //   flatten: true,
  //   src: '<%= config.tmpCssBuildFull %>/*.css',
  //   dest: '<%= config.tmpCssBuildFull %>'
  // }

};

