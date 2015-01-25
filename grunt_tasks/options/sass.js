'use strict';

module.exports = {
  options: {
    style: 'expanded'
  },
  devAppToTmp: {
    files: [{
      expand: true,
      cwd: 'app/css',
      src: '*.scss',
      dest: 'tmp/css/src',
      ext: '.css'
    }]
  },
  // Compile source files to tmp directory
  prodAppToTmp: {
    files: [{
      expand: true,
      cwd: 'app/css',
      src: '*.scss',
      dest: 'tmp/css/src',
      ext: '.css'
    }]
  }
};
