---
layout: post
title: "Gzipping your font files"
custom_v2_id: 87
---

When using `@font-face` to display fonts, you have to create a whole bunch of
font files on your server to accomodate the quirks of the various browsers.

If you do things right (or follow the automatic kit build of FontSquirell),
you should get a `.eot` file for IE, a `.ttf`/`.otf` file for current
browsers, a `.svg` file for Chrome and the iPhone/iPad and a `.woff` file for
the next browser generation.

Unfortunatly, you'll have to cope with that because there isn't much we can do
about it at the moment.

But you can compress those files to make the font rendering faster. Some
browsers even download all the fonts even if they will only use one, so
compress them !

The easiest way is to configure your server to automatically gzip them. You
should already have done that for your css and js file so it is just a matter
of adding new types.

As far as I know `.otf` and `.ttf` files don't have registered mimetype, so I
had to create a dummy one for them in my .htaccess :


```apache
AddType x-font/otf    .otf
AddType x-font/ttf    .ttf
AddType x-font/eot    .eot
```

I also added the `.eot` because even if an `application/vnd.ms-fontobject`
mimetype is registered for this obscure microsoft format, when I tried to add
a deflate rule on it, my Apache crashed so I took the safest way of defining a
custom mimetype.

I prefixed them with an `x- `to make sure that it won't mess with existing
mimetypes.

The second part was to add gziping to those


```apache
AddOutputFilterByType DEFLATE x-font/otf x-font/ttf x-font/eot
```

SVG files are in fact xml files, and you should already have them gzipped, so
no need to add them here.

I haven't included `.woff` files because `.woff` files are already compressed
files, so you don't need to gzip them.

