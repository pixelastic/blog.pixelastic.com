---
layout: post
title: "Caracole - Spam sur les commentaires"
custom_v2_id: 15
tags: cakephp, caracole
---

Les trois derniers sites que j'ai fait avec Caracole avaient tous un
formulaire de contact (nom, mail et texte, pour contacter le propriétaire du
site).

Et tous les trois se sont fait spammer rapidement une fois que le site est
arrivé dans les moteurs de recherche. J'ai donc cherché moyen d'empecher cela,
une façon de detecter les spammeurs.

Alors, il existe bien sur [Akismet](http://akismet.com/), qui marche du
tonnerre, mais qui est payant pour un usage professionnel, j'ai donc d'abord
cherché du coté des solutions gratuites.

Il y a le projet [reCaptcha](http://recaptcha.net/), qui en plus d'empecher le
spam, permet d'aider la numérisation de vieux livres, donc une assez bonne
idée mais qui ne semble pas disponible en français. C'est malheureusement un
impératif sur les sites que je développais.

J'ai donc plutot retourné le problème dans ma tête et cherché un moyen facile
et ingénieux de faire la différence entre un humain et un bot. J'ai finalement
opté pour un champ caché au sein du formulaire qui doit absolument rester
vide. Un bot le remplira automatiquement, un humain le laissera vide.

J'avais tout d'abord mis ce champ en type="hidden" et cela semblait
fonctionner, mais de plus récents spams me l'ont fait passer en  display:none
par CSS et je n'ai pas eu de nouveau spam depuis. Je continuerai de peaufiner
le système jusqu'à ce que je trouve un blocage parfait ou que j'en ai marre et
que je me tourne vers Akismet :)

Pour le moment, je loggue toutes les demandes de contact avec les informations
du Header, afin d'identifier certains patterns qui pourraient me permettre de
trouver plus facilement les spammeurs dans le lot.