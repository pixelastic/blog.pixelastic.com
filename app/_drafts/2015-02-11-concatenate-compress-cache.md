---
layout: post
title: "Concaténation, Compression, Cache"
tags: webperf, grunt, gzip, cache, http
---

When trying to optimize the performance of your website, there are three main
elements that you should do first. Three very easy to implement steps that can 
yield a very fast and obvious effect on load time.

These three methods are concatenation, compression and cache. I've already
touched those a bit in a previous talk, but we'll now cover them in full
detail.

## Concatenate

The main goal of concatenation is to merge several files of the same type in
one final file. The final goal is to download less files on the wire. CSS and
Javascript files are the one that can squeez the most out of concatenation.

The nature itself of downloading assets makes your browser pay some costs on
every request. This costs are counted as lost milliseconds. This costs can be
of several sources:

### TCP Slow start

TCP is the underlying protocol used by HTTP. It uses a mechanism known as
slow-start that is used to get the optimal speed at which data can be
transferred accross the wire. To get this result, it muts takes a few round
trips between the client and the server, sending more and more data, until some
is dropped, in order to get the maximum possible sending/receiving throughput.

If we send a lot of small files, the mechanism never has time to achieve the
optimal speed, and must start its round trips again on the next file. By
grouping files together in one bigger file, le cost of calculating the max
speed is only payed once and the remaining of the file can be downloaded at
full speed.

Note that maintaining `Keep-Alive` connections to your server can let you reuse
a previous connection, and thus only pay this cost one. Unfortunatly,
activatuing `Keep-Alive` on an Apache server has a risk of limiting the number
of parallel connection it can maintain.

### SSL

Similarly, the same kind of cost when serving the site using `https`. In order
to asses that both client and server really are who they claim they are, an
exchange of keys is done in the form of a handhsake. Once again, the cost of
the handshake is payed on each downloaded asset. Putting all your files in one
lets you pay the cost only one.

### Parallell connection

Finally, the last limit we're talking about is purely in the client browser.
Each browser keeps track of a max number of parallel connection it can open to
any given server. The HTTP spec officially set this number to 2, but in the
real world browsers usually have a higher value, from 8 to 12.

This means that if you ask your browser to download 5 stylesheets, 5 scripts
and 10 images, the browser will only launch the download of the 12 first
elements. It will start downloading the 13th only when one of the 12th first
will be completly downloaded. Once again, grouping your files together will
allow you to have more open channels to download assets of your webpage.


CSS and Javascript files can be very easily concatenated. You only have to
create one final file that simply contains the content of all your initial
files. Your build process can easily take care of that, but a very simple
solution can be written in a few lines:

```sh
cat ./src/*.css > ./dist/styles.css
cat ./js/*.js > ./dist/scripts.js
```

Please note that merging image files is also possible and is named CSS Spriting
but is out of scope for this article.

## Compression

Now that we've reduce the number of number, the next step will be to make this
files lighter, so they can be downloaded faster.

Fortunatly, there is a magical phrase named Gzip that will reduce the size of
each textual asset by an average of 66%.

The good news is that most of the assets that we use to build a website are
actually made from text. Main bricks like HTML, CSS and JS of course but it
also include output from your API (JSON and XML). A lot of other format are in
fact XML in disguide, like RSS, webfonts or SVG images.

It rare enough to be pointed ou, Gzip is perfectly supported by all major
browsers and servers. Even IE5.5 can understand it. There are absolutly no
reason whatsoever of not using it.

If a browser does suppoer Gzip, it will send an `Accept-Encoding: gzip` header
to the server. If the server find this header in the request, it will compress
the file on the flu before returning it to the client. It will also add the
`Content-Encoding: gzip` header, and the browser will uncompress it on
reception.

The main point here is to have a smaller file moving accross the wire, while in
return both server and client will take some time compressing/decompressing the
data. On any machine build in the last decade, the overhead will be
negligeable. However, having a much smaller file on the wire will give you
tremendous speed improvement.

Gzip compression library are available on all webserver, all you have to do is
enable them. You simply configure which kind of files must be compressed.
You'll find below a few examples on the most common servers:

