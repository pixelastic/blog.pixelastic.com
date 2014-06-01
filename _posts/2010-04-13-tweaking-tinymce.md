---
layout: post
title: "Tweaking tinyMCE"
custom_v2_id: 74
---

<p>I'm in the process of tweaking a tinyMCE install to use a custom set of plugins and a custom skin to better fit in the Caracole CMS. This would allow me to re-use CSS and JS code I've already coded.</p>
<p>Fortunatly, I'm getting better and better at understanding the way tinyMCE works and the various configuration options and how to tweak them.</p>
<p>I also want the tinyMCE CSS rules to be integrated into the main CSS file of my app (packed and minified using CSSTidy). So I defined a custom skin in the tinyMCE setup, named '<code>caracole</code>'. This way, all the CSS skinning classes will be prefixed with <code>caracole </code>as I don't want to mess with the default skins.</p>
<p>I also copied the <code>ui.css</code> file from the <code>themes/advanced/skins/default</code> to my own css directory, renamed it to <code>tinymce.css</code>, replaced all <code>.default</code> occurences to <code>.caracole</code> and added this file to the list of files being processed by the main packer.</p>
<p>This way I can easily update any css file from the same directory, without having to dive into the tinymce subdirectories.</p>
<p>Unfortunatly, by doing so, tinyMCE continue to load the <span class="objectBox objectBox-text"><code>tiny_mce/themes/advanced/skins/caracole/ui.css</code> file (have a look at Firebug if you don't trust me). It took me some time to figure out where that call was made from. It is actually on <code>editor_template.js</code> (around line 150 in dev version). </span></p>
<p>As I didn't want to load this file twice, I tried to disable this call. I could have manually patched the source file but I don't want to, it would make any future update a pain. So I tried to find an other way.</p>
<p>Looking at the <code>loadCSS </code>method, it appears that there is a mechanism to prevent loading twice the same file. If the file is already present in the <code>.files</code> array, it won't be added. Ok, so now I just have to manually add the file before the call is made.</p>
<p>That's where the setup callback come into play. I just defined in my inyMCE.init :</p>
<pre><code lang="js">tinyMCE.init({<br />	skin: 'caracole',<br />	editor_css: 'caracoleDoNotInclude',<br />	setup: function(editor) {<br />		tinymce.DOM.files['http://'+document.domain+'/caracoleDoNotInclude'] = true;<br />	}<br />}</code></pre>
<p>Doing so, the <code>loadCSS </code>will try to load the <code>caracoleDoNotInclude</code> file (clearly this name is a placeholder, I have no such file). And in the setup method I manually tell tinyMCE that this file is already loaded so when it will initiate, it won't load the file at all.</p>
<p>Same goes for the <code>content_css</code>, the file that handle the look and feel of the editable zone. I don't want to have my file in the tinyMCE skin directory, I'd rather have it with my other CSS files.</p>
<p>So I defined a custom <code>content_css</code> to point to my file. I also had to update the setup method to mark the file as already loaded. But this time, as the file is loaded on a per instance basis, this is the <code>editor.dom.files</code> that I have to update, not the general <code>tinymce.DOM</code>.</p>
<p>Fortunatly, the latest tinyMCE version expose their event API, so it was just a matter of defining the following event in the main setup :</p>
<pre><code lang="js">setup: function(editor) {<br />	tinymce.DOM.files[baseUrl+'caracoleDoNotInclude'] = true;<br />	editor.onPreInit.add(function(editor) {<br />		editor.dom.files[baseUrl+'js/vendors/tiny_mce/themes/advanced/skins/caracole/content.css'] = true;<br />	 });<br /> },</code></pre>
<h4>Edit :</h4>
<p>Note that in the latest tinyMCE version, the code is slightly different because you have to call a special method on the url before adding it to the <code>editor.dom.files</code></p>
<pre><code lang="js">editor.onPreInit.add(function(editor) {<br />	editor.dom.files[editor.baseURI.toAbsolute('http://'+document.domain+'/js/vendors/tiny_mce/themes/advanced/skins/caracole/content.css')] = true;<br />});</code></pre>
<p> </p>