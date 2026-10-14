/**
 * Register the deploy task
 * @param {object} grunt - Grunt API
 */
export default function (grunt) {
  grunt.registerTask('deploy', ['build', 'rsync:deployToPixelastic']);
}
