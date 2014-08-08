'use strict';

module.exports = {
  options: {
    hostname: 'localhost',
    livereload: 35729
  },
  dev: {
    options: {
      port: 9400,
      base: '<%= config.destBuildDev %>'
    }
  }
};
