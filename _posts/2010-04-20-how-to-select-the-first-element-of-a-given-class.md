---
layout: post
title: "How to select the first element of a given class"
custom_v2_id: 80
---

<p>Imagine the following HTML code :</p>
<pre class="code"><code lang="html">&lt;div class="wrapper"&gt;<br />[... various HTML elements ...]<br />	&lt;div class="bar"&gt;bar&lt;/div&gt;<br />	&lt;div class="foo"&gt;foo&lt;/div&gt;<br />	&lt;div class="bar"&gt;bar&lt;/div&gt;<br />	&lt;div class="foo"&gt;foo&lt;/div&gt;<br />&lt;/div&gt;</code></pre> <p>How would one style the first <code>div.foo</code> ?</p>
<p>I've tried <code>div.wrapper div.foo:first-of-type</code> but unfortunatly it does not work. In fact the previous rule can be translated into "select the first child of div.wrapper only if it is a div.foo" and not "select the first div.foo inside div.wrapper" as I imagined.</p>
<p>Using jQuery I could do a <code>$('div.wrapper div.foo:first')</code> but there's no such selector in CSS.</p>