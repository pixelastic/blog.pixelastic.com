module.exports = {
  dev: {
    src: 'tmp/html/src/default.html',
    blocks: {
      css: {
        cwd: 'tmp/css/src',
        prefix: '/css',
        src: [
          'normalize.css',
          '*.css'
        ]
      },
      js: {
        cwd: 'tmp/js/src',
        prefix: '/js',
        src: [
          'zepto.min.js',
          'lodash.min.js',
          'algoliasearch.min.js',
          'steppe.js',
          'search.js'
        ]
      }
    }
  },
  // full: {
  //   src: '<%= config.srcBuildFull %>/_layouts/default.html',
  //   blocks: {
  //     css: {
  //       cwd: '<%= config.srcBuildFull %>',
  //       src: '*.css'
  //     }
  //   }
  // }
};
