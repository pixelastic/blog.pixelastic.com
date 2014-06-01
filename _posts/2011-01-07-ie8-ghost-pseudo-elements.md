---
layout: post
title: "IE8 ghost :after and :before pseudo elements"
custom_v2_id: 255
---

<p>IE8 has a strange bug (<em>what bugs aren't strange in IE ?</em>) when dealing with <code>:after</code> and <code>:before</code> pseudo-elements.</p>
<p>I was adding a nice looking arrow after one of my elements using <code>:after</code>. I wanted this arrow to only display when my element was hovered, so I wrote the following code :</p>
<pre><code lang="html">&lt;a href="#"&gt;Example&lt;/a&gt;</code></pre>
<pre><code lang="css">a {<br />	position:relative;<br />	display:block; <br />	height:30px;<br />}<br />a:after {<br />	position:absolute;<br />	content:"";<br />	top:0px; <br />	right:-15px;<br />	width:15px;<br />	height:30px;<br />	background:url(arrow.gif) top left no-repeat; <br />	display:none;<br />}<br />a:hover:after {<br />	display:block;<br />}</code></pre>
<p>As you can see, nothing too fancy. I positionned my arrow using an empty <code>:after</code> element and a <code>background </code>image. I defaulted the arrow to hidden, and only show it when hovering the element.</p>
<h4>IE in action</h4>
<p>It does work pretty well in moder browsers. It also seems to work on IE8. When you hover the element in IE8, the arrow gets displayed. But it does not gets hidden when you stop hovering it.</p>
<p>There's a kind of ghost element that keeps getting displayed. It gets removed if you directly mouse it, or scroll your page, or alt-tab, etc. This clearly is a display artefact.</p>
<p>To counter this I had to write it in an other fashion (less readable in my opinion). Removing the default <code>a:after</code> rule and adding all properties to <code>a:hover:after</code> :</p>
<pre><code lang="css">a {<br />	position:relative;<br />	display:block;<br />	height:30px;<br />}<br />a:hover:after {<br />	position:absolute;<br />	content:"";<br />	top:0px;<br />	right:-15px;<br />	width:15px;<br />	height:30px;<br />	background:url(arrow.gif) top left no-repeat;<br />	display:block;<br />}<br /></code></pre>
<h4>Update</h4>
<p>It should be noted that more generally, I gets confused and create ghost elements and styling when we try to update the <code>:after</code>/<code>:before</code> properties based on a rule selecting its parent.</p>
<p>There seems to have a little lag/delay before the properties gets applied, and most of the time they do not.</p>