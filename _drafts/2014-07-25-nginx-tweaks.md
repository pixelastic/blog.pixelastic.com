---
layout: post
title: "Nginx tweaks"
tags:
---

  # Disable access to server if no hostname if passed
  # Prevents browsing through exposed directories
  server {
      listen      80;
      return      444;
  }


Permet de définir la page d'erreur à afficher, et de spécifier le code
à retourner
si on enleve la partie avec =404 alors il fait une simple redirection
  error_page  404 =404 /404/index.html;

server {
	server_name pixelastic.com.local;
	rewrite ^ $scheme://www.pixelastic.com.local$uri permanent;
}
A mettre sur le domain sans www pour tout renvoyer vers www



