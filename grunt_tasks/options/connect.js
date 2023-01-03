/*eslint-env node*/

module.exports = {
  options: {
    port: 9410,
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
      keepalive: true
    }
  }
};
