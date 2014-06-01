---
layout: post
title: "Passing flashVars with Flash 10 in IE"
custom_v2_id: 323
---

<p>I've spent the last two days debugging a weird issue involving https, IE and Flash.</p>
<p>In the end, I boiled the issue down to IE and Flash 10, https wasn't involved (in fact, that was a different issue).</p>
<h4>Markup hell</h4>
<p>It is known that to have a real crossbrowser markup to embed Flash we need an IE specific version and a non-IE one.</p>
<p>What I didn't know was that <code>flashvars </code>needed to be passed in two different formats between Flash player 10 and Flash player 11.</p>
<p>11 expect the classic <code>flashvars </code>parameter while 10 expect them to be passed as simili GET parameters to the movie url.</p>
<h4>Final HTML markup</h4>
<p>In the end, here is the PHP code I use to generate my SWF markup :</p>
<pre><code lang="php">sprintf(<br />	'&lt;object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="%1$s" height="%2$s" id="%3$s"&gt;<br />		&lt;param name="movie" value="%4$s?%6$s" /&gt;<br />		%5$s<br />		&lt;!--[if !IE]&gt;--&gt;<br />			&lt;object type="application/x-shockwave-flash" data="%4$s" width="%1$s" height="%2$s"&gt;<br />			%5$s<br />		&lt;!--&lt;![endif]--&gt;<br />		%7$s<br />		&lt;!--[if !IE]&gt;--&gt;&lt;/object&gt;&lt;!--&lt;![endif]--&gt;<br />	&lt;/object&gt;<br />',<br />$width, $height, $id, $url, $params, $flashVars, $alternateContent);</code></pre>
<p>Where :</p>
<ul>
<li><code>$width</code> and <code>$height</code> are the size (in pixel) of your movie</li>
<li><code>$id</code> is the html/css id of the main object element (as used in <code>swfObject.getObjectById</code>)</li>
<li><code>$url</code> is the url address of your swf file</li>
<li><code>$params</code> is a string containing all the <code>&lt;param name="name" value="value" /&gt;</code> that you want to pass. Usually it will contain the <code>wmode</code>, <code>allowfullscreen</code>, <code>allowscriptaccess </code>and <code>flashvars </code>keys.</li>
<li><code>$flashVars</code> is a duplicate of the <code>flashVars </code>key of <code>$params</code> and should contain a string in the form <code>foo=bar&amp;baz=nyan</code> to be passed to the swf in Flash 10</li>
<li><code>$alternateContent</code> is the html text to be displayed when Flash is not installed in the browse</li>
</ul>
<p>I hope that this markup will help you, because I spent a damn long time testing all that stuff, jungling between VM and IE instances.</p>