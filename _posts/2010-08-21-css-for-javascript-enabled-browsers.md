---
layout: post
title: "CSS for Javascript enabled browsers"
custom_v2_id: 224
---

<p>In a previous post I was wondering if my way of loading js-specific CSS rules was right. I was loading a specific css file for js overrides.</p>
<p>This allow for lighter stylesheets for users without Javascript (they won't load useless rules), but also resulted in slower rendering for other users because they needed to load two stylesheets instead of one.</p>
<p>After much pondering, I now think that loading all the rules in one stylesheet is the way to go.</p>
<p>In addition with the number of request mentionned, keeping all your rules in the same file is much more easier to maintain. Js-specific rules aren't that big either so the small additional bytes are usually better than a full http request.</p>
<p>I now prefix all my Javascript rules by <code>.js</code>. I add a <code>js</code> class to the <code>html </code>element directly from the <code>head</code>, this helps in preventing any FOUC that may occur because we add the class before the <code>body</code> rendering.</p>
<pre><code lang="html">&lt;head&gt;<br />    &lt;script&gt;document.documentElement.className+=' js';&lt;/script&gt;<br />&lt;/head&gt;<br /></code></pre>
<p> </p>