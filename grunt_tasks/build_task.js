'use strict';

module.exports = function(grunt) {

  grunt.registerTask('build', function (target) {
    target = target || 'full';

    grunt.task.run([
      'jekyll:' + target,
      'optimize:css:' + target,
      'optimize:html:' + target
    ]);
  });

};

