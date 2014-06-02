---
layout: post
title: "Validation et génération de numero de SIRET"
custom_v2_id: 13
---

Pour le projet sur lequel je travaille actuellement, je dois tester la
validatée d'un numero de SIRET. D'après [Wikipédia](http://fr.wikipedia.org/wi
ki/Syst%C3%A8me_d%E2%80%99identification_du_r%C3%A9pertoire_des_%C3%A9tablisse
ments) les numéros de SIRET possèdent une clé finale permettant de vérifier
qu'ils soient biens formés.

J'ai donc retranscris ce calcul sous une règle de validation pour cakePHP, le
voici :


```php
function validateSiret($data, $field) {
  $siret = r(' ', '', $data[$field]);
  $sum = 0;
  for($i=0;$i!=14;$i++) {
    $tmp = ((($i+1)%2)+1) * intval($siret[$i]);
    if ($tmp>=10) $tmp-=9;
    $sum+=$tmp;
  }
  return ($sum%10===0);
}
```

Tout d'abord, je m'assure que le siret ne contienne pas d'espace. Puis je
passe nombre après nombre pour calculer la somme (je multiplie par deux les
nombres d'index pair et par un ceux d'index impair). Si le résultat est
supérieur à 10, j'additionne chaque chiffre entre eux (ce qui équivant à
soustraire 9).

Si le résultat final est congru à 10, alors le numero de SIRET est valide.

Il ne reste plus qu'à l'ajouter à mes régles de validation :


```php
var $validate = array(
  'siret' => array(
    'rule' => array('validateSiret', 'siret'),
    'message' => "Le numero de SIRET indiqué n'est pas valide."
  )
);
```

Mais ce n'est pas tout. Comme pour mes tests je crée à la volée des dizaines
d'enregistrements, j'avais besoin d'un générateur automatique de numero de
SIRET valides. Voici ce que j'ai fini par écrire :


```php
public function siret() {
  //On génère le début du numero de siret
  $siret = '';
  $sum = 0;
  for($i=0;$i!=8;$i++) {
    $rand = mt_rand(0,9);
    $siret.=$rand;
    //On ajoute une fois le résultat si index impair, deux fois sinon
    $tmp = $rand * (1+($i+1)%2);
    if ($tmp>=10) $tmp-=9;
    $sum+=$tmp;
  }
  //On ajoute 4 zeros
  $siret.="0000";
  //On regarde combien il me manque pour etre congru à 10
  $diff = 10-($sum%10);
  if ($diff>2) {
    $first = floor($diff/3);
    $second = $diff-(2*$first);
    $siret.=$first.$second;
  } else {
    $siret.='0'.$diff;
  }

  return preg_replace("/([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{5})/", "$1 $2 $3 $4", $siret);
 }
```


Le principe consiste à générer les 8 premiers nombres de façon complétement
aléatoire et d'en calculer la "somme" (selon le principe évoqué au dessus).
Puis on ajoute des zero pour combler l'espace jusqu'à ajouter la clé de
vérification.

Bien sur, la clé on va la créer pour que la somme de (2 x le premier chiffre)
+ (1 x le second) soit égal à ce qu'il nous manque pour être congru à 10.

Et on fini par retourner le numero de façon lisible, par exemple : 774 082 010
00034.

J'ai fait une petite recherche sur [societe.com](http://www.societe.com/),
aucun de mes numeros générés ne semble donner de résultat, malgré tout ils
sont syntaxiquement valides.

