'use strict';

module.exports = {
  options: {
    port: 9100,
    hostname: 'localhost',
    livereload: 35729
  },
  classic: {
    options: {
      port: 9400,
      base: '<%= config.jekyllDestClassic %>'
    }
  },
  build: {
    options: {
      port: 9800,
      base: '<%= config.jekyllDestBuild %>'
    }
  }
};
