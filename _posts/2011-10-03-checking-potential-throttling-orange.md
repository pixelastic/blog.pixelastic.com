---
layout: post
title: "Checking potential throttling from Orange"
custom_v2_id: 316
---

<p>Starting a few weeks back, we started having painfully slow ssh connections at work. Our servers are hosted on the <a href="http://www.softlayer.com/">SoftLayer </a>infrastructure, which are extended on all North American territory, but we are based in France.</p>
<p>We have fiber-optic connection here, almost every other connection is blazingly fast. Except connections to our own servers...</p>
<p>Call me paranoid, but the first idea we got was that we were being throttled by our provider. Orange is infamously known for degrading on purpose connection with some know hosts.</p>
<p>A colleague was browsing through his own secure tunnel, going through his personnal server for every outgoing communication.</p>
<p>And his connection was as fast as it should be.</p>
<p>That made us wonder. How a tunneled connection could be faster than a normal one ? The cost of crypting data should have slow the request down. It had the opposite effect, rendering the request in the expected time.</p>
<p>I created a garbage file using the following code and used <code>scp</code> to send it from one server to another, to test bandwith.</p>
<pre><code lang="sh">dd if=/dev/zero of=garbage.bin bs=100000000 count=1</code></pre>
<p>Nothing interesting came out of it. I had a impressivly fast connection between our fiber connection and OVH (up to 50Mb/s) and slow connection to SoftLayer.</p>
<p>So, for the time being, I'm connecting to SoftLayer through OVH and even if it made me use one more tunnel, it is still far more fast than a direct connection.</p>