'use strict';

(function() {
  var algolia = new AlgoliaSearch('O3F8QXYK6R', '6a027258345c8a569385505b041e6dec');
  var index = algolia.initIndex('pixelastic_blog_posts');
  var input = $('#sidebar-search-input');
  var form = $('#sidebar-search-form');
  var template = $('#sidebar-search-suggestion-template').html();

  // Used to find all suggestion for a given input
  function find(input, callback) {
    if (!input) {
      callback();
      return;
    }
    index.search(input, function(success, content) {
      callback(content.hits);
    });
  }

  // Used to render a suggestion in the dropdown list
  function render(suggestion) {
    return _.template(template, suggestion);
  }

  // Used to display the currently selected suggestion in the input field
  function val(suggestion) {
    return suggestion.title;
  }

  // Triggered when submitting the form
  function submitForm(event) {
    event.preventDefault();
    if (!Steppe._private.selected || !Steppe._private.selected.url) {
      return;
    }
    document.location.href = Steppe._private.selected.url;
  }

  var options = {
    find: find,
    render: render,
    val: val
  };
  Steppe.init(input, options);
  form.on('submit', submitForm);
})();
