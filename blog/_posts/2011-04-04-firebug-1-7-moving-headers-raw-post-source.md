---
layout: post
title: "Firebug 1.7 moving headers to raw POST source"
custom_v2_id: 270
tags: live-http-headers, flash, php, bug, firebug, post
---

_Edit : The issue discussed here has been fixed in [Firebug
1.9a2](http://getfirebug.com/releases/firebug/1.9/firebug-1.9.0a2.xpi)_

It took me a whole day to track this bug down. At first I thought something
was wrong in my request, I tried to replay it using Firebug and I kept hitting
a "malformed request" error.

Debugging it in reverse order, using Wireshark and other tools I finally came
to the conclusion that my request was indeed valid.

## So what ?

The guilty part was indeed Firebug. When I ran a simple `POST` request from
Flash, and inspect it from Firebug, I could spot that no `Content-Length` nor
`Content-Type` headers were displayed in the "Headers" part. I then saw that
the "source" part of the `POST `tab contains my missing headers. What was that
?

HTTP POST Request are supposed to be split into two parts. First part are the
headers, each separated by a `\r\n`. Then, after and empty line was the `POST
`raw content. Seeing that my headers gets mixed up with the `POST `data I
thought that the request was malformed and a `\r\n` was added too early.

I checked with Wireshark and with PHP on the back end, and no, the request was
indeed absolutly valid. Wireshark did not show any `\r\n` that shouldn't be
there and PHP correctly parsed my request. The only issue was the details
displayed by Firebug.

## So it's a display bug ? I can live with it.

Well, actually, it's a little more than just a display bug. It kind of blocks
my usual debugging workflow.

To debug an XHR request, I don't usually restart the whole page request just
to debug one of the inner request.

The Firebug ability to "open request in new tab" is a time saver for me. I can
play and replay the same request over and over until it's debuggued.

But with this bug, I can't use this feature. Opening the request in new tab
will not send the slipped headers, and will instead send them in the `POST
`source, resulting in a corrupted posted data.

I've [posted an issue](http://code.google.com/p/fbug/issues/detail?id=4327) on
the Firebug bug tracker. I hope it will get resolved soon. Until then, I'm
using Live HTTP Headers to capture and replay the requests I need to debug.

## Update

Seems like the bug come from Firefox internals and not Firebug. More details
[on this post.](http://groups.google.com/group/mozilla.dev.platform/browse_thr
ead/thread/1faabb0d0a8d26f7?hl=en)

Edit : Seems to be [resolved in
Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=649338), will be
available in next release (8.0 I guess).