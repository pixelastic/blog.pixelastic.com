---
layout: post
title: "Adding Grunt to Jekyll"
tags: jekyll, grunt
---

Ajouté workflow grunt de minification sur appli jekyll.
Utilisé grunt-jekyll, tout passe par jekyll.

usemin peut pas fonctionner sur plein de fichiers qui ont les mêmes blocs, dont
on applique sur le layout avant
usemin modifie aussi les fichiers sur lesquels il s'applique, donc copie 
jekyll vide son dossier dest avant d'effectuer son travail

On copie le dossier Jekyll dans un temporaire (sauf css)
On y applique useminPrepare pour avoir les confis
On lance Jenkins (avec config simple si on veut aller plus vite)
On copy/minifie les css vers la destination
On applique usemin pour changer les liens vers assets + minification de html
