'use strict';

(function() {
  var algolia = new AlgoliaSearch('O3F8QXYK6R', '6a027258345c8a569385505b041e6dec');
  var index = algolia.initIndex('pixelastic_blog_posts');
  var content = $('#content');
  var searchInput = $('#sidebar-search-input');
  var searchResults = $('#search-results');
  var templateEmpty = $('#search-results-empty-template').html();
  var templatePost = $('#search-results-post-template').html();

  // Used to find all suggestion for a given input
  function find(query, callback) {
    if (!query) {
      content.removeClass('search-enabled');
      callback();
      return;
    }
    index.search(query, function(success, results) {
      content.addClass('search-enabled');
      // Empty results
      if (results.nbHits === 0) {
        searchResults.html(templateEmpty);
        return;
      }

      callback(results.hits);
    });
  }

  // Used to render a suggestion in the dropdown list
  function render(suggestion) {
    function getHighlight(key) {
      return suggestion._highlightResult[key].value;
    }
    var props = {
      title: getHighlight('titleEscaped'),
      content: getHighlight('html'),
      url: suggestion.url,
      date: moment(suggestion.date, 'X').format('D MMM YYYY')
    };

    scrollToFirstMatch();

    return _.template(templatePost, props);
  }
  
  // Scroll to first highlighted word
  // Debounced so it won't be called too fast and too often
  var scrollToFirstMatch = _.debounce(function() {
    var highlight = $('strong.search-highlight')[0];
    if (!highlight) {
      return;
    }
    var elementOffset = highlight.getBoundingClientRect().top + window.pageYOffset;
    var elementHeight = $(highlight).height();
    var windowHeight = $(window).height();
    var scrollOffset = elementOffset - windowHeight/2 - elementHeight/2;

    window.scroll(0, scrollOffset);
  }, 100, { trailing: true });

  // Used to display the currently selected suggestion in the input field
  function val(suggestion) {
    return suggestion.title;
  }

  var options = {
    mode: 'fulltext',
    output: searchResults,
    find: find,
    render: render,
    val: val
  };
  Steppe.init(searchInput, options);
})();
