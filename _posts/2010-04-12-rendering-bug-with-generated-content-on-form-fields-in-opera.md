---
layout: post
title: "Rendering bug with generated content on form fields in Opera"
custom_v2_id: 73
---

<p>If you try the following code in Opera 10.51, you'll have some weird rendering bug :</p>
<pre lang="html"><code lang="html">&lt;style&gt;<br />	.test:after {<br />		content:"This should be on red background";<br />		background:red;<br />	}<br /> &lt;/style&gt;<br /> Text input : &lt;input type="text" value="I'm unstyled" class="test" /&gt;</code></pre>
<p>The generated content is added to the page, but the background color isn't rendered. Worse, the input lose all styling, it does not have a background color nor borders anymore.</p>
<p>The same effect also apply to every <code>input </code>(<code>radio</code>, <code>checkbox </code>and <code>password</code>).</p>
<p>On a <code>select</code> tag, the generated content correctly have it's background color, but still lose all styling.</p>
<p>On a <code>textarea</code>, the styling is gone too, and the background color is here. Well, sort of, it is actually cropped after a while and the end of the text is on transparent background.</p>
<p>I sent a bug report to Opera about that.</p>
<p style="text-align: center;"><img src="files/2010/04/12/4bc2f9103d4c2.jpg" alt="Opera, input  generated content bug" width="580" height="204" /></p>