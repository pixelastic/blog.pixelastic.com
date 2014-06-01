---
layout: post
title: "SWF caching issues accross browsers"
custom_v2_id: 287
---

<p>Here are some quick notes on various browser caching behavior. I was fiddling with Wireshark to optimise my caching strategy and found some quirks one should be aware of.</p>
<p>First, let's define some reload vocabulary.</p>
<ul>
<li><strong>initial load</strong> is the first time the page is loaded, when the cache is empty.</li>
<li><strong>hard reload</strong> is the classical reload. Clicking the Reload icon, or pressing Ctrl+R / F5.</li>
<li><strong>link reload</strong> is when the page is loaded again after you click on a link to it</li>
<li><strong>soft reload</strong> will be loading the page again by pressing enter in the address bar</li>
<li><strong>navigational reload</strong> is the reloading of a page that occurs while using the previous/next buttons.</li>
</ul>
<p>For the rest of this blog post, we will assume an HTML page loading the same .jpg file multiple times and the same swf file multiple times too (we will use both IE specific and general swf markup).</p>
<p>The html itself is not cached.</p>
<p>Also, all those static assets will have a <code>Cache-Control:max-age=29030400</code> header.</p>
<p>All the network tests have been made using Wireshark.</p>
<h4>Chrome</h4>
<p><strong>Initial load</strong> : Download of jpg and swf once each. Perfect.</p>
<p><strong>Link reload &amp; navigational reload</strong>: Nor jpg nor swf is loaded again. Perfect.</p>
<p><strong>Soft reload &amp; hard reload </strong>: The jpg is downloaded again but not the swf. Chrome sends a <code>Cache-Control:max-age=0</code> header to the jpg request, to force loading it again.</p>
<p>Reloading images is a standard behavior on images, but I wouldn't have expected it on soft reloads.</p>
<h4>Safari 5 Win</h4>
<p>Safari behaves much like Chrome, with one important difference. It does not cache swf files at all.</p>
<p><strong>Initial load</strong> : The jpg gets downloaded perfectly, but the swf gets downloaded multiple times, one per instance.</p>
<p><strong>Link reload &amp; navigational reload</strong> : The jpg is correctly fetched from cache, but the swf are all downloaded again. No swf is ever cached.</p>
<p><strong>Soft reload &amp; hard reload</strong> : Much as Chrome, Safari forces the reload of the jpg here. As you might guess, it also reload all the swf too, multiple times.</p>
<p>It means that Safari 5 does not cache any swf file at all. That's pretty impressive.</p>
<p>This same caching bug is talked about <a href="http://don.blogs.smugmug.com/2008/04/04/nasty-bug-safari-doesnt-cache-stuff/" target="_blank">on this other blog</a>. I've also tried including flash files from within another flash file (much like the <a href="http://www.alistapart.com/articles/flashsatay">Satay method</a>). The results are the same : no swf flash is ever cached, even in the same html request.</p>
<p>It is supposed to have been fixed in Safari Mac (anyone can confirm this? I don't own a Mac) but the issue is still here on Safari Windows.</p>
<h4>IE6, IE7 and IE8</h4>
<p>IE6, IE7 and IE8 behaves the same here. They have a less severe version of the bug than Safari 5. At the time of writing I didn't have IE9 to test on it.</p>
<p><strong>Initial load</strong> : Same bug as Safari here. The swf are downloaded multiple times, once for each instance. The jpg is only download once.</p>
<p><strong>Link reload, navigational reload and soft reload</strong> : This time, everything is fetched from the cache. Actually, even the html is seems fetched from cache (I didn't investigate that much)</p>
<p><strong>Hard reload</strong> : Html and jpg are fetched from the server, swf file stays in the cache.</p>
<p>It appears that (surprisingly) IE behaves quite well. Its caching behavior is more aggressive than the others (soft reload is really soft). However, it still have a nasty side effect of loading swf files multiple times on the same page. Shouldn't happen a lot in the real world, but still nice to know.</p>
<h4>Firefox 4.0</h4>
<p><strong>Initial load</strong> : No issue arising. It does fetch each resource once.</p>
<p><strong>Link reload, navigational reload and soft reload</strong> : Fetches everything from cache, nice.</p>
<p><strong>Hard reload</strong> : Re-request jpg and swf files by adding a <code>Cache-Control: max-age=0</code> request header. This feels like the expected behavior.</p>
<p> </p>
<br />