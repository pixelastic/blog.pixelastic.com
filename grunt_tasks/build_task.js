'use strict';

module.exports = function(grunt) {

  grunt.registerTask('build:dev', [
    'mkdir',
    'rsync:preBuildDev',
    'optimize:css:dev',
    'optimize:js:dev',
    'fileblocks:dev',
    'jekyll:dev',
    'optimize:html:dev'
  ]);

  grunt.registerTask('build:full', [
    'mkdir', // Creates needed directories
    'rsync:preBuildFull', // Copy Jekyll base to tmp
    'optimize:fonts:full', // Copy and version fonts
    'optimize:css:full', // Copy and minify css
    'fileblocks:full', // Update HTML markup to include CSS
    'jekyll:full', // Run Jekyll
    'optimize:html:full' // Optimize output HTML
  ]);
  grunt.registerTask('build', 'build:full');

};
