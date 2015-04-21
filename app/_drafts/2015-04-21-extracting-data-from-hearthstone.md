---
layout: post
title: "Extracting data from HearthStone"
tags: hearthstone
---

Je jouais à wow il y a 10 ans. Exploration, Model Changing, regarder les
fichiers du jeu.

Eu envie de faire de même avec HS. Seulement sous Android, mais choppé fichiers
installés sur OSX. Décompression.

Fichiers .mpq à extraire avec MPQExtractor, mais pas utile, déjà pas mal
extrait dans ./Data

Disunity pour extraire le contenu. 

convert pour transformer les dds en png. besoin de rotate 180 et flip
horizontal (flop)

On trouve les cartes dans un fichier txt qui est du xml. Liste d'entities avec
des tag dedans, chaque tag à un enumID. On croisant avec les anciennes
versions, on retrouver à quoi correspondent les tags, on créé une liste finale.

liste des images, mais pas trouvé comment lier les images aux cartes.


Lier CardID avec Voice, avec Avatar.
Trouver l'overlay de la carte (type normal, mage, sort, elite).
Faire la surimpression.

Animation de selection ? Vert/jaune/rouge ?

