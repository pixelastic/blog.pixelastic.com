'use strict';

module.exports = function(grunt) {

  grunt.registerTask('optimize:css', function(target) {
    target = target || 'full';

    grunt.task.run([
      'newer:cssmin:' + target
    ]);
  });

  grunt.registerTask('optimize:html', function(target) {
    target = target || 'full';

    grunt.task.run([
      'htmlmin:' + target
    ]);

  });

};
