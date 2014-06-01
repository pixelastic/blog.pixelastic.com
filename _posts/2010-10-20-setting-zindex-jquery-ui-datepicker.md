---
layout: post
title: "Setting the z-index of a jQuery UI datepicker"
custom_v2_id: 234
---

<p>I ran into a collision issue with two of my absolutly positionned elements on a form page. I had an invisible flash buttun (used to launch an upload process) as well as jQuery UI datepicker.</p>
<p>The form was built in a way that when the datepicker was displayed, it was supposed to be on top of the invisible Flash button. Unfortunatly the button was in fact "on top" of the datepicker, but being invisible you do not notice it until you click.</p>
<p>This resulted in an upload dialog popping up and many confused users.</p>
<h4>The fix</h4>
<p>The Flash <code>z-index</code> is fixed in my CSS (10), so I thought that adding a greater <code>z-index</code> to the jQuery UI datepicker in CSS would be enough.</p>
<p>It is not. The jQuery UI datepicker seems to automatically set the <code>z-index</code> to 1, whatever you specified.</p>
<p>I checked the <a title="jQuery UI datepicker page" href="http://jqueryui.com/demos/datepicker/" target="_blank">datepicker options</a>, looking for a <code>zIndex</code> key, but found nothing...</p>
<p>I tried the <code>beforeShow </code>event, to manually set the <code>z-index</code>, but it seems that jQuery still update my value to 1 AFTER the event.</p>
<p>So I finally resorted to adding a small timeout to re-add my value after jQuery. This is a bit of a hack but given the context this is the only way I found.</p>
<pre><code lang="js">// Set the datepicker zIndex on load<br />element.datepicker({<br />[...]<br />	'beforeShow': function(input, datepicker) {<br />		setTimeout(function() {<br />			$(datepicker.dpDiv).css('zIndex', 100);<br />		}, 500);<br />	},<br />[...]<br />});<br /></code></pre><p> </p>