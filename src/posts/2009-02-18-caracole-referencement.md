---
layout: post
title: "Caracole - Référencement"
custom_v2_id: 7
tags: cakephp, caracole
---

Le référencement est une des préocupations principales de nos clients, tous
veulent savoir si avec le produit qu'on leur propose ils seront en mesure
d'être les premiers dans les résultats Google.

Bien qu'il n'existe pas de recette miracle pour parvenir à ce résultat,
certaines sociétés sont spécialisés dans ce business et déploient des trésors
d'ingéniosité pour réussir à faire grimper les pages de leurs clients dans les
index des moteurs.

Mais c'est un boulot à part entière, et ce n'est pas le nôtre. Nous faisons
des sites web, à chacun sa spécialité.

Malgré tout, il existe plusieurs bonnes pratiques qui permettent d'obtenir de
bons résultats sans trop d'efforts, et Caracole s'en sort pas trop mal de ce
coté là.

Tout d'abord il tire parti de la façon dont les urls sont gérées par cakePHP,
et donc aucune url ne contient de paramètre de la forme ?foo=bar&action=foobar
qui sont très mal indexées. Chaque page possède donc sa propre url unique. Les
méthodes d'url rewriting proposées de base par cakePHP sont très puissantes et
font déjà une très grosse partie du travail.

Dans la même veine, il est possible de définir des 'slugs' pour chaque
élément, un slug permet de donner un identifiant à chacune des pages, ce qui
signifie qu'au lieu de retrouver un élément par son id dans l'url (un simple
nombre, qui ne donne pas d'indication sur le contenu), on peut à la place le
remplacer par un slug (du genre 'services', 'nous-contacter', etc). Cela donne
des urls du genre /services.html, /posts/1:mon-premier-post, etc

Cela facilite le référencement des pages car des mots clés se rapportant au
contenu de la page peuvent déjà être mis dans l'url, qui est une place
privilégiée.

Ici encore, il suffit d'ajouter un champ 'slug' dans la table correspondante
au modèle pour que celui-ci soit automatiquement généré à partir du nom (il
est bien sur possible de le modifier si besoin).

Caracole est aussi doté d'un système de génération automatique de sitemap (le
plan du site). Celui-ci est généré en deux versions, une version html pour vos
visiteurs, et une version XML (qui indique les fréquences de réactualisations
ainsi que les dates de dernière modification) pour les moteurs.

Et pour finir, je vais passer rapidement sur les essentiels : balise <title>
et meta description différents pour chaque page, fichier robots.txt, texte
alternatif sur les images et accessibilité du markup HTML mais bien sur,
Caracole se charge de tout cela aussi.