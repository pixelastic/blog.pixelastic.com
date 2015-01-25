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
  // // Compile source files to tmp directory
  // full: {
  //   files: [{
  //     expand: true,
  //     cwd: '<%= config.app %>/css',
  //     src: '*.scss',
  //     dest: '<%= config.tmpCssBuildFull %>',
  //     ext: '.css'
  //   }]
  // }

};

