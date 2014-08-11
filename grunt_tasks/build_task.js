'use strict';

module.exports = function(grunt) {

  grunt.registerTask('build:dev', [
    'newer:copy:preBuildDev',
    'optimize:css:dev',
    'fileblocks:dev',
    'jekyll:dev',
    'optimize:html:dev'
  ]);

  grunt.registerTask('build:full', [
    'newer:copy:preBuildFull',
    'optimize:css:full',
    'fileblocks:full',
    'jekyll:full',
    'optimize:html:full'
  ]);
  grunt.registerTask('build', 'build:full');

};
