---
layout: post
title: "Otf, ttf, eot, woff and svg. What mimetypes to use ?"
tags: fonts, eot, ttf, otf, woff, svg
---

If you're using a custom font on your website, you'll probably end up with
a bunch of font files in various extensions. But do you know which
`Content-Type` to use for each type of file ?

### SVG

`svg` fonts are the easiest. The svg format is well documented, and svg fonts
are not very different from svg images. Its mimetype is `image/svg+xml`.

### EOT

The proprietary Microsoft format has its own (weird) mimetype,
`application/vnd.ms-fontobject`.

### WOFF

Since 2013, `woff` also happen to have its own registered mimetype,
`application/font-woff`.

### OTF & TTF

Those two do not have a registered mimetype. You could get away with defining
an `application/octet-stream`. But if you want to gzip them (and you should),
you often need a more precise `Content-Type`, one that is not shared with any
other type of files.

So to this end, it is considered acceptable to define a custom mimetype of
`application/x-font-opentype` and `application/x-font-truetype`. The `x-` is
here to tell that it's a custom mimetype and that it should be treated as
binary.


