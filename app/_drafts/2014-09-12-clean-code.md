---
layout: post
title: "Clean code"
tags:
---

Dernièrement je m'astreint à ces rules de clean code :

- Return early, return often (blog post de Felix) et stack overflow. On quitte
  rapidement une méthode quand les pré-requis ne sont pas bon. Comme àa on
  a une safe zone où on sait que tout est correct, et on n'a pas plein de
  niveaux d'imbrication

- Simplifier les if avec des méthodes. Plutot que faire un if où on teste plein
  de booleans, on les wrappe dans une méthode avec un nom explicite pour
  pouvoir faire un test plus lisible (if (isFieldValid())) est plus lisible. En
  bonus, si on teste toujours !isFieldValid, mieux vaut la modifier pour
  qu'elle devienne isFieldInvalid()

- Spécifique à Angular, mais faire une fonction init() qu'on appelle à la fin.
  Comme ça si on a besoin d'acceder à des variables ou des méthodes du $scope
  lors de l'initialisation on n'est pa sobligé de définir nos méthodes en tete,
  puis faire les actions d'init. ON garde le flow de lecture : d'abord les
  méthodes d'init, puis les définitions. On voit ce que fait le controller dès
  le début.

- Revealer pattern pour les services. On définit des fonctions privates dans le
  corps, qu'on expose ensuite manuellement avec return {}. on peut comme ça les
  appeller de l'une à l'autre sans avoir besoin de faire référence à un
  `internal.` ou `this`. Et on les expose quand même pour les tester.
