/* eslint-env node */

module.exports = function(grunt) {
  grunt.registerTask(
    'compile',
    'Compile the website to be served locally', [
      'mkdir:dev',
      // CSS
      'rsync:devCssDependenciesToJekyll',
      'sass:devAppToTmp',
      'autoprefixer:devTmpToJekyll',
      // JS
      'rsync:devJsDependenciesToJekyll',
      'rsync:devJsAppToJekyll',
      // HTML
      'rsync:devHtmlAppToTmp',
      'fileblocks:dev',
      'rsync:devHtmlTmpToJekyll',
      // JEKYLL
      'rsync:devJekyllPrepare',
      'shell:jekyllDev',
      // CSS and JS maps
      'rsync:prodCssMapsToDist',
      'rsync:prodJsMapsToDist',
    ]);
};