#### Apache
```apache
<IfModule mod_deflate.c>
  <IfModule mod_filter.c>
    AddOutputFilterByType DEFLATE "application/javascript" "application/json" \
    "text/css" "text/html" "text/xml" [...]
  </IfModule>
</IfModule>
```

#### Lighttpd
```lighttpd
server.modules += ( "mod_compress" )
compress.filetype  = ("application/javascript", "application/json", \
"text/css", "text/html", "text/xml", [...] )
```

#### Nginx
```nginx
gzip on;
gzip_comp_level 6;
gzip_types application/javascript application/json text/css text/html text/xml
[...]; 
```

Enabling Gzip is really easy to set and it greatly improve loading time. You do
not have to change anything on the served files, only configuring the
webserver.

### Minification

If you want to go even farger, you can invest on minifying your assets. Once
again, HTML, CSS and Javascript are the best candidate for minification.

Minification is a process that will rewrite all your assets in a lighter
version, one using less characters, and thus being smaller to download. Mainly,
it will remove comments and new lines, but some specific minification tool can
even transform variable names in your Js to smaller name, group CSS selectors
or remove useless HTML attributes.

Adding a minification tool to your build process is more complex than enabling
Gzip and yields less impressive results. That's why we highly recommend that
you do not try to tackle it until you've enabled Gzip.

## Cache

À présent que nous avons réussi à limiter le nombre de fichiers et à faire
baisser leur poids, la prochaine étape est de les télécharger le moins souvent
possible.

L'idée principale ici est qu'il est inutile de faire télécharger à votre
visiteur un contenu qu'il a déjà téléchargé et possède donc en local sur son
poste.

Nous allons commencer par expliquer comment fonctionne le cache HTTP car c'est
un domaine qui est généralement mal compris des développeurs. Il y a en fait
deux principes fondamentaux à comprendre dans le cache HTTP: la _fraicheur_, et
la _validation_.

### Fraicheur

On peut voir la fraicheur d'un asset comme une date limite de consommation.
Lorsque l'on télécharge un élément depuis le serveur, celui-ci nous l'envoie
accompagné d'un header indiquant jusqu'à quelle date cet élément est encore
frais.

Si jamais le client à besoin à nouveau du même élément, il commence par
vérifier la fraicheur de celui qu'il a en cache. S'il est encore frais, il ne
fait pas de requête au serveur, et utilise directement celui qu'il a sur son
disque. On ne peut pas faire plus rapide, car il n'y a alors absolument aucune
connexion réseau impliquée.

Par contre, si jamais la date de fraicheur est dépassée, alors le navigateur va
lancer une nouvelle requête au serveur pour récupérer la nouvelle version.

En HTTP 1.0, le serveur retourne un header `Expires` avec la date limite de
fraicheur. Par exemple: `Expires: Thu, 04 May 2014 20:00:00 GMT`. Dans cet
exemple, si jamais le navigateur demande à nouveau le même asset avant le 4 Mai
2014 à 20h, alors il le lira depuis son cache, sinon il interrogera le serveur.

Cette notation a un défaut majeur dans le fait que les dates sont fixées de
manière absolue. Cela signifie que le cache de tous les clients perdra sa
fraicheur en même temps. Et vous aurez donc potentiellement tous les clients
qui feront une nouvelle requête vers votre serveur en même temps pour se mettre
à jour, ce qui peut générer un très fort pic de charge à cet instant.

Pour limiter cela et donner plus de flexibilité dans la gestion de la
fraicheur, en HTTP 1.1, un nouveau header à été introduit : `Cache-Control`.
Celui-ci accepte plusieurs arguments qui permettent de gérer plus finement la
manière de mettre en cache, et celui qui nous intéresse ici est `max-age` qui
permet de définir une durée relative de fraicheur, en secondes.

Votre serveur peut donc répondre `Cache-Control: max-age=3600` pour indiquer
que l'asset est encore frais pendant 1h (3600 secondes). En faisant ainsi vous
pouvez espacer les appels sur une plus longue période.

### Validation

