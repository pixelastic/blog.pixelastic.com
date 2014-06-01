---
layout: post
title: "Caracole - Spam sur les commentaires"
custom_v2_id: 15
---

<p>Les trois derniers sites que j'ai fait avec Caracole avaient tous un formulaire de contact (nom, mail et texte, pour contacter le propriétaire du site).</p>
<p>Et tous les trois se sont fait spammer rapidement une fois que le site est arrivé dans les moteurs de recherche. J'ai donc cherché moyen d'empecher cela, une façon de detecter les spammeurs.</p>
<p>Alors, il existe bien sur <a href="http://akismet.com/" target="_blank" title="Akismet">Akismet</a>, qui marche du tonnerre, mais qui est payant pour un usage professionnel, j'ai donc d'abord cherché du coté des solutions gratuites.</p>
<p>Il y a le projet <a href="http://recaptcha.net/" target="_blank" title="reCaptcha">reCaptcha</a>, qui en plus d'empecher le spam, permet d'aider la numérisation de vieux livres, donc une assez bonne idée mais qui ne semble pas disponible en français. C'est malheureusement un impératif sur les sites que je développais.</p>
<p>J'ai donc plutot retourné le problème dans ma tête et cherché un moyen facile et ingénieux de faire la différence entre un humain et un bot. J'ai finalement opté pour un champ caché au sein du formulaire qui doit absolument rester vide. Un bot le remplira automatiquement, un humain le laissera vide.</p>
<p>J'avais tout d'abord mis ce champ en type="hidden" et cela semblait fonctionner, mais de plus récents spams me l'ont fait passer en  display:none par CSS et je n'ai pas eu de nouveau spam depuis. Je continuerai de peaufiner le système jusqu'à ce que je trouve un blocage parfait ou que j'en ai marre et que je me tourne vers Akismet :)</p>
<p>Pour le moment, je loggue toutes les demandes de contact avec les informations du Header, afin d'identifier certains patterns qui pourraient me permettre de trouver plus facilement les spammeurs dans le lot.</p>