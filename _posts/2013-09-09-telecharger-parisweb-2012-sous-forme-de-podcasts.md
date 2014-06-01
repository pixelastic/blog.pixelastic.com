---
layout: post
title: "Télécharger ParisWeb 2012 sous forme de podcasts"
custom_v2_id: 354
---

<p><em>Note for my English readers : In this post in French, I'm talking about how to download the audio version of the ParisWeb 2012 talks. As those talks are mostly in French, it wouldn't make much sense for me to write about it in English.</em></p>
<p>J'ai raté ParisWeb 2012, mais comme je n'ai pas envie de complétement rater tout ce qui a pu s'y être dit, j'ai décidé de télécharger l'ensemble des vidéos des conférences, les convertir en audio et les écouter sous forme de podcast sur mon lecteur mp3.</p>
<p>Heureusement, les gens de ParisWeb ont déjà fait 90% du travail en proposant sur le site officiel des liens vers l'ensemble des conférences en vidéo sur Dailymotion. Après, je n'ai eu qu'à scripter rapidement un crawler qui télécharge et convertit tout cela automatiquement.</p>
<p>Vous pouvez trouver le code sur <a href="https://gist.github.com/pixelastic/6494754">ce gist</a>.</p>
<p>TODO: Actuellement je télécharge la totalité de la vidéo (pouvant atteindre plusieurs Go) pour n'en extraire qu'un fichier audio de quelques dizaines de Mo. De plus, l'audio ne semble pas correctement reconnaitre le stéréo.</p>