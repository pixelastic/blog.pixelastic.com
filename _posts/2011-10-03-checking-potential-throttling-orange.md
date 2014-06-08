---
layout: post
title: "Checking potential throttling from Orange"
custom_v2_id: 316
tags: ssh, softlayer, orange
---

Starting a few weeks back, we started having painfully slow ssh connections at
work. Our servers are hosted on the [SoftLayer
](http://www.softlayer.com/)infrastructure, which are extended on all North
American territory, but we are based in France.

We have fiber-optic connection here, almost every other connection is
blazingly fast. Except connections to our own servers...

Call me paranoid, but the first idea we got was that we were being throttled
by our provider. Orange is infamously known for degrading on purpose
connection with some know hosts.

A colleague was browsing through his own secure tunnel, going through his
personnal server for every outgoing communication.

And his connection was as fast as it should be.

That made us wonder. How a tunneled connection could be faster than a normal
one ? The cost of crypting data should have slow the request down. It had the
opposite effect, rendering the request in the expected time.

I created a garbage file using the following code and used `scp` to send it
from one server to another, to test bandwith.


```sh
dd if=/dev/zero of=garbage.bin bs=100000000 count=1
```

Nothing interesting came out of it. I had a impressivly fast connection
between our fiber connection and OVH (up to 50Mb/s) and slow connection to
SoftLayer.

So, for the time being, I'm connecting to SoftLayer through OVH and even if it
made me use one more tunnel, it is still far more fast than a direct
connection.
