---
layout: post
title: "Angular form input redundancy"
tags: angular, html
---

Pas de Convention over configuration. Markup HTML redondant. On fait plein de
forms en Angular, c'est bon pour ça, mais le markup est redondant, error-prone
pour le copié collé. Moyen d'améliorer ça ?

```html
<input type="text" name="firstName" id="firstName" ng-model="firstName">
```

`name` parce qu'un formulaire html a besoin d'un name pour pouvoir le passer
quand on soumet le formulaire. Oui mais je fais de l'angular alors tout ça
c'est super ajaxy-spa-truc. Oui mais quand même besoin pour que angular sache
mettre des états dirty/pristine/valid/invalid sur les éléments. Il a même
besoin qu'on mette un name sur le form parent sinon il est perdu. pire que ça,
il faut même que les name ne comportent pas de `-` sinon il est complétement
perdu.

id, parce que c'est comme ça que fonctionne le HTML et l'attribut for des
label, à utiliser pour l'accesisbilité. Sur les checkbox et les radio je peux
me permettre de ne pas en mettre car il wrappe le tout, mais sur les autres je
dois le répeter. En plus, je dois faire attention à ce qu'il n'y ai pas deux
fois le même dans ma page. Pas évident quand j'ai des formulaires générés à al
volé avec des ng-repeat ou autre.

ng-model pour faire du two-waybings. Plus généralement je fais du
ng-model="inputs.firstName" pour avoir la totalité de mon form dans un objet et
pas plein de variables qui se baladent dans mon scope. Certains me disent que
je peux l'oublier si je donne déjà un nom à mon formulaire, j'ai alors accès
à cette variable dans mon scope qui contient tout l'état du formulaire, avec
les états invalides, la valeur affichées, la valeur sauvegardée, etc. Sauf que
ça me semble toucher trop profondément à la plomberie interne d'Angular et me
semble trop fragile.



