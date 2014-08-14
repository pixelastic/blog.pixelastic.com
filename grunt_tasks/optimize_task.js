'use strict';

module.exports = function(grunt) {

  // Compiles SCSS into src-dev, 
  // then copy all bower css into src-dev
  // autoprefix all css files in src-dev
  grunt.registerTask('optimize:css:dev', [
    'sass:dev',
    'rsync:devBowerCss',
    'autoprefixer:dev'
  ]);


  // Compiles all scss into tmp directory
  // Copies all bower css to tmp directory
  // autoprefix all css files in tmp directory
  // concatenate and minify all css in tmp into src-full
  grunt.registerTask('optimize:css:full', [
    'sass:full',
    'rsync:fullBowerCss',
    'autoprefixer:full',
    'newer:cssmin:full'
  ]);
  grunt.registerTask('optimize:css', 'optimize:css:full');

  grunt.registerTask('optimize:html', function(target) {
    target = target || 'full';

    grunt.task.run([
      'htmlmin:' + target
    ]);

  });

};
