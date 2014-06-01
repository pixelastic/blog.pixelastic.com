---
layout: post
title: "missing data in jQuery Ajax event ajaxSuccess"
custom_v2_id: 70
---

<p>jQuery provides a nifty set of Ajax events that one could define to fire methods whenever an ajax request starts, stop, failed or succeed. It is quite useful actually, to display visual indicator once and for all without having to define the various callback on each ajax call.</p>
<p>But it has one flaw. The <code>ajaxSuccess </code>callback only give access to the <code>event</code>, <code>XMLHttpRequest </code>object and the option object. There is no direct way to get the return data from the call.</p>
<p>Well, you can still access it from the <code>XMLHttpRequest responseText</code> attribute but it is then your job to parse it according to its type, duplicating some of the code already called in the jQuery core.</p>
<p>You can use the <code>$.httpData</code> to directly parse it, giving the XHR as first argument and the data type as the second one.</p>
<pre><code lang="js">$('#ajaxIndicator').bind('ajaxSuccess', function(event, xhr, options) {<br />	var data = $.httpData(xhr, options.dataType);<br />}</code></pre>
<p> </p>