---
layout: post
title: "Pushing to prod and Github"
tags: git, github
---

Avec un git push dans mon directory, ça envoie sur mon serveur, sur un repo
bare qui écoute sur un hook. Dans ce hook, il va dans un repo dist et pull
depuis ce repo bare pour mettre à jour. Ce repo dist est exposé par nginx.
Ensuite, il fait un git push pour pousser sur Github.
