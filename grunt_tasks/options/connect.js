'use strict';

module.exports = {
  options: {
    hostname: 'localhost'
  },
  dev: {
    options: {
      port: 9400,
      livereload: true,
      base: '<%= config.destBuildDev %>'
    }
  }
};
