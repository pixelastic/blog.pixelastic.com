---
layout: post
title: "tinyMCE mceRemoveNode explained"
custom_v2_id: 57
---

<p>When writing my image plugin for tinyMCE today I came accross the <code>mceRemoveNode </code>command that one can use to alter the tinyMCE editor content.</p>
<p>It has to be used with <code>editor.execCommand('mceRemoveNode', true/false, node)</code>.</p>
<p>I don't really get what the <code>true</code>/<code>false </code>argument was about, setting either one or the other didn't change anything (that I could tell) in my case. The node argument is the DOM node you want to remove from the editor.</p>
<p>At first I thought that the command would allow me to remove a node from the editor area. I needed it in my plugin. But it was not exactly what it really does.</p>
<p>In fact it only removes the wrapping node, but keep the content intact. In other words if you have</p>
<pre lang="html"><code lang="html">&lt;a href="http://www.domain.com/"&gt;&lt;img src="http://www.domain.com/picture.jpg" /&gt;&lt;/a&gt;</code></pre>
<p>And you remove the <code>&lt;a&gt;</code> node using <code>mceRemoveNode</code>, you'll end up with</p>
<pre lang="html"><code lang="html">&lt;img src="http://www.domain.com/picture.jpg" /&gt;</code></pre>
<p>in place of your link.</p>
<p>I had to manually (well, with the great help of jQuery) remove the content of the link before removing it. I could have remove the node itself using jQuery but I thought that sticking to the tinyMCE methods would be a better approach, I don't want to mess all this stuff up, maybe "simply" removing html nodes like this could interfere with the <code>textarea </code>value update, I don't know. And in doubt, I prefer to use the methods and command exposed by the API</p>