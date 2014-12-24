---
layout: post
title: "Indexing files downloaded through Transmission in Synology"
tags: synology, transmission
---


Login as root
Edit /etc/crontab
Add 
    0       *       *       *       *       root    /usr/syno/bin/synoindex -A /volume1/video/tmp/transmission/downloads
