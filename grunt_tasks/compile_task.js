'use strict';

module.exports = function(grunt) {
  grunt.registerTask(
    'compile',
    'Compile the website to be served locally', [
      'mkdir:dev',
      // CSS
      'rsync:devCssDependenciesToTmp',
      'sass:devAppToTmp',
      'autoprefixer:devTmpToJekyll',
      // JS
      'rsync:devJsDependenciesToTmp',
      'rsync:devJsAppToTmp',
      'rsync:devJsTmpToJekyll',
      // HTML
      'rsync:devHtmlAppToTmp',
      'fileblocks:dev',
      'rsync:devHtmlTmpToJekyll',
      // JEKYLL
      'rsync:devJekyllPrepare',
      'jekyll:dev'
    ]);
};
