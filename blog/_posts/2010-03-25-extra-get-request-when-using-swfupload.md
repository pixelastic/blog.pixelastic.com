---
layout: post
title: "Extra GET request when using SWFUpload"
custom_v2_id: 60
tags: swfupload, firebug, button_image_url
---

I've been using [SWFUpload ](http://swfupload.org/)for quite a long time now.
Put simply, it's a Flash/Javascript plugin allowing a file upload to be done
without having to submit the page.

Basically it uses the streaming upload capacity of flash to fire javascript
events to tell the developer the upload percentage, do some filesize and
filetype checks, etc.

If you've ever seen an upload progress bar on any website, it most surely was
done using SWFUpload.

Anyway, today I spotted a strange behavior in one of my pages, heavily using
`SWFUpload `(more or less 20 upload fields). Using the Net panel of Firebug, I
saw some strange GET requests being made to my website.

After digging into my code, I could isolate the problem. I was coming from
`SWFUpload `itself. I even found record of [a bug
report](http://code.google.com/p/swfupload/issues/detail?id=202) mentionning
it.

In a nutshell, SWFUpload always make a request to the url specified in the
`button_image_url` parameter, even if you haven't specified one (in this case
it made a request to your webroot).

I'm not using any image for my button, or should I say, I take care of that in
CSS already, my SWFUpload button is just an invisible Flash element,
positionned on top of my existing button.

I tried setting the value to `null`, `false `or an empty string, but it would
continue to do the request.

Anyway, I upgraded to the latest version (2.5.0 Beta 3), and it solves my
problem. Now I'm just hoping that all the retro-compatibility will be kept.