---
layout: post
title: "Opera bug : border-radius and background-color on an input"
custom_v2_id: 178
---

<p>The form inputs of this site all have a border-radius and a background-color. Unfortunatly, the latest Opera version just don't like that (9.5 works like a charm).</p>
<p>When you apply the following rules to an input element, Opera will discard your background color and render it as transparent instead.</p>
<pre><code lang="css">input {<br />    border-radius:5px;<br />    border:none;<br />    background:#375a5e;<br />}</code></pre>
<p>All three rules causes the bug. Remove one of them and the bug disappear.</p>
<h4>Solution</h4>
<p>At first I thought that I could just as well remove the border-radius rule and I won't have any more bugs. But a slightly decreased user experience for my Opera readers.</p>
<p>Then I'll try to come up with a better solution. One can add a background-image instead of a background-color. Odd enough, this won't trigger the bug.</p>
<p>But I wanted to avoid that, that's one more useless request to the server and it's far more easier to change a color code in a css file that to edit an image file.</p>
<p>The solution I choose was to not set a <code>border:none;</code> but to simulate it by adding invisible border. That would add 1px around the input element, so we'll limit it by only adding the border on one of the sides. Adding it on the right side seemed to be the more convenient method.</p>
<p>So here's my updated code :</p>
<pre><code lang="css">input {<br />	border-radius:5px;<br />	border:none;<br />	border-right:1px solid rgba(0,0,0,0);<br />	background:#375a5e;<br />}</code></pre>
<p> </p>