---
layout: post
title: "Ergonomie Fail : Gérer son nom de domaine chez Orange Business Service"
custom_v2_id: 39
---

<p>Et c'est reparti pour un tour. Cette fois, j'ai besoin de modifier certains paramètres techniques d'un nom de domaine enregistré chez Oléane (devenu Orange Business Services).</p>
<p>J'avais déjà eu affaire à eux dans le passé et pour modifier les adresses DNS du serveur j'avais du leur envoyer un fax (<em>Un fax, non mais des fois, faut vraiment qu'ils aillent mal</em>)</p>
<p>Bref, aujourd'hui je dois y retourner et je me souviens pourquoi j'avais un mauvais souvenir de <a href="https://clients.fr.oleane.com/" title="Orange Business Service">leur interface</a>.</p>
<p>Déjà, on m'accueille avec un message que je ne pensais plus revoir sur le net depuis 10 ans :</p>
<p style="text-align: center;"><img src="/files/2010/02/08/4b701a583f287.jpg" alt="Oleane : optimisation" width="483" height="125" /></p>
<p>Il y a une checkbox sur le formulaire de login, avec la mention "mémoriser ce compte" mais bien sur, pas de &lt;label&gt; sur le texte, je dois donc cliquer sur la checkbox plutot que sur le texte pour la cocher. C'est bête, c'est pas grand chose, mais ça change quand même la vie.</p>
<p style="text-align: center;"><img src="/files/2010/02/08/4b701b18dc11c.jpg" alt="Oleane : label" width="687" height="83" /></p>
<p>Je valide quand même et là ça s'enchaine, la connection (en https://) n'est pas sécurisé selon Firefox... Ca donne drolement confiance en leur service ça...</p>
<p style="text-align: center;"><img src="/files/2010/02/08/4b701b6d2a6d2.jpg" alt="Oleane : unsecure connection" width="508" height="109" /></p>
<p>Ok, c'est bien parce que je sais qu'ils sont plus incompétents que méchants que je passe quand même.</p>
<p>Et là, deuxième horreur que je ne pensais pas revoir sur le net d'aujourd'hui... Des gifs animés clignotants. Argh mes yeux... Mon dieu... <img src="/files/2010/02/08/4b701bf7b501e.gif" alt="Oleane : gif" width="14" height="14" /><img src="/files/2010/02/08/4b701bf7b501e.gif" alt="Oleane : gif" width="14" height="14" /><img src="/files/2010/02/08/4b701bf7b501e.gif" alt="Oleane : gif" width="14" height="14" /></p>
<p>Bon, j'arrive quand même sur l'interface. J'y allais à la base pour y retrouver la configuration du domaine pour recréer la même une fois que je l'aurai transféré. Il me fallait aussi la liste des mails, vu que je vais changer de serveur mail, je vais devoir recréer la liste.</p>
<p>Heureusement, je trouve assez facilement, et ils ont une interface plutot réussi cette fois-ci. Présentée comme un carnet d'adresse où je peux voir toutes les adresses mails créés et les redirections actives. Cool.</p>
<p>Il y a même un bouton "Import export". J'imagine que c'est pour exporter ou importer des listes de contacts (en *.csv ou autre) et n'a rien à voir avec du commerce étranger, je clique donc dessus et ...</p>
<p style="text-align: center;"><img src="/files/2010/02/08/4b701cfa21124.jpg" alt="Oleane : erreur export" width="562" height="123" /></p>
<p>Ah, hmm ok. Au temps pour moi, je suis bon pour le faire à la main à ce que je vois...</p>
<p>Il y a une fonction "Imprimer", je vais quand même essayer cela. Ah cool, ça marche, ça me donne une liste de tous les users avec leurs mails, de façon claire et lisible. Parfait.</p>
<p>Je cherche un peu pour trouver les options d'administration DNS du domaine, mais rien. Apparamment, je ne peux que éditer ce qui a trait à la messagerie, je parie que pour les DNS je vais encore devoir envoyer en fax.</p>
<p>Tant pis, de toutes façons, le nom de domaine a été migré chez Gandi, tout sera bien plus simple là bas.</p>