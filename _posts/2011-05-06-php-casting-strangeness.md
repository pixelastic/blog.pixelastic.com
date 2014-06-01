---
layout: post
title: "Another PHP casting weirdness"
custom_v2_id: 277
---

<p>Second weird PHP behavior behavior of the day :</p>
<pre><code lang="php">$foo = false;<br />echo $foo['bar']; // Ouptuts nothing, but doesn't throw an error either</code></pre>
<p>Strange. I try to read an undefined index (<code>false </code>is not an array), but PHP doesn't complain. That's weird.</p>
<pre><code lang="php">$foo = true;<br />echo $foo['bar']; // Throws an error</code></pre>
<p>This time, PHP tells me that the index is not defined and throws an error. Wait, what ?</p>
<p>Apparently, this is the intended behavior, but it does seem a bit strange...</p>