---
layout: post
title: "Firebug 1.7 moving headers to raw POST source"
custom_v2_id: 270
---

<p><em>Edit : The issue discussed here has been fixed in <a href="http://getfirebug.com/releases/firebug/1.9/firebug-1.9.0a2.xpi">Firebug 1.9a2</a></em></p>
<p>It took me a whole day to track this bug down. At first I thought something was wrong in my request, I tried to replay it using Firebug and I kept hitting a "malformed request" error.</p>
<p>Debugging it in reverse order, using Wireshark and other tools I finally came to the conclusion that my request was indeed valid.</p>
<h4>So what ?</h4>
<p>The guilty part was indeed Firebug. When I ran a simple <code>POST</code> request from Flash, and inspect it from Firebug, I could spot that no <code>Content-Length</code> nor <code>Content-Type</code> headers were displayed in the "Headers" part. I then saw that the "source" part of the <code>POST </code>tab contains my missing headers. What was that ?</p>
<p>HTTP POST Request are supposed to be split into two parts. First part are the headers, each separated by a <code>\r\n</code>. Then, after and empty line was the <code>POST </code>raw content. Seeing that my headers gets mixed up with the <code>POST </code>data I thought that the request was malformed and a <code>\r\n</code> was added too early.</p>
<p>I checked with Wireshark and with PHP on the back end, and no, the request was indeed absolutly valid. Wireshark did not show any <code>\r\n</code> that shouldn't be there and PHP correctly parsed my request. The only issue was the details displayed by Firebug.</p>
<h4>So it's a display bug ? I can live with it.</h4>
<p>Well, actually, it's a little more than just a display bug. It kind of blocks my usual debugging workflow.</p>
<p>To debug an XHR request, I don't usually restart the whole page request just to debug one of the inner request.</p>
<p>The Firebug ability to "open request in new tab" is a time saver for me. I can play and replay the same request over and over until it's debuggued.</p>
<p>But with this bug, I can't use this feature. Opening the request in new tab will not send the slipped headers, and will instead send them in the <code>POST </code>source, resulting in a corrupted posted data.</p>
<p>I've <a href="http://code.google.com/p/fbug/issues/detail?id=4327" target="_blank">posted an issue</a> on the Firebug bug tracker. I hope it will get resolved soon. Until then, I'm using Live HTTP Headers to capture and replay the requests I need to debug.</p>
<h4>Update</h4>
<p>Seems like the bug come from Firefox internals and not Firebug. More details <a href="http://groups.google.com/group/mozilla.dev.platform/browse_thread/thread/1faabb0d0a8d26f7?hl=en" target="_blank">on this post.</a></p>
<p>Edit : Seems to be <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=649338" target="_blank">resolved in Firefox</a>, will be available in next release (8.0 I guess).</p>