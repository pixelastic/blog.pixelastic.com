---
layout: post
title: "Creating dirs with correct chmod in PHP"
custom_v2_id: 209
---

<p>One trick I've been dragging with me on all this years of PHP programing is a little snippet to correctly create directories with the chmod I want.</p>
<p>By simply calling <code>mkdir('my_dir', 0777)</code> I used to often end up with directories that I can't write to nor delete, even if I was correctly setting the chmod.</p>
<p>The trick was to reset the mask (using <code>umask(0)</code>) before the <code>mkdir() </code>call and then reapplying the old mask after.</p>
<pre><code lang="php">$tmpUmask = umask(0);<br />mkdir('my_dir', 0777);<br />umask($tmpUmask);<br /></code></pre>
<p>I must admit that I've never really understand why it was working better than simply calling <code>mkdir()</code> but hey, it's been years that I'm using that now and I never run into access rights issues since.</p>