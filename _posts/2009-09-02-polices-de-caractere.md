---
layout: post
title: "Polices de caractère !"
custom_v2_id: 20
---

Ah elles en ont du caractère ces polices ! Elle m'en font voir de toutes les
couleurs...

Pour l'intégration sur laquelle je travaille, certains titres utilisent une
police spéciale, et pour intégrer ça grâce ) @font-face et Cufon, il me faut
les fichiers de police sous différents formats.

La graphiste m'a fournie la police, sous format .dfont (package de plusieurs
font à la sauce Mac). J'ai pu extraire le package grâce à
[DFontSplitter](http://peter.upfold.org.uk/projects/dfontsplitter), ce qui m'a
donné plein de polices .ttf.

Corrompues, d'ailleurs, qu'il m'a fallu réparer grâce à
[CrossFont](http://www.acutesystems.com/sharecf.htm) (attention shareware de
15 jours). Sauf qu'il me convertit les fichiers en .otf.

Pas de soucis pour Firefox, Safari et Opera qui comprennent ce format très
bien, mais pour IE, je dois convertir ça en .eot (grâce [ce converter en
ligne](http://www.cuvou.com/wizards/ttf2eot.cgi)).

Qui ne prends malheureusement que des .ttf comme source... Impossible de
trouver un converter otf => ttf sous windows qui ne demande pas d'installer
des tas de choses, je suis donc passé sous mon Ubuntu, ai téléchargé FontForge
: Open => Generate Font => ttf et voila


Edit : Et hop, [un autre converter](http://onlinefontconverter.com/) en ligne
de plus (otf, ttf, dfont)

