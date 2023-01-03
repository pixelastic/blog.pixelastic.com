/* eslint-env node */

module.exports = function(grunt) {
  grunt.registerTask(
    'build',
    'Build application into the ./dist folder, ready to be deployed', [
      'clean:all',
      'mkdir:prod',
      // FONTS
      'filerev:prodFontsAppToJekyll',
      // CSS
      'rsync:prodCssDependenciesToTmp',
      'sass:prodAppToTmp',
      'cssrevfonts:prodTmpToTmp',
      'newer:autoprefixer:prodTmpToTmp',
      'newer:cssmin:prodTmpToOutput',
      'filerev:prodCssOutputToJekyll',
      // JS
      'rsync:prodJsDependenciesToTmp',
      'uglify:prodAppToTmp',
      'concat:prodJsTmpToOutput',
      'filerev:prodJsOutputToJekyll',
      // HTML
      'rsync:prodHtmlAppToTmp',
      'fileblocks:prod',
      'rsync:prodHtmlTmpToJekyll',
      // JEKYLL
      'rsync:prodJekyllPrepare',
      'shell:jekyllProd',
      'htmlmin:prodDistToDist',
      // CSS and JS maps
      'rsync:prodCssMapsToDist',
      'rsync:prodJsMapsToDist',
    ]);
};
