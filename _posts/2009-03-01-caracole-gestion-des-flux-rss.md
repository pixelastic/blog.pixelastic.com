---
layout: post
title: "Caracole - Gestion des flux RSS"
custom_v2_id: 17
---

Cela faisait quelques temps que je souhaitais ajouter une gestion des flux RSS
à Caracole. J'ai donc recherché du coté du RssHelper intégré à cakePHP et l'ai
quelque peu modifié pour qu'il s'adapte à mes besoins.

En effet, il manquait selon moi quelques fonctions extremement importantes
pour la génération d'un flux complet, par exemple la possibilité de spécifier
des attributs aux différents noeuds, ou encore de passer le contenu entre
balises <![CDATA[]]>.

Mais surtout la possibilité d'ajouter des noeuds de façons récursive, la
fonction RssHelper::item() ne permettant d'ajouter des noeuds qu'à un seul
niveau.

Bref, j'ai revu tout cela dans ma propre version du Helper, avec une autre
fonction pratique pour ajouter un thumbnail à un post. Pour voir ce que cela
donne, et il vous suffit de vous abonner aux flus disponibles sur les pages du
blog ou sur la page [Réalisations](/realisations/)

J'ai découvert la syntaxe d'un flux RSS il y a seulement quelques jours, et je
n'ai testé le résultat qu'avec Netvibes, je pense donc qu'il me faut me livrer
à quelques tests supplémentaires.

En tout cas, il me suffit maintenant d'ajouter une variable $rssFeed à un
modèle pour qu'un flux RSS lui soit automatiquement généré (on peut préciser
bien sur les informations devant être affichées pour chaque modèle). Voila qui
encore un pas de plus pour Caracole :)

