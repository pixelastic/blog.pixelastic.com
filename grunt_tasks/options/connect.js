'use strict';

module.exports = {
  options: {
    hostname: 'localhost'
  },
  dev: {
    options: {
      port: 9400,
      livereload: true,
      base: 'dist'
    }
  },
  full: {
    options: {
      port: 9400,
      base: '<%= config.destBuildFull %>'
    }
  }

};
