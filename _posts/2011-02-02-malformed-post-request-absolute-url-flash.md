---
layout: post
title: "Malformed POST request made to an absolute url with Flash"
custom_v2_id: 262
---

<p>Sometimes you encounter bugs that smacks you in the face with their strangeness. And even when you defeated them you still have this sour taste of puzzlement.</p><p>I encountered one of them today. </p><p>While testing in a local environment and doing POST requests from Flash to a distant cake app, I could get the request just fine.</p><p>But when uploading the SWF on the server and embedding it in a Facebook App Iframe, the POST data seemed corrupted and I couldn't get it.</p><p>Replacing the distant POST call to a local one (removing the whole <code>http://</code> part) fixed this strange bug.</p><p>So we ended by adding a check to see if we were online or local and make an absolute or relative call depending on the environment.</p><p>So far, no more issues.<br></p>