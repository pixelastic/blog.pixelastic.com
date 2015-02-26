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
      data.titleEscaped = _.escape(data.title);
      
      // Removing videos from html returned
      var videoPattern = /<iframe(.*)src="([^ ]*)"(.*)<\/iframe>/g;
      data.html = data.html.replace(videoPattern, '<a href="$2" target="_blank">Voir la vidéo</a>');

      return data;
    });

    // Cleaning index and adding new data
    var client = new Algolia(options.applicationId, options.apiKey);
    var index = client.initIndex(options.indexName);
    index.clearIndex(function(err, data) {
      if (err) {
        console.log('Error clearing the index');
        console.log(data);
        done(false);
        return;
      }
      console.log('Indexing ' + posts.length + ' items');
      index.saveObjects(posts, function(err, data) {
        if (err) {
          console.log('Error adding posts');
          console.log(data);
          done(false);
          return;
        }
        done();
      });
    });
  });
};
