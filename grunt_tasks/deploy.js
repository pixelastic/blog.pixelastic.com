/* eslint-env node */

module.exports = function(grunt) {

  grunt.registerTask('deploy', [
    'build',
    'rsync:deployToPixelastic',
    'shell:jekyllAlgolia'
  ]);

};
