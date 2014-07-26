'use strict';

module.exports = function (grunt) {

  grunt.registerTask('serve:classicDev', 'Serve the Jekyll generated website, with only a few posts', [
    'jekyll:classicDev',
    'connect:classic:keepalive'
  ]);

  grunt.registerTask('serve:classic', 'Serve the Jekyll generated website', [
    'jekyll:classic',
    'connect:classic:keepalive'
  ]);

  grunt.registerTask('serve:buildDev', 'Serve the Jekyll generated website, with grunt optimization, but only a few posts', [
    'build:dev',
    'connect:build:keepalive'
  ]);

  grunt.registerTask('serve:build', 'Serve the Jekyll generated website, with grunt optimization', [
    'build',
    'connect:build:keepalive'
  ]);

};

