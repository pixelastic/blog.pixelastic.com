'use strict';

module.exports = {
  options: {
    port: 9400,
    hostname: 'localhost',
    base: 'dist'
  },
  dev: {
    options: {
      livereload: true
    }
  },
  prod: {
    options: {
      keepalive:true
    }
  }
};
