'use strict';

module.exports = function(grunt) {

  grunt.registerTask('serve', function(target) {
    target = target || 'full';
    grunt.task.run([
      'connect:' + target + ':keepalive'
    ]);
  });

};
