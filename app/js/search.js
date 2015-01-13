var input = $('#search');
var options = {
  find: function(input, callback) {
    var output = input ? ['Funambule', 'Nage', 'Brouette'] : [];
    callback(output);
  }
};
Steppe.init(input, options);


// $(function() {
//   var algolia = new AlgoliaSearch('O3F8QXYK6R', '6a027258345c8a569385505b041e6dec');
//   var index = algolia.initIndex('cities');
//   var input = $('#search');
//   var options = {
//     hint: false
//   };
//   var datasets = {
//     name: 'cities',
//     displayKey: 'name',
//     source: index.ttAdapter({
//       hitsPerPage: 5
//     }),
//     templates: {
//       suggestion: function(hit) {
//         return '<div class="search_form_suggestion"><span class="city">' + hit._highlightResult.name.value + '</span><span class="code">' + hit.code + '</span></div>';
//       }
//     }
//   };
// 
//   input.typeahead(options, datasets);
// });
