'use strict';

module.exports = function(grunt) {
  grunt.registerTask(
    'build:full',
    'Build application into the ./dist folder, ready to be deployed', [
      'mkdir',
      'rsync:preBuildFull',
      'optimize:fonts:full',
      'optimize:css:full',
      'optimize:js:full',
      'fileblocks:full',
      'jekyll:full',
      'optimize:html:full'
    ]);
  grunt.registerTask('build', 'build:full');

};
