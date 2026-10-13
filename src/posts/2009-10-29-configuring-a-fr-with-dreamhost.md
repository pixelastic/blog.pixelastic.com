---
layout: post
title: "Configuring a .fr with Dreamhost"
custom_v2_id: 24
tags: zonecheck, gandi, dreamhost, afnic, fr
---

Hosting a website on a .fr is a little harder than a simple .com. The
[Afnic](http://www.afnic.fr/) (registry for the .fr domains) makes a check
whenever you change the DNS of your domain to make sure the new DNS can accept
the domain.

They run a tool named [ZoneCheck](http://www.zonecheck.fr/) to do that. This
tool will request the new DNS server to test if they can accept the .fr. The
problem is that they make a request on the port 53, which is not open on
Dreamhost and thus the test fail and the Afnic refuse to let you change your
DNS.

The alternative is to not change you DNS, and keep the default one of your
registrar, but manually edit the zones and copy the zones defined in your
dreamhost panel (In Domains > Your domain > DNS, at the bottom of the page)
into your zones.

The most important part is modifying the default `A` entry to the IP of your
dreamhost server. You should do the same for the `www A `entry to.

Create a `mysql A `entry and a `ftp A` entry if you want to use both
`ftp.domain.com` and `mysql.domain.com`.

I also changed the MX record to the google one, as well as creating a CNAME
webmail.