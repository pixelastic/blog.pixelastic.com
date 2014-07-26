---
layout: post
title: "Ergonomie Fail : Commander en ligne chez But"
custom_v2_id: 38
tags: fail, ergonomie, but
---

Le week-end dernier j'ai vu un joli petit bureau dans un magasin But. Je
n'étais pas sur des dimensions chez moi et je ne l'ai donc pas acheté sur
place en me disant que je pourrai le commander sur Internet plus tard si
j'avais effectivement la place de le mettre chez moi.

De retour chez moi et une fois les mesures prises, c'est bon, le bureau tiens
parfaitement, je vais donc sur le [site de But](http://www.but.fr/) pour le
commander. Je [le trouve facilement](http://www.but.fr/produits/26418/Bureau-
droit-CYCLO-1113-Blanc.html), je l'ajoute à mon panier, je valide mon panier
et là, la galère commence.

But me demande d'indiquer mon code postal pour voir le magasin le plus proche
pour me livrer. Pas de problème. Je termine ma commande (en acceptant les CGV)
et là il me demande mon login/pass ou de me créer un compte si je n'en ai pas.

Va pour la seconde solution. Nom, prénom, etc... Ca commence à se gater pour
le code postal et la ville. Il y a un auto-complete sur le code postal censé
remplir automatiquement la ville mais il n'est pas complétement au point, j'ai
du recommencer 2 fois. Bref, ça fini par passer.

Je mets mon mail, mon mot de passe, décoche les newsletters et c'est parti.

Ok... J'arrive à nouveau sur la même page, avec mon formulaire tout vidé et
aucun message de feedback... Ah, je remarque quand même un "Bonjour M Timothée
Carry" en haut de la page, il semblerait que j'ai quand même été enregistré.

Je remarque aussi un lien "Mon espace client" en haut, si je suis identifié,
je devrait y trouver moyen de terminer ma commande.

Ah, non. Ca me renvoie sur la même page d'authentification/inscription. Bon,
si ca se trouve je suis inscrit, je vais tenter de me logguer avec le
mail/pass que j'ai indiqué.

Ah cool, ça marche... Bon heureusement que j'ai essayé mais rien que cela, ça
aurait débouté plus d'un client potentiel.

Bon, j'arrive donc sur le deuxieme étape de ma commande, celle où je dois
indiquer mes coordonées de livraison. Ce ne sont pas les même que l'adresse
indiquée pour mon compte, je veux le faire livrer chez quelqu'un d'autre, on
va l'appeller Mlle Anne Onyme. Heureusement il y a deux liens "Modifier mes
informations" et "Modifier mon adresse". Je vais essayer le premier.

Ca m'ouvre une lightbox avec un petit formulaire où je peux changer mon nom,
prénom et téléphone. Hmm... C'est pas très clair si ca va changer les infos de
mon compte ou celles de cette commande...

En plus, les champs Téléphone et N° de carte But sont pre-rempli par ce qui
semble etre un caractère ASCII nul (0000). Pas très pro ça.

![But : Changer infos personnelles](/files/2010/02/07/4b6ec6be99207.jpg)

Bon, je change le nom et prénom pour mettre ceux de la personne à qui je veux
l'envoyer et je valide.

Oups... erreur. Il semblerait que les numeros de téléphone ne soient pas
valides... Bizarre, je n'avais pas mis de numero lors de mon inscription et il
n'avait pas crié au scandale pour autant.

![But Changer infos personnelles](/files/2010/02/07/4b6ec751d2296.jpg)

Bon, je vais jouer le jeu et mettre un numero de tel, mais je ne sais pas
lequel mettre. Le mien ou celui de la personne à qui je fais livrer. Je veux
livrer cela comme un cadeau, donc je ne veux pas qu'ils l'appellent avant pour
mettre au point les détails de la livraison, je devrai donc mettre le mien
comme numero. Pas très clair cette histoire, ils devraient indiquer à qui sert
ce numero.

Bon, j'indique mon numero de portable et je valide. Aucune réaction. Je valide
à nouveau : rien. Je lance Firebug et regarde les requetes AJAX. Ah, ils
envoient un check au serveur pour valider et apparemment j'ai toujours des
erreurs. Ergonomie fail une fois de plus. Ils auraient du mettre un petit
loading le temps qu'ils fassent cette requete parce que à j'ai une erreur,
mais j'ai l'impression que rien n'a changé.

![But : Validation firebug](/files/2010/02/07/4b6ec816eb6b0.jpg)

Bon, j'imagine que c'est parce que j'ai des champs ASCII nuls qu'il déconne.
J'ai la chance d'etre sous Firefox et que ces champs ASCII soient symbolisés,
j'imagine qu'un internaute sous IE n'aurait rien compris du tout.

Je revalide... Rhooo. Encore une erreur ! J'ai indiqué mon numero de téléphone
en séparant chaque groupe de deux chiffres(06 12 34 56 78) et ça passe pas sa
validation... Ca c'est clairement le genre de check coté serveur qui peut être
fait en une ligne de code, supprimer les espaces, et valider le nouveau numero
de téléphone. Ca devrait etre au serveur de faire ce travail, pas au client
d'entrer son numero de téléphone de facon formattée (ou alors, que AU MOINS,
on m'indique le format attendu).

Bref, je ré-ecrit mon téléphone de façon agglutinée (0612345678) (tout en me
disant que cette validation exclut le format international (+33)6xxxx )

Ahhhh, cette fois, ça passe. C'est bon, mes infos personnelles sont modifiées.
Uhh... Je remarque alors une chose étrange. Le message de bienvenue est devenu
"Bonjour Mlle Anne Onyme"... Cela veut dire que j'ai changé les infos de mon
compte plutot que celle de l'adresse de livraison ? _Quoi la baise?!!? _comme
on dit.

(Juste par acquis de conscience, j'ai voulu ré-editer mes infos personnelles
aussitot, et comme je m'y attendais, la pop-up contenait encore mes anciennes
infos... Enfin bon)

Bref, bon, je suis plus à ça près. Je continue et modifie mon adresse.

Même chose que tout à l'heure, les champs vides sont remplis par un code ASCII
nul... Je suis sur que ca va faire bugguer leur validation, donc je les vide
réellement et je mets l'adresse de livraison.

Ah ! Cette fois-ci j'ai droit à un joli loading en gif le temps qu'il fasse sa
validation. Cool. On dirait qu'ils m'ont entendu. Je ne comprends pas trop
pourquoi il est présent sur l'une des lightbox et pas sur l'autre mais
passons. Peut-être que je ne l'avais pas vu la première fois ?

Allez, je suis maso, je vais retourner voir la première lightbox pour vérifier
si elle ne m'a pas échappée.

Mais argh ! Le récapitulatif de mon adresse a un problème d'encodage... Ma
jolie adresse de "10 rue des la crèpe au sucre" est devenue "10 rue de la
crÃ¨pe au sucre".

![But : Adresse utf8](/files/2010/02/07/4b6ec6ad83d2e.jpg)

Petit coup d'oeil aux headers HTTP et à la source pour voir l'encoding
spécifié. C'est en iso-8859-1 dans les deux. Au moins ils sont constants, mais
ils doivent avoir un problème d'utf8 autre part sur leurs scripts serveurs.

![But : Headers HTTp](/files/2010/02/07/4b6ec6e42c54a.jpg)

![But : Source html](/files/2010/02/07/4b6ec6fd7a309.jpg)

_Au passage on remarque dans les headers un X-Cnection: close assez suspect,
il faudra que je me renseigne là dessus._

Bon, bref, un probleme d'encodage, c'est assez commun. Je voulais re-modifier
mes coordonnées pour vérifier la présence du loading. Je ré-ouvre donc la
lightbox. Les champs vides sont encore redevenus des ASCII nul et me font
encore casser la validation. Bref, je revalide et non vraiment, il n'y a pas
de loading, j'avais bien vu...

Je retourner éditer mon adresse, je veux vérifier les headers retournés par
AJAX, si ça se trouve le problème d'encoding vient de là.

Hmm. Leur façon de faire de l'ajax est pour le moins... spéciale. Une fois que
la validation (en AJAX) a fonctionnée, ils reloadent la page html
complétement... Ca sent vraiment l'AJAX rajouté en dernière minute parce que
c'est _hype_, mais sans trop comprendre à quoi ça sert...

Donc, groumpf, je re-recommence, en activant le mode "Persist" de Firebug pour
pouvoir traquer les connections même après le reload. Bon, il s'avère que la
réponse du serveur n'a pas de charset spécifié dans ses headers, mais comme
tout le page est reloadée je ne peux pas dire d'où vient le soucis. Peut-être
l'adresse est-elle mal enregistrée dans la base de donnée tout simplement.

Bon, et je me suis arreté là et ai choisi d'aller acheter mon meuble
directement dans un magasin car clairement leur site n'a fait l'objet d'aucune
étude ergonomique.