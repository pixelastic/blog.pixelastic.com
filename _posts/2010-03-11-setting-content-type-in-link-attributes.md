---
layout: post
title: "Setting content-type in link attributes"
custom_v2_id: 56
---

Reading a [comment on
AlsacrĂŠations](http://forum.alsacreations.com/topic-9-47144-3-Debat--URL-
Rewriting-avec-ou-sans-ID-.html#p332138), I've discovered that there is a
[type attribute](http://www.w3.org/TR/html401/struct/links.html#adef-type-A)
defined in the link section of the HTML 4.01 spec.

In a nutshell, it's an optional attribute that one can add to a <a> tag to
tell the browser the content type it is supposed to receive if following the
link.

Unfortunatly, no browser seems to be using it, but I added this support to
Caracole anyway.

