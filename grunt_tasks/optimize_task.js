'use strict';

module.exports = function(grunt) {

  grunt.registerTask('optimize:css:dev', [
    'sass:dev'
  ]);


  grunt.registerTask('optimize:css:full', [
    'sass:full',
    'cssmin:full'
  ]);
  grunt.registerTask('optimize:css', 'optimize:css:full');

  grunt.registerTask('optimize:html', function(target) {
    target = target || 'full';

    grunt.task.run([
      'htmlmin:' + target
    ]);

  });

};
