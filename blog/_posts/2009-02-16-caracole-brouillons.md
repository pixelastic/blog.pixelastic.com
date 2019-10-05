---
layout: post
title: "Caracole - Brouillons"
custom_v2_id: 4
tags: caracole, cakephp
---

Une des fonctionnalités les plus pratiques de Wordpress, c'est de pouvoir
enregistrer un billet comme brouillon lorsqu'on ne l'a pas terminé. Ca permet
d'y revenir plus tard et de le garder dans un coin sans qu'il ne soit perdu.

J'ai ajouté cette fonctionnalité à Caracole hier, et elle peut s'appliquer à
n'importe quel modèle (actuellement je l'ai mise sur les pages et les billets
de blog uniquement, mais comme vous allez le voir, c'est très facile à ajouter
pour n'importe quel modèle).

Une case à cocher "Enregistrer comme brouillon" permet d'enregistrer l'élement
comme brouillon, cela signifie qu'il ne sera plus visible sur le site tant
qu'il restera à l'état de brouillon.

Pour le développeur, c'est très simple à utiliser, il suffit de rajouter un
champ 'is_draft' dans la table correspondante au modèle et Caracole se charge
du reste. Les brouillons ne sont plus retournés par les recherches, à moins de
préciser 'includeDraft' dans les options de recherche, ce qui permet de garder
le code le plus clair possible.

Dans l'admin, les brouillons restent bien sur visibles (bien qu'indiqués de
façon légerement différente), et il suffit d'aller décocher la case pour les
publier réellement.