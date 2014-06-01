---
layout: post
title: "\"failed to import extension hgext.imerge\" warning on Dreamhost"
custom_v2_id: 162
---

<p>Trying to push some new code to a Hg repository on my Dreamhost account, I had the following error message :</p>
<pre><code lang="sh">remote: *** failed to import extension hgext.imerge: No module named imerge<br /></code></pre>
<p>I used to have the same kind of issues with an other extensions, <code>hgext/hbisect</code> a while ago and I fixed it by forcing Hg to not use this extension.</p>
<p>Here's how :</p>
<p>Edit your <code>.hgrc</code> file and under the <code>[extensions]</code> category, add <code>hgext.imerge=!</code>, like this</p>
<pre><code lang="ini">[extensions]<br />hgext/hbisect = !<br />hgext.imerge=!</code></pre>
<p>This should stop the warning.</p>