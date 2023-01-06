$(function () {

  const searchClient = algoliasearch('O3F8QXYK6R', '6a027258345c8a569385505b041e6dec');
  const search = instantsearch({
    indexName: 'blog',
    searchClient: searchClient,
  });

  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#search-searchbar',
      placeholder: 'Search on this site...',
      poweredBy: true
    })
  );

  search.addWidget(
    instantsearch.widgets.hits({
      container: '#search-hits',
      transformItems: function (hits) {
        return _.map(hits, function (hit) {
          hit.title = hit._highlightResult.title.value
          hit.content = hit._highlightResult.content.value
          return hit;
        });
      },
      templates: {
        item: $("#algolia__template").text(),
        empty: $("#algolia__template--no-results").text(),
      }
    })
  );

  // Starting the search
  search.start();


  const $staticContent = $("#content-static");
  const $searchContent = $("#content-search");
  const $searchBar = $('.ais-SearchBox-input');
  $searchBar.on('input', function(event) {
    const query = event.target.value;
    if (!query) {
      $searchContent.hide();
      $staticContent.show();
    } else {
      $searchContent.show();
      $staticContent.hide();
    }
  });
});

