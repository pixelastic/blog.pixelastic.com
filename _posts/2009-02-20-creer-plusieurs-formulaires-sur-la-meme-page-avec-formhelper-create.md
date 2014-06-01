---
layout: post
title: "Créer plusieurs formulaires sur la même page avec FormHelper::create"
custom_v2_id: 11
---

CakePHP permet de créer très facilement des formulaires dont l'action
(add/edit) ainsi que les champs sont remplis automatiquement grâce à
FormHelper::create et FormHelper::end.

Il prends pour cela les variables contenues dans le $data du controller, qui
sont alors passées au $data de la vue.

Si on veut changer le modèle et/ou les valeurs utilisées par le formulaire, il
suffit de faire nos modifications dans le $this->data directement dans la vue
avant d'appeller $form->create()

Par contre, si sur une même page on possède plusieurs formulaires, tous d'un
modele différent, l'astuce ne fonctionne plus. FormHelper s'est initialisé
lors de son premier appel et utilisera le même set de model et valeurs pour
les autres.

Même modifier $this->data avant chaque appel à $form->create() ne changera
rien.

Il faut donc ruser et modifier la variable utilisée par le Helper, c'est à
dire modifier $form->data à partir du second formulaire.

