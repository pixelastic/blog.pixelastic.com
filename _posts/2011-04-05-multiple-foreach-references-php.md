---
layout: post
title: "Multiple foreach() with references in php"
custom_v2_id: 271
---

<p>It took me a couple of hours to debug : I had an array with values that shouldn't be here, values from another part of the application, and I couldn't figure out where that came from.</p>
<p>Well, it turns it was part of a documented feature of PHP :</p>
<blockquote cite="http://fr.php.net/manual/en/control-structures.foreach.php">
<p>Unless the array is referenced, foreach operates on a copy of the specified array and not the array itself. foreach has some side effects on the array pointer. Don't rely on the array pointer during or after the foreach without resetting it. Reference of a $value and the last array element remain even after the foreach loop. It is recommended to destroy it by unset().<cite class="author">php.net</cite></p>
</blockquote>
<p>My code was as simple as :</p>
<pre><code lang="php">$newArray = array();<br />$newArray2 = array();<br />foreach($list as $key =&gt; &amp;$data) {<br />	$newArray[] = $data;<br />}<br />foreach($list2 as $key =&gt; &amp;$data) {<br />	$newArray2[] = $data;<br />}</code></pre>
<p>This resulted in the latest index of <code>$newArray</code> being set to one of <code>$list2</code> values (didn't know exactly which). This is really counter intuitive.</p>