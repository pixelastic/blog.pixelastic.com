---
layout: post
title: "Malformed POST request made to an absolute url with Flash"
custom_v2_id: 262
tags: swf, post, actionscript, bug, flash
---

Sometimes you encounter bugs that smacks you in the face with their
strangeness. And even when you defeated them you still have this sour taste of
puzzlement.

I encountered one of them today.

While testing in a local environment and doing POST requests from Flash to a
distant cake app, I could get the request just fine.

But when uploading the SWF on the server and embedding it in a Facebook App
Iframe, the POST data seemed corrupted and I couldn't get it.

Replacing the distant POST call to a local one (removing the whole `http://`
part) fixed this strange bug.

So we ended by adding a check to see if we were online or local and make an
absolute or relative call depending on the environment.

So far, no more issues.