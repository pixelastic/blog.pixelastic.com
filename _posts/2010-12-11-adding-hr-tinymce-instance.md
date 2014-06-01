---
layout: post
title: "Adding a <hr> in a tinyMCE instance"
custom_v2_id: 249
---

<p>When using the default tinyMCE implementation to add an <code>&lt;hr&gt;</code> element to the editor content, the <code>&lt;hr&gt;</code> is added inside its parent <code>&lt;p&gt;</code> element (when it should be an element on its own, without such a parent).</p>
<p>I've added my own plugin to resolve this small issue, here is the code :</p>
<pre><code lang="js">(function() {<br />	tinymce.create('tinymce.plugins.pixelastic_hrPlugin', {<br />		init : function(editor, url) {<br />			// Register the command<br />			editor.addCommand('mcepixelastic_hr', function() {<br />				// We get the parent node<br />				var parentNode = editor.selection.getNode(),<br />				uniqueId = editor.dom.uniqueId();<br />				// We insert the hr (with a unique id to select it later)<br />				editor.execCommand('mceInsertContent', false, '&lt;hr id="'+uniqueId+'" /&gt;');<br />				var hr = editor.dom.select('#'+uniqueId)[0];<br />				// We split the parent element around the hr<br />				editor.dom.split(parentNode, hr);<br />				// We remove the temporary id<br />				$(hr).attr('id', null);<br />			});<br />			// Adding a button<br />			editor.addButton(pluginName, { title : 'pixelastic_hr.desc', cmd : 'mcepixelastic_hr' });<br />			}<br />		}<br />	});<br />	// Register plugin<br />	tinymce.PluginManager.add('pixelastic_hr', tinymce.plugins['pixelastic_hrPlugin']);<br />})();</code></pre>
<p>The trick to use the <code>editor.dom.split</code> method to split the parent element around the <code>&lt;hr&gt;</code> element.</p>
<p>The dirty hacks is that there is no way to get a direct reference to a DOM element added through <code>mceInsertContent</code>, so we need to set a temporary unique id and then select it through this id.</p>
<p>I use jQuery in my example and I strongly suggest you to do the same, the selectors it provides are much sexier and helps writing these kind of plugins pretty fast.</p>