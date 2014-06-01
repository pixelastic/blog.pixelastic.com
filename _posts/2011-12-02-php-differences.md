---
layout: post
title: "PHP AND / OR differences with && / ||"
custom_v2_id: 328
---

<p>Just found this weird little behavior of PHP today :</p>
<pre><code lang="php">$a = false;<br />$b = true;<br />$c = $a OR $b;<br />$d = ($a OR $b);<br />var_dump(compact('a', 'b', 'c', 'd'));<br />array(4) {<br />	["a"]=&gt;    bool(false)<br />	["b"]=&gt;    bool(true)<br />	["c"]=&gt;    bool(false)<br />	["d"]=&gt;    bool(true)<br />}</code></pre>
<p><code>$a OR $b</code> in fact returns <code>$a</code>, while <code>($a OR $b)</code> returns the result of the parenthesis. On the other hand, <code>$a || $b</code> correctly returns the result of the expression.</p>
<p>It seems that <code>AND </code>and <code>OR </code>are weak compared to <code>&amp;&amp;</code> and <code>||</code>.</p>
<p>Be aware of that, or it might backfire on you. Or just discard all <code>AND </code>/ <code>OR </code>in favor of <code>&amp;&amp;</code> /<code> ||</code></p>