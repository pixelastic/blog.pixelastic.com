---
layout: post
title: "Reading my own code from 3 years ago"
custom_v2_id: 45
---

Today I had to update an old site I developped some years ago. I had to move
it from one host to another and make sure all the configuration followed.

It scares me. What I wrote 3 years ago scares me. My code was... well there
was some huge mistakes, things I would never ever do again. Today, I would
severly frown upon any coder who wrote horribles things like that.

For the php part, here is a very good list of what NOT to do :

  * I used shorthand notation for my php tags : <? instead of <?php.
  * My server was set as register_global off, but I was circumventing it by doing my own register_global on :  

    
    extract($_SERVER);  
    extract($_COOKIE);  
    extract($_GET);  
    extract($_POST);

  * My files were encoded in Latin-1, my database was in latin1_swedish_ci and my html head was set to iso-8859-1. At least, that was consistent.
  * I wasn't EVER testing if my variables were set, so I had notices popping everywhere. I had the error_reporting set to disable them, hiding the error instead of writing better code.
  * The password of my users were stored UNCRYPTED in the database... And stored uncrypted in the cookie as well.
  * I was doing something that was supposed to be OOP, but I never used heritage, so all my classes were containing the same methods, copied and pasted from one file to another, and changing only some variable names...

And some other mistakes :

  * I included a whole bunch of Javascript files (like 15 or so) and was NOT using any js framework. Well, technically I was using a js framework, but one I developped. And let be honest, I can't really call it a framework today.
  * I used letter-spacing:-1000em to hide text (when using an image as a header for example). It broke on Firefox, I'm now using text-indent:-1000em; (really, I don't know if this is better).
  * There was a flash animation with sound, enabled by default and with auto-play. For my defense, I remember having told by ex boss that it was a bad idea but he insisted.

To be honest a part of me is horrified of what I wrote some years ago and
thought was great. On the other hand, I'm quite proud of the progress I have
made in so little time.

