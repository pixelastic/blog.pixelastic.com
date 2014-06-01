---
layout: post
title: "Adding some logic in your MySQL"
custom_v2_id: 200
---

<p>I'm not an expert in SQL queries, I just know how to do simple queries and the more advanced options I've ever used are <code>DISTINCT</code>, <code>HAVING </code>and <code>GROUP BY</code>.</p>
<p>For the project I'm working on, I had to add some logic to my SQL queries, to concatenate various field and compare them.</p>
<p>Here is, as a reminder, how I've managed to I've managed to get the time spent by comparing two dates :</p>
<pre><code lang="ini">TIMESTAMPDIFF(SECOND, Timestamp.date, EndTimestamp.date) AS timeSpent</code></pre><p>And is practice is never as easy as theory, I didn't really had a timestamp but two string fields instead (one <code>date </code>and one <code>time</code>), so here's how I combined them</p>
<pre><code lang="ini">TIMESTAMPDIFF(SECOND, CONCAT(Timestamp.date, " ", Timestamp.time), CONCAT(Timestamp.date, " ", Timestamp.time)) AS timeSpent<br /></code></pre><p> </p>