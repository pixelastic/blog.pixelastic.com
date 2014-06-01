---
layout: post
title: "Polices de caractère !"
custom_v2_id: 20
---

<p>Ah elles en ont du caractère ces polices ! Elle m'en font voir de toutes les couleurs...</p>
<p>Pour l'intégration sur laquelle je travaille, certains titres utilisent une police spéciale, et pour intégrer ça grâce ) @font-face et Cufon, il me faut les fichiers de police sous différents formats.</p>
<p>La graphiste m'a fournie la police, sous format .dfont (package de plusieurs font à la sauce Mac). J'ai pu extraire le package grâce à <a href="http://peter.upfold.org.uk/projects/dfontsplitter">DFontSplitter</a>, ce qui m'a donné plein de polices .ttf.</p>
<p>Corrompues, d'ailleurs, qu'il m'a fallu réparer grâce à <a href="http://www.acutesystems.com/sharecf.htm">CrossFont</a> (attention shareware de 15 jours). Sauf qu'il me convertit les fichiers en .otf.</p>
<p>Pas de soucis pour Firefox, Safari et Opera qui comprennent ce format très bien, mais pour IE, je dois convertir ça en .eot (grâce <a href="http://www.cuvou.com/wizards/ttf2eot.cgi">ce converter en ligne</a>).</p>
<p>Qui ne prends malheureusement que des .ttf comme source... Impossible de trouver un converter otf =&gt; ttf sous windows qui ne demande pas d'installer des tas de choses, je suis donc passé sous mon Ubuntu, ai téléchargé FontForge : Open =&gt; Generate Font =&gt; ttf et voila</p>
<p> </p>
<p>Edit : Et hop, <a href="http://onlinefontconverter.com/">un autre converter</a> en ligne de plus (otf, ttf, dfont)</p>