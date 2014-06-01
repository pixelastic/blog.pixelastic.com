---
layout: post
title: "Text emboss in CSS"
custom_v2_id: 222
---

<p>I know only two <em>unperfect </em>ways of displaying an emboss text in CSS. As we can't use inset shadows with <code>text-shadow</code>, unlike <code>box-shadow</code>, we have to resort to other hacky ways.</p>
<p>Let me show you what can be done.</p>
<h4>Simulate it with an optical illusion</h4>
<p>Instead of creating a real inner shadow, you can just create an optical illusion by adding the correct shadow to make the viewer believe your text is embossed.</p>
<p>If you have dark text, just add a subtle white shadow at the bottom, while if you have light text, just add a subtle black one at the top.</p>
<pre><code lang="html">&lt;a class="emboss light"&gt;Lorem ipsum&lt;/a&gt;<br />&lt;a class="emboss dark"&gt;Lorem ipsum&lt;/a&gt;<br /></code></pre>
<pre><code lang="css">.emboss { font-size:1.2em; padding:50px; font-weight:bold; background:#0A539C; display:block; }<br />.light { color:#FFFFFF; text-shadow:0px -1px 0px rgba(0,0,0,0.9); }<br />.dark { color:#000000; text-shadow:0px 1px 0px rgba(255,255,255,0.1); }<br /></code></pre>
<p>I added an <code>emboss </code>class to more easily spot the effect, but the important code is in the <code>light </code>and <code>dark </code>rules.</p>
<h4>Add an almost transparent layer</h4>
<p>For this second solution we will simply add a second layer with the exact same text above the first text. Just slightly moving it and making it partly transparent.</p>
<p>You could add twice your element in your markup, but that would be bad for accesibility as well as SEO, so we'll instead use the <code>:before</code> pseudo-class.</p>
<p>We can set the <code>:before</code> content using the <code>content:</code> property, and we can also use the<code> attr()</code> method to get the content of one of our element's attributes. We just need to put the exact same text in one of our attributes and we're good to go.</p>
<p>This can be easily done with a link and its <code>title </code>attribute.</p>
<pre><code lang="html">&lt;a class="emboss lightAgain" title="Lorem ipsum"&gt;Lorem ipsum&lt;/a&gt;<br />&lt;a class="emboss darkAgain" title="Lorem ipsum"&gt;Lorem ipsum&lt;/a&gt;<br /></code></pre>
<pre><code lang="css">.lightAgain { color:#FFFFFF; position:relative; }<br />.lightAgain:before {<br />    content: attr(title);<br />    position:absolute;<br />    color:rgba(0,0,0,0.1);<br />    top:-1px;<br />    left:-1px;<br />    padding:50px;<br />}<br />.darkAgain { color:#000000; position:relative; }<br />.darkAgain:before {<br />    content: attr(title);<br />    position:absolute;<br />    color:rgba(255,255,255,0.1);<br />    top:1px;<br />    left:1px;<br />    padding:50px;<br />}<br /></code></pre>
<p>The effect is much better with this technique but it also has it share of drawback :</p>
<ul>
<li>You have to write your content twice, once in the element and once in an attribute</li>
<li>You have to copy all your <code>padding </code>rules in the <code>:before </code>element or it won't get correctly positionned</li>
<li>You can't select the text with this effect</li>
</ul>
<p>Hope those two little techniques helped someone, anyway.</p>