La deuxième composante du cache est la _validation_. Imaginons que notre asset
ai terminé sa période de fraicheur, nous allons donc récupérer une nouvelle
version de celui-ci sur le serveur. Mais il est possible que l'asset n'ait pas
réellement changé sur le serveur depuis la dernière fois. Il serait alors
inutile de retélécharger quelque chose que nous avons déjà dans notre cache.

Le principe de validation permet au serveur de gérer cela. Soit l'asset du
client est identique à l'asset du serveur, dans ce cas le client peut garder sa
version locale. Soit les deux sont différents et dans ce cas le client doit
mettre à jour son cache avec la version distante.

Lorsque le client a récupéré l'asset pour la première fois, le serveur lui
a répondu avec un header `Last-Modified`, par exemple `Last-Modified: Mon, 04
May 2014 02:28:12 GMT`. La prochaine fois que le client fera une requête pour
récupérer cet asset, il renverra la date dans son header `If-Modified-Since`,
par exemple `If-Modified-Since: Mon, 04 May 2014 02:28:12 GMT`.

Le serveur compare alors la date envoyée et celle qu'il possède de son coté.
Si les deux correspondent, alors il renverra un `304 Not Modified` pour
indiquer au client que le contenu n'a pas changé. Celui-ci continuera alors
d'utiliser sa version locale. Ainsi, on évite de transmettre du contenu inutile
sur le réseau.

Par contre si le serveur voit que le fichier qu'il possède est plus récent que
la date envoyée, il répondra avec un `200 OK` et le nouveau contenu. Ainsi, le
client utilise désormais la dernière version. 

En faisant ainsi, on évite donc de télécharger un contenu qu'on possède déjà.

Dans les deux cas, le serveur renvoie de nouvelles informations de fraicheur.

Comme pour la fraicheur, il existe deux couples de headers pour communiquer des
informations de validation au serveur. En plus de `Last-Modified`
/ `If-Modified-Since` qui utilisent une date de modification, il est possible
d'utiliser des ETags.

Un ETag est un hash qui identifie de manière unique chaque fichier. Si le
fichier change, alors son ETag change aussi. Par exemple, le serveur retourne
au client lors du premier appel un header `ETag: "3e86-410-3596fbbc"`, et
lorsque le client fait à nouveau appel à la même ressource, il envoie un header
`If-None-Match : "3e86-410-3596fbbc"`. Le serveur va comparer les deux ETags et
retourner un `304 Not Modified` s'ils sont identiques ou un `200 OK` avec le
nouveau contenu s'ils sont différents.

`Last-Modified` et `ETag` possèdent des comportements très similaires, mais
nous vous conseillons d'utiliser `Last-Modified` en priorité.

En effet, la spec HTTP indique que si un serveur retourne un `Last-Modified` et
un `ETag`, alors le navigateur doit prendre en priorité le `Last-Modified`. De
plus, la majorité des serveurs génèrent l'ETag à partir de l'inode du fichier,
de manière à ce que celui-ci soit modifié au moindre changement.

Malheureusement, ceci pose des soucis pour peu que vous ayez des serveurs
redondés derrière un load-balancer où chaque serveur possède son propre
filesystem et donc ses propres inodes. Deux fichiers identiques, sur deux
serveurs différents auront des inodes différents et par conséquent des ETag
différents.  Votre système de validation ne fonctionnera plus dès lors que
votre client sera redirigé vers un autre frontal.

À noter que ce problème n'apparait pas sous nginx, qui ne prends pas en compte
l'inode dans la génération de son ETag. Sous Apache, l'option `FileEtag MTime
Size` permet de le désactiver, ainsi que `etag.use-inode = "disable"` sous
lighttpd.

### Récapitulatif

À la lumière de ces explications, nous pouvons donc retracer le parcours
classique du téléchargement d'un asset mis en cache.

- Le client effectue une première requête pour récupérer un asset. Il récupère
  son `Cache-Control: max-age` pour la fraicheur et son `Last-Modified` pour la
  validation.
- S'il demande à nouveau le même asset alors que celui-ci est encore frais, il
  le prends directement depuis son disque local.
- S'il le demande au dela de sa date de fraicheur, il fait un appel au serveur
  en envoyant son `If-Modified-Since`.
