'use strict';
var Algolia = require('algolia-search');
var _ = require('lodash');

module.exports = function(grunt) {
  grunt.registerTask('algolia', function() {
    var done = this.async();
    var src = grunt.file.expand('./dist/**/*.json');

    // Credentials must be set in config
    var options = this.options();
    if (!options.applicationId || !options.apiKey || !options.indexName) {
      console.log('Algolia credentials not set.');
      done(false);
      return;
    }

    // Getting all posts
    var posts = _.map(src, function(post) {
      var data = grunt.file.readJSON(post);
      // Setting a unique id for Algolia
      data.objectID = data.id;
      // Saving escaped title
      data.title_escaped = _.escape(data.title);

      return data;
    });

    // Cleaning index and adding new data
    var client = new Algolia(options.applicationId, options.apiKey);
    var index = client.initIndex(options.indexName);
    index.clearIndex(function(err, data) {
      if (err) {
        console.log('Error clearing the index');
        console.log(data);
        return;
      }
      console.log('Indexing ' + posts.length + ' items');
      index.saveObjects(posts, function(err, data) {
        if (err) {
          console.log('Error adding posts');
          console.log(data);
          return;
        }
        done();
      });
    });
  });
};
