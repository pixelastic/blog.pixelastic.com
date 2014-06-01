---
layout: post
title: " swfobject.getObjectById() when flash not installed"
custom_v2_id: 322
---

<p>SWFObject is the de-facto library used whenever you need to ember Flash files in your code. It takes care of smoothing all cross browser issues.</p>
<p>It has a <code>getFlashPlayerVersion </code>method that return a string of the current version in the form <code>major.minor.release</code>. Its value is <code>0.0.0</code> if Flash isn't installed.</p>
<p>It also provides a cross browser markup, including conditionnal comments for IE, that validate and works everywhere. The downside is that it forces you to create two elements in your markup with the same id.</p>
<p>Hopefully, the <code>getObjectById </code>method is here to return the correct DOM element based on the browser flash integration type.</p>
<p>But... It seems that the mechanisme is buggy when Flash isn't installed (on 2.2)</p>
<p>I've tested running IE9 without Flash installed and FF8 with Flash disabled, and the return of <code>getObjectById </code>differs : I got <code>null </code>in IE9 and the DOM element in FF8.</p>
<p>I've added a small patch to my code to take it into account :</p>
<pre><code lang="js">var el = swfobject.getObjectById(id) || document.getElementById(id);</code></pre>
<p>And I've also submitted a <a href="http://code.google.com/p/swfobject/issues/detail?id=599&amp;thanks=599&amp;ts=1319792868">bug report</a>.</p>