- Si le fichier sur le serveur possède la même date de modification que celle
  envoyée, il retourne un `304 Not Modified`.
- Si le fichier sur le serveur a été modifié, il retourne un `200 OK` avec le
  nouveau contenu.
- Dans tous les cas, le serveur retourne un `Cache-Control` et un
  `Last-Modified`.

### Invalidation du cache

Mais le cache est un animal capricieux, et nous savons tous que :

> Il y a deux choses complexes en informatique : invalider le cache et nommer
> les choses.

Et effectivement, invalider le cache de nos clients quand nous avons besoin de
faire une mise à jour est extrêmement difficile. C'est en fait tellement
difficile que nous n'allons pas le faire du tout.

Comme le navigateur mets en cache chaque URL, si nous souhaitons modifier un
contenu, il nous suffit de modifier son URL. Et les URL, c'est quelque chose
que nous avons en quantité illimité. Il nous suffit de modifier le nom d'un
fichier pour générer un nouvelle URL. On peut ajouter un numero de version,
un timestamp ou un hash à notre nom de fichier original pour lui générer une
nouvelle url. 

Par exemple : `style-c9b5fd6520f5ab77dd823b1b2c81ff9c461b1374.css` au lieu de
`style.css`.

En mettant un cache très long sur ces assets (1 an est le maximum officiel de
la spec), c'est comme si on les gardait en cache indéfiniment. Il nous suffit
juste de mettre un cache plus court sur le fichier qui les référence
(généralement le fichier HTML).

Ainsi, si on pousse en production une modification sur une feuille de style ou
dans un script, il nous suffit de modifier les références à ces fichiers dans
nos sources HTML pour que les clients téléchargent les nouveaux contenus. Le
cache sur les fichiers HTML est beaucoup plus court, de manière à ce que les
changements introduits par notre mise en production soient rapidement
répércutées sur nos clients.

Les anciens contenus seront encore en cache chez nos clients mais cela n'a pas
d'importance, nous ne les requêterons plus jamais et les éléments non-utilisés
du cache des clients se vident régulièrement.

La technique est en fait très proche des `Etag` vus précédement à la différence
qu'ici nous sommes maitres de la génération du nom unique de fichier et du
moment où nous souhaitons invalider le cache de nos clients.

Au final, nous utilisons un mélange de ces deux techniques pour gérer un cache
optimal. 

Les éléments dont l'URL est significative, comme les pages HTML ou les
retours d'une API définiront une fraicheur faible (de quelques minutes
à quelques heures, en fonction de la fréquence moyenne de mise à jour). Ceci
permet de s'assurer que le client aura rapidement la nouvelle version quand
celle-ci est déployée, tout en limitant la charge sur le serveur et la quantité
d'information transitant sur le réseau.

Pour les éléments dont l'URL n'est pas significative, comme les feuilles de
styles, les scripts, les polices de caractère ou les images, on utilisera une
fraicheur maximum d'un an. Ceci permettra au client de garder indéfiniment la
ressource dans son cache sans avoir besoin d'interroger à nouveau le serveur.
On générera par contre une URL différente en fonction d'un hash du contenu
à chaque fois que le contenu vient à changer. On prendra bien garde à modifier
les références à ces fichiers dans les pages HTML.

## Conclusion

Nous avons donc vu comment trois points très simples permettent de diminuer
grandement le nombre de total de fichiers à télécharger, les rendre plus
légers, et les télécharger moins souvent.

La concaténation automatique des fichiers doit être intégrée dans votre
processus de build, afin de garder un environnement de développement clair. La
compression en gzip ne nécessite que quelques modifications sur vos serveurs.
La mise en place d'une stratégie de cache optimale par contre nécessite à la
fois des modifications sur le processus de build et sur la configuration des
serveurs.

Toutes ces modifications sont relativement peu couteuses à mettre en place et
ne dépendent aucunement ni de la technologie utilisée pour le front-end, ni de
celle utilisée pour le back-end. Elles peuvent être mise en place quelle que
soit votre stack technique. Il n'y a donc plus aucune raison pour ne pas les
déployer dès aujourd'hui.

