'use strict';

module.exports = function(grunt) {

  grunt.registerTask('serve', function(target) {
    target = target || 'full';

    if (target === 'dev') {
      return grunt.task.run([
        'connect:dev',
        'watch:livereloadCss'
      ]);
    }

    grunt.task.run([
      'connect:' + target + ':keepalive'
    ]);
  });

};
