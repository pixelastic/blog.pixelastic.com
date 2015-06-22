/* eslint-env node */

module.exports = function(grunt) {
  grunt.registerTask('serve', function() {
    var type = (this.args[0] || 'dev');

    switch (type) {
      case 'prod':
        grunt.task.run([
          'build',
          'connect:prod'
        ]);
        break;

      case 'dev':
        grunt.task.run([
          'compile',
          'connect:dev',
          'watch'
        ]);
        break;
    }
  });
};
