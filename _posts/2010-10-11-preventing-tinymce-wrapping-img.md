---
layout: post
title: "Preventing tinyMCE from wrapping <img /> in <p>"
custom_v2_id: 231
---

<p>If you just want to add a presentational image in a tinyMCE editor, you'll find out very quickly that it will be wrapped in <code>&lt;p&gt;&lt;/p&gt;</code> without you asking.</p>
<p>The question has been asked several times on the tinyMCE forums, but the answers never quite satisfied me. It ranges from the classical "<em>Why do you want to do this ? You should better use &lt;insert semantic element and css here&gt;</em>" to "<em>Just do a regexp before displaying your content to remove the bad &lt;p&gt;</em>&lt;/p&gt;".</p>
<p>This clearly did not satisfy me.</p>
<p>The solution was to define the<code> forced_root_block</code> setting value to <code>false</code>, allowing us to create any element on the top level, and not having it automatically wrapped in <code>&lt;p&gt;.</code></p>
<h4>Fixing the side effect</h4>
<p>Allowing for elements to be input directly in the root level has the nasty side effect of creating tinyMCE editor instances with a default text of, well, nothing, instead of the really usefull <code>&lt;p&gt;</code> tag. Also, if you do a Ctrl+A and delete all content, you'll end up with an empty editor without the initial <code>&lt;p&gt;</code> tags</p>
<p>To fix this part, I just added an <code>onNodeChange </code>event to fire every time the content is changed. I test the current content and if empty add the <code>&lt;p&gt;</code> tag. There is a little subtelty though, to correctly place the caret where needed.</p>
<p>In your <code>tinyMCE.init</code> call, just add the following setup key :</p>
<pre><code lang="js">tinyMCE.init({<br />[...]<br />	setup: function(editor) {<br />		editor.onNodeChange.add(function(editor, cm, e, c, o) {<br />			var editorContent = editor.getContent();<br />			if (editorContent==="") {<br />				// We set content as a &lt;p&gt; containing a placeholder, then we delete the placeholder to place the caret<br />				editor.setContent('&lt;p&gt;&lt;span id="__CaretPlacholder"&gt;Placeholder&lt;/span&gt;&lt;/p&gt;');<br />				editor.selection.select(editor.dom.select('#__CaretPlacholder')[0]);<br />				editor.dom.remove(editor.dom.select('#__CaretPlacholder')[0]);<br />			}<br />		});<br />	 }),<br />[...]<br /> });</code></pre>
<p>Before finding this solution, I tried the <code>onBeforeSetContent </code>callback, but due to a bug in the tinyMCE source, it couldn't handle well the case where the editor is empty. So I had to resort to a more generic callback.</p>