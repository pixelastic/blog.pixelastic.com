/*eslint-env node*/

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
  prodTmpToTmp: {
    expand: true,
    flatten: true,
    src: 'tmp/css/src/*.css',
    dest: 'tmp/css/src'
  }
};

