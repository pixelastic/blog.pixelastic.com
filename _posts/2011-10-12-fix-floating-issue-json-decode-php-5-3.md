---
layout: post
title: "Fix the floating issue with json_decode in PHP 5.3"
custom_v2_id: 321
---

<p>When dealing with online API that are handling a lot of items (like Twitter or Facebook), you'd better be aware of a PHP limitation with <code>json_decode</code>.</p>
<p><code>json_decode</code> is supposed to take a JSON string and return a PHP array or a PHP object from it.</p>
<p>Unfortunatly if one of the key is an int and is bigger than the max int value, it will be cast as float instead. And you'll lose precision in the process.</p>
<p>In my case it resulted in a complete unability to find a user in the database as the id didn't match anything. This was quite hard to find as I couldn't reproduce it on my local machine.</p>
<h4>Know your system</h4>
<p>My local system was a 64bits machine while the production servers were 32bits. And of course, max int precision is far bigger on 64bits machines so the error didn't pop in my tests.</p>
<p>If you're running PHP 5.4, the fix is easy. Just add the <code>JSON_BIGINT_AS_STRING</code> bitmask as 4th option like this</p>
<pre><code lang="php">$decoded = json_decode($encoded, true, null, JSON_BIGINT_AS_STRING);</code></pre>
<p>If you're running a 32bits machine with PHP 5.3 like me, it's a little more tricky.</p>
<h4>The regexp</h4>
<p>My solution is to parse the original JSON string and add quotes around ints so <code>json_decode</code> will keep them as string.</p>
<p>My first attempt was naive</p>
<pre><code lang="php">preg_replace('/":([0-9]+),/', '":$1,', $encoded)</code></pre>
<p>This will find any int between <code>":</code> (marking the end of a key) and <code>,</code> (marking the start of the next key), and replace it with the same string but enclosed in quotes.</p>
<p>I soon found out that this did not cover all the cases, especially if the int key was the last of the JSON, it won't be followed by a <code>,</code> but by a <code>}</code> instead.</p>
<p>So, I adapted it a little bit :</p>
<pre><code lang="php">preg_replace('/":([0-9]+)(,|})/', '":"$1"$2', $encoded)</code></pre>
<p>Ok, it worked better. Any int key in the JSON, anywhere will be enclosed in quotes.</p>
<p>It was a little overkill so I decided to limit it to keys of at least 10 digits</p>
<pre><code lang="php">preg_replace('/":([0-9]{10,})(,|})/', '":"$1"$2', $encoded)</code></pre>
<p>Better. But still not perfect.</p>
<p>As I soon discovered, sometimes Facebook returned JSON containing JSON itself (in Request <code>data </code>or Credit <code>order_info</code> for example).</p>
<p>The previous approach would add quotes around ints in JSON escaped string and would thus corrupt the whole key.</p>
<p>This time, I added a final touch. I only added quotes around int that were not in an escaped JSON string themselves, by checking that the closing quote of the key wasn't escaped.</p>
<pre><code lang="php">preg_replace('/([^\\\])":([0-9]{10,})(,|})/', '$1":"$2"$3', $encoded)</code></pre>
<p>Here it is, the final fix. I might have forgotten some corner cases, but at least it works for my current application.</p>
<p>Hope it helps !</p>
<br />