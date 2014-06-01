---
layout: post
title: "Facebook https mixed content warning on IE9"
custom_v2_id: 330
---

<p>When browsing the web, you might have seen a "mixed content warning" popup show in your browser. They are most of the time poorly worded and their meaning is quite obscure.</p>
<p>What it means is that your are currently browsing a page with both <code>http </code>and <code>https </code>content. Typically, if your page is <code>https </code>but one of the css, js or image file it contains is requested through <code>http</code>, the warning will pop.</p>
<p><em>(It's interesting to note here that not all assets are treated equal. Loading a flash movie through <code>http </code>does not trigger the warning).</em></p>
<h4>The IE special case</h4>
<p>Now, what's special about IE is that it also trigger the mixed content warning when content is the other way around. If you're serving a page through <code>http </code>and load assets through <code>https</code>, it will consider it a mixed content too.</p>
<p>In a sense, that's logical, but it needlessly prompt the user with a dialog that block downloading of all <code>https </code>assets until confirmed.</p>
<p>The solution is to make sure that all your assets are loaded with the same protocol as the host page. An easy way to do so is to use the <code>//</code> relative protocol url. This will use <code>http </code>or <code>https </code>automatically based on the page protocol.</p>
<h4>And adding Facebook to the mix</h4>
<p>A few months ago, Facebook forced all apps to serve content through <code>https</code>. In the meantime, they suggested that all their users browse their website using <code>https </code>too.</p>
<p>Unfortunatly for us, some of our own users had bookmarks in their browsers and Facebook pages referencing our old <a href="http://apps.facebook.com/appname/" target="_blank">http://apps.facebook.com/appname/</a> url. And following that link triggered the dreaded mixed content warning in IE.</p>
<p>When accessing this page, Facebook was loaded in classic <code>http </code>but our inner iframe was loaded through <code>https</code>. So far, so good.</p>
<p>The problem came from one of Facebook own javascript SDK included in our app. This script loaded other scripts based on what it needed.</p>
<p>Unfortunatly, it loaded the other scripts from an <code>http </code>(not <code>https</code>) server. The SDK has two distinct sets of urls, based on the current page protocol.</p>
<p>It was wrongly considering being in an <code>http </code>page, not an <code>https </code>one, and thus used the wrong set of urls. This confusing comes from the fact that it checks the top page protocol instead of checking the current page protocol.</p>
<p>After some googling, I found a solution that consisted in forcing the SDK to consider that we are in <code>https </code>mode by calling : <code>FB._https = true</code> before the call to<code> FB.init()</code></p>
<h4>Almost there</h4>
<p>If correctly forced FB to use the correct set of urls, thus removing the mixed content warning. And I almost thought it would be that easy.</p>
<p>It was not.</p>
<p>This did not fixed the payment popup. All Facebook UI element loaded correctly (feeds, permissions, requests), but the payment popup.</p>
<p>I couldn't find a way to fix that, so I reverted to a more brutal approach.</p>
<h4>Final and brutal solution</h4>
<p>All my problems came from the fact that FB thought we were serving <code>http </code>while in fact we were serving <code>https</code>. So the solution, might be to force FB to serve <code>https </code>from start to end.</p>
<p>I wanted to detect if the page was loaded through <a href="http://apps.facebook.com/appname/" target="_blank">http://apps.facebook.com/appname/</a> or <a href="https://apps.facebook.com/appname/" target="_blank">https://apps.facebook.com/appname/</a>.</p>
<p>Unfortunatly, due to cross domain restrictions in Javascript, we are not able to read, from inside and iframe, the parent frame properties. So I couldn't read <code>top.location.protocol</code> to easily check if I needed to redirect.</p>
<p>But, as I mentionned earlier, <code>FB._https</code> incorrectly report that we are not in <code>https </code>because it checks the top protocol. So I used this var, to know if the parent frame was in the correct protocol or not. Using this own FB bug to fix itself.</p>
<p>Now, for the redirect : even if I couldn't read the<code> top.location</code>, I could modify it. I just had to call <code>top.location.url = 'https://apps.facebook.com/appname/'</code> to redirect the whole page.</p>
<p>I hardcoded the app url because there was no way to get it from js, and I took care of keeping any GET parameter passed before the redirect, and I ended up with this :</p>
<pre><code lang="js">if (!FB._https) {<br />	var appUrl = 'https://apps.facebook.com/appname/';<br />	var iframeUrl = location.protocol+'//'+location.host+location.pathname;<br />	var redirectUrl = location.href.replace(iframeUrl, appUrl);<br />	top.location.href = redirectUrl;<br />	return;<br />}<br />FB.init(options);</code></pre>
<h4>Conclusion</h4>
<p>I'm not really proud of this solution, as it is mostly a hack and will force a useless loading of the http version before loading the https one, but that's the best I've found. If any of you have a better solution, feel free to comment.</p>
<p> </p>
<p> </p>