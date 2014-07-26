---
layout: post
title: "Finding a string in multiple files"
custom_v2_id: 233

---

Lately I was receiving emails with just the text "Blablabla" from an old
(online) production server. This was obviously from an old debug script that I
should have put online and forgot.



Unfortunatly, I wasn't able to track down exactly from where it originated. I
had no mention of that string in my local files.

So I connected to the serveur using ssh and ran the following command : grep
-R Blablabla /path

After some processing, I got the incriminating file and was able to delete it.
