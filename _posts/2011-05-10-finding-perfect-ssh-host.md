---
layout: post
title: "Finding the perfect SSH host"
custom_v2_id: 279
---

<p>I'm trying to find a company providing hosting capabilities. I have a strong set of pre-requisites.</p>
<h4>Connected through SSH</h4>
<p>I want the server to be accessible through SSH. I don't need http nor ftp acces on it.</p>
<p>I'll host git, mercurial and subversion repositories on it, and will push(/pull) from(/to) them using ssh.</p>
<p>So, I will need those softs installed, or at least enough power to install them (even locally).</p>
<h4>Serving as an SSL tunnel</h4>
<p>I also want to be able to create an SSH tunnel through this server. That way I could be securely connected from any wifi connection using SSL.</p>
<p>The server should have a pretty reasonable bandwidth. I'd also wish to avoid having it hosted in France. Peering agreement between providers in France are getting uglier and uglier.</p>
<h4>Secondary accounts for holding websites</h4>
<p>If the same company also provides more conventional hosting, that also could be an important part of my choice.</p>
<p>What I would like is something as flexible as allowing some websites to use Apache, and others Lighttpd. Even being able to configure it per subdomain.</p>
<p>Some sites would be running PHP, others Rails, even node.js. I want enough freedom to configure it and the associated inner config (lighttpd.conf, php.ini).</p>
<p>I also want to be able to install secondary parts like mongoDB or memcache and having a full access to their configuration.</p>
<h4>Pricing</h4>
<p>Of course, the cheaper the better, but I know that such an amount of freedom and features comes with its own price.</p>
<p>Now, let's review some of the contestants I've picked</p>
<h3>Alwaysdata</h3>
<p>They were the first I <a href="http://www.alwaysdata.com/">checked</a>. I heard quite a good thing about their service and reliability. They really seem to know what they're doing.</p>
<p>I've tried their free 10Mo plan and am quite satisfied with it. Mercurial, git, subversion and quite a batch of others softs are already installed. They also have a pretty 10Mo/s awesome bandwith.</p>
<p>I haven't tried their hosting plans, but they also seems nice. All default (shared) hosting provides php, perl, ruby and python.</p>
<p>Their custom (managed dedicated server) provides almost anything you could want from lightty to memcache, but the price goes high with it to. 350€/month that is way too much I can afford for what I have in mind.</p>
<p>On the other hand, they not only provide hosting but the whole support package along with hotline and custom installation.</p>
<h3>Dreamhost</h3>
<p>I'm fond of Dreamhost. I've used them for years. They do provide a very nice shared hosting, with a lot of options to configure. They even allow cronjob for their admin panel.</p>
<p>And they are cheap, with a customer support very professional, I highly recommend them for your simple hosting needs.</p>
<p>I haven't tested their dedicated server version, so can't really talk about it.</p>
<p>However, the SSH capabilities of the shared hosting are quite small. They have git, svn and mercurial installed, but the version are quite outdated. Even the python version running mercurial was out of date.</p>
<p>You can however download and install them yourself on your account (which I did), but it is not as full featured as alwaysdata.</p>
<p>Their bandwith is also capped to 1Mo/s.</p>
<h3>OVH</h3>
<p>Haven't tested yet, but their <a href="https://www.ovh.com/fr/vps/">VPS offer</a> seems nice for as low as 60€/year.</p>
<p>I have tried the shared hosting offer of OVH before and am mitigated. On one hand I like some of their features like the automatic backup of your ftp files, on the other hand their administration panel is a total mess and accessing the server through SSH is not that simple.</p>
<p>I've heard they have a 10Mo/s bandwith. I'll try to get more information on this.</p>
<h3>Gandi</h3>
<p>Gandi is an amazing registrar (both technically and ethically). I've never had any issues with their service and can only praise their technical support.</p>
<p>Some years ago, they started doing hosting too. I tested it back then and was quite disapointed. This was horribly slow and crashed.</p>
<p>I never tried it again since then. I think they improved their service, and I just asked a test account. Their VPS offer is interesting, the server is pretty decent from what I can read and the price is still in my range (12€/month).</p>
<p> </p>
<p><em>I'll continue this review later, with more information. If you, reader, have any suggestion on a good host filling my need, feel free to post it in the comments, I'll review it.</em></p>