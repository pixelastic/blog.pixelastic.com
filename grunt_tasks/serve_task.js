'use strict';

module.exports = function(grunt) {

  grunt.registerTask('serve', function(target) {
    target = target || 'full';

    if (target === 'dev') {
      return grunt.task.run([
        'build:dev',
        'connect:dev',
        'watch'
      ]);
    }

    grunt.task.run([
      'build:full',
      'connect:full:keepalive'
    ]);
  });

};
