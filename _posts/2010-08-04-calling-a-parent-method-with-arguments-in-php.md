---
layout: post
title: "Calling a parent method with arguments in PHP"
custom_v2_id: 211
---

<p>For testing purpose I just needed to overwrite an existing class to add some more logic to some methods before returning a call to its parent method.</p>
<p>I needed to do that in a test case to save in an inner variable the result so I can clean up my mess after each test ran.</p>
<p>The key is calling <code>call_user_func_array</code> with the right syntax. It seems that some version of PHP prior to 5.3 choke (like in segmentation fault) if an alternate syntax is given.</p>
<p>Here is what worked for me :</p>
<pre><code lang="php">class TestDocument extends Document {<br />    function foo() {<br />        return $this-&gt;fooResult= call_user_func_array(array('parent', 'foo'), func_get_args());<br />    }<br />}<br /></code></pre>
<p> </p>