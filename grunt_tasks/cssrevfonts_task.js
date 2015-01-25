'use strict';

module.exports = function(grunt) {
  // This will read the file specified in config and replace any reference to
  // font files with references to the versionned files exposed by filerev.
  // Note that this will overwrite the file.
  grunt.registerMultiTask(
    'cssrevfonts',
    'Update font reference in build CSS to use versioned files',
    function() {
      var _ = grunt.util._;
      if (!grunt.filerev || !grunt.filerev.summary) {
        return;
      }

      // Removing prefix, keeping only real filepath to fonts
      var summary = {};
      _.each(grunt.filerev.summary, function(value, key) {
        var pattern = /^(.*)(\/fonts\/(.*))$/;
        var originalPath = pattern.exec(key)[2];
        var versionedPath = pattern.exec(value)[2];
        summary[originalPath] = versionedPath;
      });

      // Updating file content
      this.files.forEach(function(file) {
        file.src.forEach(function(filepath) {
          var content = grunt.file.read(filepath);
          _.each(summary, function(value, key) {
            content = content.replace(new RegExp(key, 'g'), value);
          });
          grunt.file.write(filepath, content);
          console.log('Rewriting ' + filepath + ' with versioned font files.');
        });
      });

    });
};
