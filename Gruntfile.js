'use strict';
// More maintainable Gruntfiles: http://www.thomasboyt.com/2013/09/01/maintainable-grunt.html

module.exports = function(grunt) {
  var _ = grunt.util._;

  require('time-grunt')(grunt); // build statistics

  // load all Grunt tasks from node_modules
  const allGruntPlugins = _.without(require('matchdep').filterDev('grunt-*'), 'grunt-cli');
  allGruntPlugins.forEach(grunt.loadNpmTasks); 

  var Helpers = require('./grunt_tasks/helpers'); // Grunt helpers file, make it easier to load config
  var config = Helpers.defaultConfig;
  var sharedConfig = {
    config: {
      tmp: './tmp',
      tmpCssLivereload: './tmp/css-livereload',
      tmpCssBuildFull: './tmp/css-build-full',
      app: './app',
      bower: './bower_components',
      srcBuildFull: './tmp/src-full',
      srcBuildDev: './tmp/src-dev',
      destBuildFull: './dist/build-full',
      destBuildDev: './dist/build-dev'
    }
  };

  config = _.extend(config, sharedConfig, Helpers.loadConfig('./grunt_tasks/options/'));
  grunt.initConfig(config); // load all configs, from the folder './grunt_tasks/options'
  grunt.loadTasks('grunt_tasks'); // load all tasks, from the folder './grunt_tasks'

  grunt.registerTask('default', ['build']);
};

