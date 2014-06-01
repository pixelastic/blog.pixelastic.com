---
layout: post
title: "Detecting fullscreen in tinyMCE"
custom_v2_id: 251
---

<p>I wanted one of my tinyMCE plugins to fire a certain set of actions whenever the full screen mode was activated.</p>
<p>I search for an <code>onFullScren </code>event or somethin similar but to no avail. I finally discovered that the full screen actually creates a whole new tinymce editor instance.</p>
<p>So the only thing I had to do was writing my little piece of code in the <code>init </code>method of my plugin and check to see if the fullscreen was enabled.</p>
<p>The initial fullscreen plugin exposes a <code>fullscreen_is_enabled</code> param that can be checked.</p>
<p>All I had to do was a simple condition like : <code>if (editor.getParam('fullscreen_is_enabled')) {}.</code> And once in the condition I tried to execute my custom code. I needed the <code>editor.execCommand</code> method but all I got was an error because <code>t.selection</code> was not set.</p>
<p>It appears that the execCommand can only be executed when the full editor instance is loaded (and thus a t.selection is created). So I wrap my little piece of code into a <code>setInterval</code> checking for <code>editor.selection</code> and finally executed my code when the <code>.selection </code>was set.</p>
<p>Here is my final snippet, to be included in my plugin <code>init </code>method :</p>
<pre><code lang="js">if (editor.getParam('fullscreen_is_enabled')) {<br />	var fullScreenInterval = setInterval(function() {<br />		if (!editor.selection) return false;<br />		clearInterval(fullScreenInterval);<br />		editor.execCommand('anyTinyMCECommand');<br />	}, 1000);<br />}</code></pre>
<p> </p>