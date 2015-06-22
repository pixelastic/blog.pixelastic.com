/* eslint-env node */

module.exports = function(grunt) {
  grunt.registerTask('algolia', [
    'build',
    'shell:jekyllAlgolia'
  ]);

};
