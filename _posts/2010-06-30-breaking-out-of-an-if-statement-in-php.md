---
layout: post
title: "Breaking out of an if statement in PHP"
custom_v2_id: 189
---

<p>One pattern I use when writing new method is to put conditions that may end the script early on top. Like "stop the method if the arguments are not right" or "stop the action if the user is not loggued in".</p>
<p>It allow me to avoid having nested <code>if</code>/<code>else </code>statement that became unreadable.</p>
<p>Felix from Debuggable wrote <a title="Return home early" href="http://debuggable.com/posts/programming-psychology-return-home-early:4811de9f-ae28-49c2-a7dc-2f154834cda3" target="_blank">something about that a while ago.</a></p>
<p>This is a pretty easy pattern to follow when writing methods, but can be quite harder to achieve if you need to stick inside a main method. You just want to go "out" of the <code>if</code> statement, to continue the script, but not end the method.</p>
<h4>Break to the rescue</h4>
<p>You can't use the <code>break </code>keyword in an <code>if</code> statement like you would in a loop. It just throws an error.</p>
<p>But, you can define a simple <code>do {} while (false)</code> loop and use the break goodness inside it.</p>
<pre><code lang="php">do {<br />	if (empty($data)) break;<br />                  <br />	$this-&gt;create($data);<br />                    <br />	if (!$this-&gt;validates()) break;<br />                    <br />	$this-&gt;save();<br />} while (false);<br /></code></pre>
<p>This helped me some times, hope it can help someone else.</p>