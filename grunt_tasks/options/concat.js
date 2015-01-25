'use strict';

module.exports = {
  prodJsAllTmpFile: {
    src: [
      '.tmp/js/src/bower/FileAPI.js',
      '.tmp/js/src/bower/FileAPI.exif.js',
      '.tmp/js/src/bower/angular.js',
      '.tmp/js/src/bower/famous-global.js',
      '.tmp/js/src/bower/messageformat.js',
      '.tmp/js/src/bower/angular-translate.js',
      '.tmp/js/src/bower/angular-translate-interpolation-messageformat.js',
      '.tmp/js/src/bower/*.js',

      '.tmp/templates/output/app-templates.js',
      '.tmp/js/src/core-config.js',
      '.tmp/js/src/core/core.js',
      '.tmp/js/src/core/*.js',
      '.tmp/js/src/core/**/*.js',
      '.tmp/js/src/components/**/*.js'
    ],
    dest: '.tmp/js/output/scripts.js'
  }
};

