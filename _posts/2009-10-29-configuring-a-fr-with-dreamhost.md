---
layout: post
title: "Configuring a .fr with Dreamhost"
custom_v2_id: 24
---

<p>Hosting a website on a .fr is a little harder than a simple .com. The <a href="http://www.afnic.fr/">Afnic</a> (registry for the .fr domains) makes a check whenever you change the DNS of your domain to make sure the new DNS can accept the domain.</p>
<p>They run a tool named <a href="http://www.zonecheck.fr/">ZoneCheck</a> to do that. This tool will request the new DNS server to test if they can accept the .fr. The problem is that they make a request on the port 53, which is not open on Dreamhost and thus the test fail and the Afnic refuse to let you change your DNS.</p>
<p>The alternative is to not change you DNS, and keep the default one of your registrar, but manually edit the zones and copy the zones defined in your dreamhost panel (In Domains &gt; Your domain &gt; DNS, at the bottom of the page) into your zones.</p>
<p>The most important part is modifying the default <code>A</code> entry to the IP of your dreamhost server. You should do the same for the <code>www A </code>entry to.<br />Create a <code>mysql A </code>entry and a <code>ftp A</code> entry if you want to use both <code>ftp.domain.com</code> and <code>mysql.domain.com</code>.</p>
<p>I also changed the MX record to the google one, as well as creating a CNAME webmail.</p>