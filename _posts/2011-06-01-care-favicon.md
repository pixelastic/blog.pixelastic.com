---
layout: post
title: "Take care of that favicon"
custom_v2_id: 286
---

<p>Even if you are not referencing it in your HTML markup, browsers will try to get a file named <code>/favicon.ico</code> on your server root. Let's see some good practice regarding this file.</p>
<h4>Make it small</h4>
<p>The smaller the file, the faster it will get downloaded. As it is a less than important file, we don't want to delay the loading of our page for such a tiny graphic. The default file format for such a file is <code>image/x-icon</code>, meaning the .ico extension.</p>
<p>I think it's a Microsoft legacy format, but well understood by every browser. Be careful when putting your favicon, don't just find a cool <code>.ico</code> file and drop it here. Icon files are containers, they hold various image format ranging from 16x16 to 512x512.</p>
<p>You clearly don't need the bigger one and the 16x16 will be highly enough. So, be careful.</p>
<p>The best way of creating the favicon I've found is to first create it as a <code>.gif</code>, then running ImageMagick upon it. On Linux, this means running</p>
<pre><code lang="sh">convert favicon.gif -resize 16x16! favicon.ico</code></pre><h4>Make it cacheable</h4>
<p>This file will be requested by the browser on every request, so you'd better make it cacheable to limit the number of requests.</p>
<p>Also, note that you can't change the name of the file, <code>favicon.ico</code> will always be fetched.</p>
<p>I choose to cache mine for a year, like any other static asset. I could have gone for a month, to allow updating them more often but I've never ever changed a favicon, so a year seems better.</p>
<h4>A note on Safari Win</h4>
<p>From the tests I've done, almost all browsers behave the same regarding favicon fetching and caching : the fetch it last, and do not issue a Cache-Control:max-age=0 on a refresh to force redownloading it.</p>
<p>Except Safari Win. It fetch it along other downloads and re-dewnload it on a page refresh.</p>