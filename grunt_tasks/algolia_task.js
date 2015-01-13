'use strict';

module.exports = function(grunt) {

  // Déjà, on va changer les plugins jekyll pour créer des versions jsons des
  // posts
  // On mets la date, les tags, le texte markdown et le texte processé
  // Tout ça dispo en .json pour servir d'API
  //
  // Ensuite, il suffit de faire cette tache qui va lire les JSON et les mettre
  // dans l'index
  //
  // Et on fera une tache `grunt deploy` pour envoyer tout ça
  //
  // Et puis on mettre `grunt build` dans `grunt serve`

  grunt.registerTask('algolia', function() {
    // 
  });


};
