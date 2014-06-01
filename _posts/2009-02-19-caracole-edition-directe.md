---
layout: post
title: "Caracole - Edition directe"
custom_v2_id: 10
---

En plus de son interface d'administration complète, Caracole permet un mode
d'édition rapide directement accessible depuis le coté front-end des sites,
pour corriger rapidement un titre ou un coquille qui se serait glissée quelque
part.

Grâce à jQuery et cakePHP, cette fonctionnalité est très simple à utiliser. Il
suffit pour cela d'avoir les droits d'administration sur le site que l'on veut
modifier. Il suffit ensuite d'y naviguer avec un navigateur assez récent (cela
signifie que IE6 n'y est pas convié) et s'affichera alors automatiquement en
haut à gauche de l'écran un petit switch qui permet d'activer ou de désactiver
en un clic le mode édition.

Lorsque le mode d'édition est activé, il suffit de cliquer sur une zone que
l'on veut modifier pour la transformer automatiquement en champ de formulaire
modifiable (avec intégration de tinyMCE pour les grands textes). Il suffit
alors de modifier le texte exactement comme on peut le faire dans l'admin et
de valider. La modification est prise en compte automatiquement.

Coté développeur, il suffit d'ajouter une class="editable" ainsi qu'un id
formé de la forme "controller-champ-id". Ainsi id="posts-text-12" identifiera
le champ "text" du 12e post.

C'est extremement pratique pour modifier des fautes de frappe, ou faire des
tas de petites modifications, je m'en sers énormément et c'est un pas de plus
pour faciliter l'administration à l'utilisateur final.

