---
layout: post
title: "DNS caching and flushing"
custom_v2_id: 40
tags: dreamhost, gandi, cache, dns
---

Yesterday I moved this domain from one server to another on my Dreamhost
account (actually, I moved the whole domain from one Dreamhost account to
another, but that's the same).

The DNS saved at the registrar where the same (`ns1.dreamhost.com`,
`ns2.dreamhost.com` and `ns3.dreamhost.com`). The transfer went seamlessly and
I was able to access my website on the new server in an invisible way.

But, strangely, some hours laters I started to experience slow down when
accessing the website and finaly all my requests timed out, be it either from
Firefox or a direct ping.

I tried with my windows xp and my Ubuntu 8.04. I even change the DNS on xp to
use opendns, run an `ipconfig /flushdns`, rebooted. On Ubuntu I've done a
`/etc/init.d/dns-clean start`. I even rebooted my adsl box, thinking there was
something wrong with the DNS cache on my side.

I even contacted both Dreamhost and Gandi with a complete traceroute to know
if they could help me, as I thought having done everything that I could think
of to resolve the issue. They assure me that their configuration was fine and
the problem wasn't on their side.

When asking friends, or testing with
[http://downforeveryoneorjustme.com/](http://downforeveryoneorjustme.com/) it
occured that the problem really was on my side.

Everyone were true. The problem lied somewhere in between, in the DNS cache
hold by my ISP that wasn't correctly up to date. I don't really understand how
that could happen, I thought rebooting my Freebox would clear its cache, and
specifying dns addresses of opendns would bypass the dns resolve of my ISP but
it seems not to be the case.

Anyway, after waiting for some more hours, my website was again reachable
through `ssh `and `ftp`.

So, if you're sure your dns configuration is correct both on your register and
on your hosting service, make sure to clear every DNS cache you can have on
your own side. That include windows inner dns cache, those of your browser,
those of your router, and those of your specified preferred DNS resolving
server.

If all that failed, it should be caching issue with your ISP, and there is
nothing you can do about that, except waiting.