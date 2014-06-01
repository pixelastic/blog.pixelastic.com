---
layout: post
title: "Testing Facebook Credits in a local environment"
custom_v2_id: 300
---

<p>Testing Facebook API has always been a pain for me. Their documentation is still crappy and examples are wrong or/and outdated. Things don't exactly work the same way when you're testing with "Test account" or real accounts.</p>
<p>One of the things that helped me much was to create a test application and set its canvas url to a local server. As the iframe call is done through the client, I can test local code without the need to upload stuff to an online server.</p>
<p>I could even test Requests and Streams through this method as it's the Javascript SDK that does all the AJAX calls. The only tiny issue was with Stream images as Facebook requests them server-side before displaying them, I had to put some placeholder images online.</p>
<p>But today, with the testing of the new Facebook Credits API, new horizon of pains arised. Facebook will make no less than three calls to one of my server callback url, but does not make them client-side.</p>
<p>I still don't want to upload my code to a debug server just to test this feature, so I decided to put in place a little IP/port forwarding. Thanks to tips from my colleague <a href="http://leo-peltier.fr/" target="_blank">Léo</a>, this was done in a matter of minutes.</p>
<h4>Setting up the DNS/port forwarding</h4>
<p>First, we'll need a url that Facebook will call. I want this url to point to my local server. So all I had to do was to create a simple DNS redirect at dyndns.com that point to my local IP.</p>
<p>Let it be http://customname.dyndns-office.com/</p>
<p>Paste this url in the "callback url" field of your Facebook Credits config page.</p>
<p>Then, I'll assign a fixed internal IP to my computer so that it won't change on each reboot. My router can do that just fine, by assigning a fixed internal IP based on the MAC adress.</p>
<p>Let it be 192.168.0.51</p>
<p>Now, we'll redirect every call on the router through port 80 (http) to that url. My router admin panel can also do that just fine, in its DHCP configuration.</p>
<p>Finally, we'll have to update the server virtualhost config to point all incoming requests matching <code>customname.dyndns-office.com</code> to the server files.</p>
<h4>A side note</h4>
<p>There is one last little gotcha to be aware of.</p>
<p>It does not seem to be possible to access one of your network computer from an external IP (as we just configured) FROM one of your network computer.</p>
<p>In other words, if you would like to test your config, do not type <code>http://customname.dyndns-office.com/</code> in your browser on one of the computers sharing the same network as 192.168.0.51.</p>
<p>Instead, use a free wifi connection, a ssh tunnel or curl from an external server you own.</p>
<p>In my case, locally testing <code>http://customname.dyndns-office.com/</code> always brought me to my router admin panel and did not forward the port correctly. Doing a <code>curl http://customname.dyndns-office.com/</code> from one of my online servers correctly returned what I wanted.</p>
<h4>Back to Facebook</h4>
<p>Back to our Facebook example, you still won't be able to see any outputs from the calls Facebook is making to your app. Your best bet is to have a logging system that will write on disk or in the DB so your can track the calls.</p>
<p>Also note that you have to load the page in the iframe canvas, even for your tests. You can't simply load an html page and call <code>FB.ui({method:"pay"})</code>, this will result in error 1151. Always load in the whole FB page.</p>