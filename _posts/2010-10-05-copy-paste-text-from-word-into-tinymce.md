---
layout: post
title: "Copy/Paste text from Word into tinyMCE"
custom_v2_id: 227
---

<p>What good is building a really nice CMS with top-notch WYSIWYG editor if you handed it to clients that will blindly copy/paste Word documents into it ?</p>
<p>Well, it will just render a big ugly mess of proprietary and contradictory pseudo-css rules. You could even be blamed for it.</p>
<h4>The solution</h4>
<p>The latest versions of tinyMCE came bundled with an improved <code>paste </code>plugin. It will automatically attempt to clean bad pasted text by operating some dark voodoo magic on it.</p>
<p>It does it quite well to be honest, removing almost all messy formatting. From the tests I tried, I was still getting useless crap in the resulting text (CSS comments, <code>&lt;span&gt;</code> with overly long style of color and background-color definitions, etc).</p>
<p>I finally decided to take a more brutal approach. The <code>paste </code>plugin contained a <code>_insertPlainText</code> method that was supposed to be used in conjunction with a toolbar icon.</p>
<p>This method removes all formatting. Period.</p>
<p>As I didn't want to have to click on a toolbar icon before pasting my text (and none of my actual clients would ever think of doing that either), I came up with a very simple plugin to do the boring stuff for me.</p>
<h4>The plugin</h4>
<p>The only goal of this plugin is setting to <code>true </code>the <code>pasteAsPlainText </code>property of every editor. This property is defaulted to <code>false </code>but can be swapped using the toolbar icon.</p>
<p>I also forced the <code>paste_text_sticky</code> setting to <code>true</code>, preventing the previous property to revert to <code>false </code>after the first pasting.</p>
<p>Here's my plugin full code :</p>
<p>Be sure to include the <code>paste </code>plugin in your plugin list, and insert my plugin <strong>after </strong>the paste plugin.</p>
<pre><code lang="js">/**<br /> *    Will automatically convert pasted text so no junk code will be included.<br /> *    This plugin depends on the core paste plugin.<br /> **/<br />(function() {<br />	tinymce.create('tinymce.plugins.pasteAsPlainTextPlugin', {<br />		init : function(editor, url) {<br />			// We force the pasting to occur as plain text<br />			editor.pasteAsPlainText = true;<br />			// We also put it as sticky to allow for multiple pastings<br />			editor.settings.paste_text_sticky = true;<br /><br />			// Adding some special post process<br />			editor.settings.paste_postprocess = function(a, o) {<br />				var text = o.content,<br />					split = String.fromCharCode(13)+String.fromCharCode(10)<br />				;<br /><br />				// If content is long text without HTML, We'll break it into &lt;p&gt;ieces<br />				if (text.charAt(0)!='&lt;' &amp;&amp; text.indexOf(split)!=-1) {<br />					// Adding &lt;p&gt; around each line<br />					var node = document.createElement('div'),<br />						sentences = text.split(split)<br />					;<br />					for(var i=0,max=sentences.length;i!=max;i++) {<br />						node.innerHTML+='&lt;p&gt;'+sentences[i]+'&lt;/p&gt;';<br />					}<br /><br />					// Saving back in original content/node<br />					o.node = node;<br />					o.content = node.innerHTML;<br />				}<br />				return o;<br />			}<br />		}<br />	});<br /><br />	// Register plugin<br />	tinymce.PluginManager.add('pasteAsPlainText', tinymce.plugins[pasteAsPlainTextPlugin]);<br />})();<br /></code></pre>
<h4>Update</h4>
<p>I added a <code>postprocess </code>calback after seing that the pasted text was a little too plain in Webkit. All my text was displayed on the same line, without the nice breaking into paragraph that Firefox showed.</p>
<p>It occured because tinyMCE used the <code>event.clipboardData</code> property that Webkit browsers provides and allow for easy retrieving of clipboard data. Unfortunatly it returned a really plain text, and I had to apply a little loop to replace each new line with a paragraph.</p>