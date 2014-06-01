---
layout: post
title: "Selecting checked radio button with jQuery and IE8"
custom_v2_id: 310
---

<p>Ever tried to select the checked <code>radio </code>button of a form using jQuery ? Well I did, and hundreds of time before, and never ran into any issues.</p>
<p>Today's the first time, and it involves my dear friend IE8. Seems like either jQuery or IE8 had trouble with my <code>radio</code> button selection.</p>
<p>I finally managed to get what I wanted but with a sightly different syntax for IE8.</p>
<h4>First, the markup</h4>
<pre><code lang="html">    &lt;form id="myForm"&gt;
      &lt;input name="data[Payment][value]" id="payment_1500" type="radio" value="1500" /&gt;
      &lt;label for="payment_1500"&gt;1500&lt;/label&gt;&lt;br /&gt;
      
      &lt;input name="data[Payment][value]" id="payment_2000" type="radio" value="2000" /&gt;
      &lt;label for="payment_2000"&gt;2000&lt;/label&gt;&lt;br /&gt;
      
      &lt;input name="data[Payment][value]" id="payment_5000" type="radio" value="5000" /&gt;
      &lt;label for="payment_5000"&gt;5000&lt;/label&gt;&lt;br /&gt;
      
      &lt;button id="test"&gt;Select&lt;/button&gt;
  &lt;/form&gt;
</code></pre>
<p>Pretty simple, isn't it ? I only have three <code>radio </code>buttons, and I would like to get the selected value when pressing the Select <code>button</code>.</p>
<h4>What should work everywhere</h4>
<p>The following code is pretty straightforward and I expected it to just work.</p>
<pre><code lang="js"><p>var selected1 = $('#myForm input[name="data\\[Payment\\]\\[value\\]"]:checked');<br />var value1 = selected1.val();<br />console.log(value1);</p></code></pre>
<p>Note that we have to double escape the <code>[</code> and <code>]</code> characters and wrap in quotes the <code>name </code>value. Nothing fancy, just classic string protection. This code works perfectly on Firefox and Chrome, and I deployed it in production for a few weeks.</p>
<p>Then, I got report of users that would have love to use the form, but got an error because no value was selected. I tested and tested it again without finding the cause. Then it occurs to me that all those reports came from user using IE8.</p>
<p>So I rebooted my VM, launched IE8 and was able to reproduce the bug on my first try.</p>
<h4>What the heck is IE8 doing ?</h4>
<p>Well, that's a deep question, and I've ask this myself countless times before. Once more, IE is doing things in its own weird way.</p>
<p>After some fiddling, I managed to make it work, by just slightly altering the syntax.</p>
<pre><code lang="js"><p>var selected2 = $('#myForm input[name="data\\[Payment\\]\\[value\\]"]').filter(':checked');<br />var value2 = selected2.val();<br />console.log(value2); </p></code></pre>
<p>Yep, that's right, I simply moved the <code>:checked</code> selector in its own <code>filter </code>call and it worked. Took me a while to figure, but this finally turned out to be an easy fix.</p>
<p>You can test it yourself with <a title="Testing IE8 bug with jsFiddle" href="http://jsfiddle.net/pixelastic/WS53Q/1/" target="_blank">this jsFiddle example</a>. Don't forget to enable the log panel in IE8 by pressing F12 before running the code.</p>