'use strict';

module.exports = function(grunt) {

  grunt.registerTask('deploy', [
    'algolia',
    'rsync:deployToPixelastic'
  ]);

};
