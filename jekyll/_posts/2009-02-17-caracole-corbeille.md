---
layout: post
title: "Caracole - Corbeille"
custom_v2_id: 5
tags: caracole, cakephp
---

Dans la lignée du principe de brouillon j'ai aussi ajouté une fonction de
"Corbeille". Ca fonctionne exactement comme celle du bureau de Windows qu'on
est bien content d'avoir quand on a eu la main un peu généreuse dans les
fichiers à supprimer.

Elle fait office de sécurité et les éléments soit-disant supprimés ne sont pas
réellement effacés instantanément, ils passent dans une corbeille
intermédiaire. A partir de là, si on se rends compte qu'on a fait une bétise,
on peut toujours les restaurer à leur état d'origine. Ou alors vider la
corbeille de temps en temps pour faire de la place.

Exactement de la même façon que pour les brouillons, il suffit ici d'ajouter
un champ 'is_deleted' à la table du modèle correspondant pour lui ajouter la
fonction de corbeille, Caracole se charge du reste.

Les éléments supprimés ne sont plus retournés par les fonctions de recherche
habituelle, à moins de préciser l'option 'includeDeleted'.