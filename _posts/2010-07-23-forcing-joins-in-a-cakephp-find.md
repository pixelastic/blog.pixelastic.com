---
layout: post
title: "Forcing joins in a cakePHP find"
custom_v2_id: 199
---

<p>Today I had to setup a complex find relation. Here is the simplifed version of what I had :</p>
<pre><code lang="ini">TABLE timestamps<br />int id<br />datetime date<br />string type<br />int user_id<br /></code></pre><p>The type field only had two types of values : <code>START </code>and <code>END</code>. As you can guess, this was used to log the time users where using an application. Every time a user started using the app, a <code>START</code> record was created, and when he loggued out, an <code>END </code>record was created. So basically, the records where working as pairs.</p>
<p>I wanted to get a list of all records that could be easily displayed. I wanted to bind the timestamp model to itself, so that when querying all the start records, I'll automatically have the end ones as related models.</p>
<p>Here's how I did that :</p>
<pre><code lang="php">$this-&gt;find('all', array(<br />	'conditions' =&gt; array(<br />		'Timestamp.type' =&gt; 'START'<br />	),<br />	'joins' =&gt; array(<br />		array(<br />			'table' =&gt; 'timestamp',<br />			'alias' =&gt; 'EndTimestamp',<br />			'type' =&gt; 'LEFT',<br />			'conditions' =&gt; array(<br />				'EndTimestamp.type' =&gt; 'END',<br />				'EndTimestamp.user_id = Timestamp.user_id',<br />				'EndTimestamp.date &gt; Timestamp.date',<br />			)<br />		)<br />	),<br />	'order' =&gt; array(<br />		'Timestamp.date' =&gt; 'ASC'<br />	),<br />	'group' =&gt; 'Timestamp.date'<br />));<br /></code></pre><p>It will fetch all the start timestamp (<code>fields</code>) in chronological order (<code>order</code>). We will also define a custom join relation (<code>joins</code>). We set the table name and the alias we need, and set it as a <code>JOIN LEFT</code>.</p>
<p>Then we add the conditions : we want only the <code>END </code>records, that belongs to the same user, and that occurs after the <code>START </code>records. We also add a <code>group </code>key to make sure not to get twice the same result (or it will corrupt our results)</p>
<p>Note that the joins syntax needs to be wrapped in an unkeyed array. This is because you may need to add several joins.</p>
<p>I had never heard of this joins key before today, but it is quite handy, I guess I'll use it again.</p>