---
layout: post
title: "Performance improvement : moving assets to subdomains"
custom_v2_id: 238
---

**Disclaimer : What I'm talking about in this blog post can be optimised. Yes,
having multiple hosts is a great feature for performance improvement, but
I kind of did it wrong. My recent try at the webperf contest gave me more
insight on how to do it right.**

**I'll post more on the subject or update this post to reflect that.**

I've just added to this site a performance improvement I read a long time ago
but never implemented.

I'm talking about the multiple domains to serve static content. There are two
important things to note here : parallel requests and cookies. Let me explain
in a little more details what it's all about.

## Parallell requests

Your browser is only able to perform a certain number of parallel request at
the same time. It means that it can only download a certain number of files
concurrently (usually 4).

In other words, it will start the download of, say, a CSS file, a Javascript
file, and two images. Then, whenever one of this files is received, it will
start downloading a new file, and so on.

This means that there is a certain amount of time that is "lost" in the
process. You have to wait for one of the files to be downloaded before
starting downloading the next.

The important thing to note is that the limit on the number of parallel
downloads is set on a per-domain basis. It means that you can download only 4
files of `foo.com` while downloading at the same time 4 files from `bar.com`.
This is the basic of what we will be using to our advantage.

Splitting your files accross several domains (or subdomains) allows you to get
the best of parallel download. You do not really need to have your content
hosted on different servers, you just need them to be accessible through
different domain names, and subdomains are just perfect for that.

I have created four subdomains : `css.pixelastic.com`, `js.pixelastic.com`,
`img.pixelastic.co`m and `dl.pixelastic.com`.

Each one maps to the exact same site as `www.pixelastic.com` but using
different names improve the number of possible downloads and thus improve page
load.

## Cookies

All this stuff about subdomains brings me to my second point : cookies.

If you host all your files on the same domain, it means that all requests (be
it a php page or a static css file) will send cookie information without you
knowing.

Cookie data is usually small, like 100Ko or so, but is added to every single
request made. And most of the time this information is not even useful.

Apart from the fact that you are slowly killing your website bandwith with
useless information, your are also decreasing your page speed load for your
potential user.

The same trick of using a subdomain applies here too, and cookies won't be
sent.

There is one caveat that you should be aware of, though. If your site is
accessible through `domain.com` and you host your files on `files.domain.com`,
cookies will still be sent because `domain.com` is considered the master
domain of `files.domain.com` and thus all cookies set on the main domain will
also propagate to the subdomains.

On the other hand, if your main domain is `www.domain.com`, it is not
considered a parent domain of `files.domain.com` (but rather a sibling
domain).

## Configuring Apache

If you need to edit your `httpd.con`f file, here is what I put to add my
different subdomains on my local machine :

    
```apache
<VirtualHost *:80>  
  ServerName pixelastic  
  ServerAlias www.pixelastic  
  ServerAlias css.pixelastic  
  ServerAlias js.pixelastic  
  ServerAlias img.pixelastic  
  ServerAlias dl.pixelastic  
  DocumentRoot "www/pixelastic.com"  
  <Directory "www/pixelastic.com">  
    Options Indexes FollowSymLinks Includes ExecCGI  
    AllowOverride All  
    Order allow,deny  
    Allow from all  
  </Directory>  
</VirtualHost>
```
