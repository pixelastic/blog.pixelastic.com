---
layout: post
title: "Take care of that favicon"
custom_v2_id: 286
---

Even if you are not referencing it in your HTML markup, browsers will try to
get a file named `/favicon.ico` on your server root. Let's see some good
practice regarding this file.

#### Make it small

The smaller the file, the faster it will get downloaded. As it is a less than
important file, we don't want to delay the loading of our page for such a tiny
graphic. The default file format for such a file is `image/x-icon`, meaning
the .ico extension.

I think it's a Microsoft legacy format, but well understood by every browser.
Be careful when putting your favicon, don't just find a cool `.ico` file and
drop it here. Icon files are containers, they hold various image format
ranging from 16x16 to 512x512.

You clearly don't need the bigger one and the 16x16 will be highly enough. So,
be careful.

The best way of creating the favicon I've found is to first create it as a
`.gif`, then running ImageMagick upon it. On Linux, this means running

    
    convert favicon.gif -resize 16x16! favicon.ico

#### Make it cacheable

This file will be requested by the browser on every request, so you'd better
make it cacheable to limit the number of requests.

Also, note that you can't change the name of the file, `favicon.ico` will
always be fetched.

I choose to cache mine for a year, like any other static asset. I could have
gone for a month, to allow updating them more often but I've never ever
changed a favicon, so a year seems better.

#### A note on Safari Win

From the tests I've done, almost all browsers behave the same regarding
favicon fetching and caching : the fetch it last, and do not issue a Cache-
Control:max-age=0 on a refresh to force redownloading it.

Except Safari Win. It fetch it along other downloads and re-dewnload it on a
page refresh.

