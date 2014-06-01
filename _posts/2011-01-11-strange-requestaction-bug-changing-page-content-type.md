---
layout: post
title: "Strange requestAction bug changing the page Content-Type"
custom_v2_id: 257
---

<p>Today, I thought my current project was finished. But I had this bug report in my tracker from one of the beta-tester telling me that one of the page wasn't rendered properly.</p>
<p>It says that the code source was displayed on screen instead of being rendered as HTML. And only on Firefox.</p>
<p>And if that wasn't odd enough, even with the plethora of Firefox versions I got, I couldn't reproduce the bug on my side.</p>
<h4>Turning off the debugger to debug</h4>
<p>Then I had an idea. I turned off the debug mode, and was then able to reproduce the infamous bug.</p>
<p>As I initially supposed, there was something wrong with the <code>Content-Type</code> header. The Firebug Net Panel told me that it was set as <code>text/plain</code> while the developer toolbar insisted that it was <code>text/html</code>.</p>
<p>After some digging in my own code, I found the culprit. A <code>requestAction()</code> call I made as part of an update process. This <code>requestAction </code>was targeted at a <code>.txt</code> file.</p>
<p>I played a little with the debug value and found that for any value above 2, everything was working correctly, but if I set my value below that threshold, my whole view will get displayed as <code>text/plain</code>.</p>
<p>I couldn't quite explain why a debug value will have anything to with the view rendering. I even disabled the Debug Kit component, just to be sure.</p>
<h4>Digging into cake world</h4>
<p>And then I decided to follow the dispatch trace to find where the debug value was being used. After a long journey, I got to the <code>respondAs </code>method of the <code>RequestHandler </code>component.</p>
<p>And specifically, to that part :</p>
<pre><code lang="php">if (Configure::read() &lt; 2 &amp;&amp; !defined('CAKEPHP_SHELL')) {<br />	$this-&gt;_header($header);<br />}</code></pre>
<p>Ok, so there was my debug value. Exactly the code reponsible for my symptoms. Well, I still don't understand WHY someone wanted to add an header based on the debug value, but I could easily understand HOW it made my view that ugly.</p>
<p>The <code>requestAction </code>was being dispatched all along the way to its final action, firing the <code>RequestHandler </code>component on its way. Its extension being <code>.txt</code>, <code>RequestHandler </code>will fire its <code>respondAs</code> method and set the appropriate header.</p>
<p>Unfortunatly, setting such an header in a <code>requestAction </code>wasn't useful for the request, and additionnaly, it was messing with the primary view dispatch path.</p>
<h4>Solution</h4>
<p>I<a href="http://cakephp.lighthouseapp.com/projects/42648-cakephp/tickets/1445-requestaction-may-change-the-current-layout-depending-on-debug-value" target="_blank"> reported the bug</a> hoping for a fix in a future version. For the time being, I manually set the debug to 2 before calling my <code>requestAction</code>, and set it back to its previous value after in my app.</p>
<p>And for why it was only buggy on Firefox, it was caused by a double header definition. A first header was telling <code>text/plain</code> and a second one<code> text/html</code>. I guess Firefox uses the first one while other browsers the last. This is what made Firebug and the Developer Toolbar return different results too.</p>
<br />