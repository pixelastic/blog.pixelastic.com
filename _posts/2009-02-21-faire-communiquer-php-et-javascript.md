---
layout: post
title: "Faire communiquer PHP et Javascript"
custom_v2_id: 12
---

<p>Pour un projet sur lequel je suis en ce moment, je dois faire une interface d'administration assez complexe, le tout en AJAX.</p>
<p>Je dois manipuler des données sorties de ma base de donnée, venant de trois modèles différents, mais liés les uns avec les autres. Autant dire que j'ai de gros tableaux imbriqués de données. La page travaille vraiment beaucoup et manipule ces données constamment.</p>
<p>Pour éviter d'avoir à faire une requete sur ma base à chaque fois que j'ai besoin d'une information, j'ai décidé de tout charger une première fois au chargement de la page, puis de modifier coté client les variables sur lesquelles je travaille, pour ne faire des requetes au serveur qu'en upload (update/add) et ainsi éviter au maximum les requetes en download inutiles.</p>
<p>Pour ça, j'utilise tout d'abord le base64 de php pour passer des objets complexes (au format JSON) à mes scripts. <a href="http://www.semnanweb.com/jquery-plugin/base64.html" target="_blank" title="jQuery BASE64 functions">Muhammad Hussein Fattahizadeh</a> a pour cela mis à disposition une retranscription de l'encodage/decodage en base64 pour jQuery.</p>
<p>Je peux stocker ainsi mes objets de façon "dormante" dans ma page, et les décoder pour récupérer/modifier les valeurs dont j'ai besoin avant de les réencoder et de les re-ranger dans mon DOM. L'avantage de stocker ces informations en base64 c'est que je ne risque pas de causer d'erreur de syntaxe, de balise non fermée, de caractère interdit, même si je manipule des objets contenant du code HTML et que j'ai besoin de le stocker dans mon propre DOM.</p>
<p>J'utilise aussi à coté de ça le <a href="http://json.org/json2.js" target="_blank" title="parseur JSON">parseur officiel JSON</a> pour parser mes éléments JSON. Il ne me reste plus qu'à passer mon élément JSON en paramètre aux fonction AJAX de jQuery pour mettre à jour mes données.</p>