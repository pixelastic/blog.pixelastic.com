---
layout: post
title: "Using fonts hosted on a subdomain with @font-face and Firefox"
custom_v2_id: 237
---

As a security reason, Firefox do not allow an `@font-face` rule to load fonts
hosted on a different domain (even a subdomain).

I don't exactly understand why, I guess it has something to do with preventing
crosslinking and copyright violation. I think we should keep the website
author handle all this stuff and not required the browser to make assumptions
like that.

Anyway, I recently tried to move my CSS file to a subdomain, to reduce pages
loading times. Doing so I saw that my fonts did not correctly load on Firefox.

After some digging, I found that I had to manually allow them to be linked
from an other domain, server-side. Here is the little snippet I added to my
`.htaccess`

```apache
<FilesMatch "\.(ttf|otf|woff)$">  
  <IfModule mod_headers.c>  
    Header set Access-Control-Allow-Origin "*"  
  </IfModule>  
</FilesMatch>
```

