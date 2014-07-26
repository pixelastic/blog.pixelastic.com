'use strict';

module.exports = function (grunt) {
  grunt.registerTask('optimize:init', [
    'useminPrepare:build', // generate default concat, cssmin and uglify config
    'newer:concat' // concatenate all CSS and JS in a staging directory
  ]);

  // grunt.registerTask('optimize:images', [
  //   'newer:imagemin:jpg',
  //   'newer:imagemin:png',
  //   'newer:imagemin:gif',
  //   'cleanup:images' // remove files from dist no longer in app
  // ]);

  grunt.registerTask('optimize:css', [
    // 'newer:compass', // convert scss to css
    'newer:cssmin' // minify
  ]);

  // grunt.registerTask('optimize:js', [
  //   'newer:uglify' // minify JS
  // ]);


  grunt.registerTask('optimize:html', [
    'usemin', // update files in output directory with links to compresses CSS/JS
    'htmlmin:build' // minify the final files
  ]);
};



