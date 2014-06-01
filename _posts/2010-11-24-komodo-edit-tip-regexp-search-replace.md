---
layout: post
title: "Komodo Edit Tip : Using regexp in search/replace"
custom_v2_id: 244
---

<p>Here's a little tip. As I started to use more and more often the regexp search and replace feature of Komodo Edit, I guessa quick blog note could be useful.</p>
<p>I had to "simplify" a big HTML file a while ago, and searching for useless tags and then replacing them using this feature saved me a lot of time.</p>
<p>Note that you can use <code>\n</code> and <code>\t</code> for new line and tabulation respectively.</p>
<p>I also had to change the order of attributes in all <code>&lt;img&gt;</code> tags (according to Google Page Speed, this is supposed to help the Gzip algorithm in compressing data).</p>
<p>I just had to search for</p>
<pre><code lang="html">&lt;img src="(.*)" width="(.*)" height="(.*)" alt="(.*)"&gt;</code></pre>
<p>and replace with</p>
<pre><code lang="html">&lt;img src="\1" alt="\4" height="\3" width="\2"&gt;</code></pre>
<p> </p>