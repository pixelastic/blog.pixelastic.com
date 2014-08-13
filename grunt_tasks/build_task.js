'use strict';

module.exports = function(grunt) {

  grunt.registerTask('build:dev', [
    'rsync:preBuildDev',
    'optimize:css:dev',
    'fileblocks:dev',
    'jekyll:dev',
    'optimize:html:dev'
  ]);

  grunt.registerTask('build:full', [
    'rsync:preBuildFull',
    'optimize:css:full',
    'fileblocks:full',
    'jekyll:full',
    'optimize:html:full'
  ]);
  grunt.registerTask('build', 'build:full');

};
