---
layout: post
title: "Nginx tweaks"
tags: nginx
---

_I just realized I have a bunch of posts forgotten into my draft folder. I'll
dust them up and publish them, using my 3 hours train journey the best I can._

So this one if about a few tweaks I did to the nginx config used on this very
own blog.

## Prevent access without a hostname

The first one is a small security measure to disallow serving files when
accessing the server through its IP address. Only requests that specify a valid
hostname will be honored. This will prevent people from accidentally browsing
your tree structure.

```nginx
http {
  [...]
  server {
    listen 80;
    return 444;
  }
}
```

## Defining a custom 404 page

It is always better to serve a real 404 page than the default one. To be able to
define a specific 404 page for each website hosted, you have to use the
`error_page` directive.

```nginx
server {
  [...]
  error_page 404 =404 /path/to/404.html
  # You can also use: 
  # error_page 404 /path/to/404.html
  # Which will do a 301 redirect and not a 404
}
```

## Redirect root to www

Finally, one last trick to redirect all requests made to the root domain to its
www counterpart. Hosting a website directly on the root domain will cause issues
when you have to handle cookies. Cookies defined on a top domain will be send to
all requests targeting a subdomain. By hosting your website on the top domain,
you expose yourself to sending useless cookies to any subdomains you might
create.

Therefore, it is better to host your website on a `www` subdomain and redirect
any requests made to the root to the `www` subdomain.

```nginx
server {
	server_name pixelastic.com;
	rewrite ^ $scheme://www.pixelastic.com$uri permanent;
}
```

Here was a short list of nginx tweaks. It's better published than sitting in my
draft folder.



