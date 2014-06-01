---
layout: post
title: "Caracole - Antispam des adresses mails"
custom_v2_id: 16
---

**Attention : Ce post n'est plus d'actualité. Je n'utilise plus du tout cette technique pour masquer les adresses mails car elle bloquait complétement la lisibilité aux personnes sans Javascript. Je n'ai pas encoe trouvé de meilleure alternative pour le moment, néanmoins.**

Pour faire suite au billet précédent, un autre problème que j'ai rencontré
dans le développement des sites était un moyen sûr d'empecher qu'une adresse
mail exposée sur un site ne soit récupérée par des robots crawlers et ne
deviennent la cible de leurs spams.

Je parse donc chaque texte affiché afin de remplacer les adresses mails par
une version cryptée, que Javascript décryptera à l'affichage. A chaque
affichage la clé de cryptage est différente. Bon, l'algorithme de cryptage est
extremement simple, c'est juste une permutation alphabétique, chaque lettre
est remplacée par une autre. Et la clée est indiqué dans l'attribut title de
mon code généré.

Il suffit d'étudier le Javascript pour réussir à comprendre comment décrypter
les mails, mais cela demande que le robot ai intégré mon codage dans ses
paramètres, ce qui n'est à priori pas le cas. Et quand bien même se serait le
cas, je changerai la façon de crypter la clé.

Jetez un oeil au code source de cette page si vous le souhaitez pour voir
comment cette adresse : blabla@somewhere.com est écrite.

Cela devrait être quelque chose de la forme :

    
    <span   
    	title="97tasbw84fv6_q3pn5yirchya15nq.p9b_jziggtc40lfolwxxk@meo26m70zj2d-sur@hev8u1-dk.3"   
    	class="protectFromSpam">  
    	  
    	<span class="noscript">  
    		<span class="icon icon_notice"></span>  
    		Cette adresse mail est protégée contre le spam, vous devez activer Javascript pour pouvoir la voir.  
    	</span>  
    	  
    	<span class="cryptedMail">ageh9gxvw1bag4342e</span>  
    	  
    </span>

Bon alors bien sur, cela nécessite Javascript activé, c'est un gros défaut, je
l'admets. Un message permet de ne pas laisser l'utilisateur sans JS dans
l'incompréhension, mais ça reste problématique malgré tout. Je n'ai pas réussi
à faire mieux pour le moment.

