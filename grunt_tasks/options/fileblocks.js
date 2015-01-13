module.exports = {
  options: {
    prefix: '/'
  },
  dev: {
    src: '<%= config.srcBuildDev %>/_layouts/default.html',
    blocks: {
      css: {
        cwd: '<%= config.srcBuildDev %>',
        src: [
          'css/normalize.css',
          'css/*.css'
        ]
      },
      js: {
        cwd: '<%= config.srcBuildDev %>',
        src: [
          'js/zepto.js',
          'js/lodash.min.js',
          'js/algoliasearch.min.js',
          'js/steppe.js',
          'js/search.js'
        ]
      }
    }
  },
  full: {
    src: '<%= config.srcBuildFull %>/_layouts/default.html',
    blocks: {
      css: {
        cwd: '<%= config.srcBuildFull %>',
        src: '*.css'
      }
    }
  }
};
