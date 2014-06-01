---
layout: post
title: "Alternate content with SWFObject"
custom_v2_id: 293
---

<p>SWFObject allow a web developer to add an alternate content in place of the <code>swf</code> file is the user doesn't have flash installed.</p>
<p>In the case of a web app this is great to provide your user with a link to the Adobe website. You then tell your users Flash is needed and provide a link for them to install it.</p>
<p>Unfortunatly, if for one reason or another the <code>swf</code> file you try to load is unreachable (maybe your host is down ?), SWFObject will display the same alternate content. Meaning that a user with a perfectly correct Flash version will see an error message telling him that he does not have Flash when in fact the error is on your side.</p>
<p>That's not very user friendly and makes you look bad.</p>
<p>So, to fix this, I added two error messages as alternate content :</p>
<pre><code lang="html">&lt;div id="alternateContent" class="alternateContent"&gt;<br />	&lt;div class="noFlash message"&gt;It seems that you do not have the Flash player installed. Please install it, by &lt;a href="http://www.adobe.com/go/getflashplayer" target="_parent"&gt;following this link&lt;/a&gt;.&lt;/div&gt;<br />	&lt;div class="error404 message"&gt;Sorry, we were unable to load the game. Please try again in a few moments.&lt;/div&gt;<br />&lt;/div&gt;</code></pre>
<p>Then, in CSS I decided to hide them both :</p>
<pre><code lang="css">.alternateContent .message { display:none; }<br />.alternateContent.noFlash .noFlash { display:block; }<br />.alternateContent.error404 .error404 { display:block; }</code></pre>
<p>And finally, in Javascript I checked for the current Flash version. If it's equal to zero, it means that Flash is not installed, so I display the <code>noFlash </code>error message, otherwise, I guess it's a 404 error and display the other message.</p>
<pre><code lang="js">var flashVersion = swfobject.getFlashPlayerVersion(),<br />	alternateContent = $('#alternateContent')<br />;<br />// Displaying one message or the other<br />if (flashVersion.minor=='0') {<br />	alternateContent.addClass('noFlash');<br />} else {<br />	alternateContent.addClass('error404');<br />}</code></pre>
<p>This is not bulletproof : I only test for two cases. And a better solution would also have been to put the error message dynamically using Javascript instead of polluting the HTML markup with contradictory text.</p>