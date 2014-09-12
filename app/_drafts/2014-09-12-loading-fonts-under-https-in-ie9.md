---
layout: post
title: "Loading fonts under https in IE9"
tags: ie9, https, fonts, eot, woff, ttf
---

Pas encore trouvé de solution. Sous IE9 (testé uniquement en IE11 mode
compatibilité pour le moment), charger une font avec la méthode bulletproof ne
fonctionne pas en https.

En regardant la console de IE on voit qu'il faut une requete vers la première
font, qui réponds avec un 200 OK, un Content-Size correct, mais il ne
télécharge que environ 200B. Puis il passe au suivant dans la liste (woff, ttf,
eot) et recommence.

Au final il ne parvient à en télécharger aucun et donc aucune font ne s'affiche
sur le site. Le problème n'a lieu que en https.

Le problème semble connu, il semble y avoir un soucis avec le serveur. Sous un
Apache il faut empecher de le cacher en fonction du Vary (mais je n'ai aucun
header Vary envoyé), ou désactiver la mise en cache avec Cache-Control:
no-cache, que je n'ai pas non plus.

POur le moment, pas de solution trouvée.
