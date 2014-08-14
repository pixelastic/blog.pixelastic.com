---
layout: post
title: "Getting up to date on CSS"
tags: css
---

Fait du web depuis longtemps. Débuté en 1998. Fait du CSS depuis 2006. Pause en
2012 pour faire que du back-end. Pause en 2013 pour année à l'étranger. Retour
2014, je m'y remets. 

Plein de choses ont changé. Quand j'ai arreté, on devait encore supporter IE6.
IE7 était un pas dans la bonne direction, IE8 nous faisait rêver. Mais on
devait encore supporter IE6.
:hover que sur des liens, pas de min-width/max-width, hack à base de zoom:1,
display:inline sur des floats.
Petits noms aux bugs (double-margin, guillotine, double letter)

Webfonts commencaient à être supportées, mais support étrange. Seulement pour
les titres. HTML5/CSS3, doux rêve. On testait des trucs, mais juste pour le
fun, pour des démos, ça pouvait pas partir en prod.

Aujourd'hui je m'y remets, et je m'éclate. Sass (ders variables dans mon CSS
!). Mais faut que je me mette au RWD. Plein de nouveaux trucs : rem,
breakpoints.

Récap de ce que j'apprends :

### @media
@media (max-width) : si le viewport fait moins que la valeur
@media (min-width) : si le viewport fait au moins la valeur
max-width si on fait du desktop first, et qu'on adapte pour petits screens
min-width si on fait du mobile first et qu'on adapte pour grand écrans

### Font-size

Font-size plus grande plus l'écran est petit. Font-size de 16px par défaut.

### BEM

### rem, em
