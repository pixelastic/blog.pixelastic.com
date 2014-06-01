---
layout: post
title: "Using fonts hosted on a subdomain with @font-face and Firefox"
custom_v2_id: 237
---

<p>As a security reason, Firefox do not allow an <code>@font-face</code> rule to load fonts hosted on a different domain (even a subdomain).</p>
<p>I don't exactly understand why, I guess it has something to do with preventing crosslinking and copyright violation. I think we should keep the website author handle all this stuff and not required the browser to make assumptions like that.</p>
<p>Anyway, I recently tried to move my CSS file to a subdomain, to reduce pages loading times. Doing so I saw that my fonts did not correctly load on Firefox.</p>
<p>After some digging, I found that I had to manually allow them to be linked from an other domain, server-side. Here is the little snippet I added to my <code>.htaccess</code></p>
<pre><code lang="apache">&lt;FilesMatch "\.(ttf|otf|woff)$"&gt;<br />	&lt;IfModule mod_headers.c&gt;<br />		Header set Access-Control-Allow-Origin "*"<br />	&lt;/IfModule&gt;<br />&lt;/FilesMatch&gt;</code></pre>
<p> </p>