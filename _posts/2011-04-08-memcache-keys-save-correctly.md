---
layout: post
title: "Memcache keys not getting saved correctly"
custom_v2_id: 272
---

<p><em>Update : We were initially blaming Memcache not correctly setting/getting keys. We should instead have blamed him for being over-zealous in clearing its list. See bottom of post for details.</em></p>
<p>Today we were having a bit of an issue with memcache. We had to write a thousand keys into it, reading them from a JSON file.</p>
<p>This code had been running happily on our server for the past two weeks. But as the number of keys increased, we came to spot that some keys seemed to be randomly cleared.</p>
<p>After further investigation (and a lot of hours), it appears that the keys were simply not set at all, or set to an empty/false value. This was really strange because it occured inside a loop on our JSON file, and never occurs for the same keys, nor everytime.</p>
<p>We took our server under high stress, forcing it to reload data very often, to trigger the bug once more. After a lot of test, we gather some more data, but nothing really came out. The missed keys were really random.</p>
<p>Finally, we decided to code a fast and dirty fix, until we found a better solution. Basically, we simply checks that the value is correctly saved after saving it, and if not, we retry. And we do so recursively.</p>
<pre><code lang="php">function set($key, $val, $recursionLevel = 0) {<br />	Cache::write($key, $val);<br />	if (Cache::read($key)===false) {<br />		if ($recursionLevel&gt;10) die('Possible infinite recursion);<br />		$this-&gt;set($key, $val, $recursionLevel);<br />	}<br />}</code></pre>
<p>Note, that this will not work if one of your values is defined as false, otherwise you'll end up in an infinite loop.</p>
<h4>Update</h4>
<p>Well, the problem kept sporadically popping. And we finally found the REAL culprit.</p>
<p>Cake provides multiple <code>Cache </code>config, using different settings. One would use a special config to set different cache duration. Each setting would use a different key prefix.</p>
<p>Unfortunatly, memcache has no way of finding keys starting with a special prefix. So when we do a <code>Cache::clear()</code>, it just wipes clear the whole memcache keys, no matter what config you specify.</p>
<p>We were running two different websites using the same memcache server, and when doing a clear on one website, it cleared keys on the second one as well.</p>
<p>We finally started one memcache server per site.</p>