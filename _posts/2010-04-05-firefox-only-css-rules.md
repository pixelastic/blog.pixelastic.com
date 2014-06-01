---
layout: post
title: "CSS rule to target only Firefox"
custom_v2_id: 68
---

<p>I just found (via <a href="http://enure.net/post/article/serve-css-to-only-firefox">enure.net</a>) a CSS rule using proprietary Mozilla filter that would allow one to specifically target Mozilla.</p>
<p>I'm not a huge fan of CSS hacks like that, I usually restrain them to the bare minimum of IE conditional comments. But in some edge cases, it is sometimes useful, if you really don't have other options.</p>
<p>I'd like to find the equivalent rules (using proprietary rules, no parser bug) for Safari, Chrome and Opera</p>
<pre style="margin-bottom: 24px;"><code lang="css">@-moz-document url-prefix() { <br />	p { color: red; }<br />}<br /></code></pre>