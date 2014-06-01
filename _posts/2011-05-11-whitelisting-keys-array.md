---
layout: post
title: "Whitelisting keys of an array"
custom_v2_id: 280
---

<p>I needed to validate an array create from POSTed data. I wanted to discard all keys from this array that I didn't want.</p>
<p>Actually, I wanted to whitelist the array, and only keep keys that were on my whitelist.</p>
<p>Here is the litte snippet that does it :</p>
<pre><code lang="php">/**<br />*    Keep only specified keys of the specified array. This is useful to whitelist an array of parameters.<br />*    \param    $array        Original array<br />*    \param    $whitelist        Array of keys to keep.<br />**/<br />function array_whitelist($array, $whitelist = array()) {<br />	return array_intersect_key($array, array_flip($whitelist));<br />}</code></pre>
<p> </p>