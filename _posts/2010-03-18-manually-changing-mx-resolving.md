---
layout: post
title: "Manually changing MX and CNAME resolving for Gmail"
custom_v2_id: 59
---

<p>I don't usually change MX resolving, but when I do, it always almost is using my registrar or host admin panel.</p>
<p>When I have to manually do it, (because the website is hosted on a dedicated server where I have to manually edit almost everything), I always waste a lot of time understanding where to find the configuration files.</p>
<p>Today I had to change the MX record of an existing website to use those of Google. The server hosting the website was also defined as nameserver, so I had to update the <code>/var/named/domain.tld.hosts</code> file (the file may not be in the same directory in your own server).</p>
<p>I remove the line relative to the MX records and added those instead</p>
<pre lang="htaccess"><code lang="apache">domain.tld.    IN    MX    10 ASPMX.L.GOOGLE.COM.<br />domain.tld.    IN    MX    20 ALT1.ASPMX.L.GOOGLE.COM.<br />domain.tld.    IN    MX    20 ALT2.ASPMX.L.GOOGLE.COM.<br />domain.tld.    IN    MX    30 ASPMX2.L.GOOGLE.COM.<br />domain.tld.    IN    MX    30 ASPMX3.L.GOOGLE.COM.<br />domain.tld.    IN    MX    30 ASPMX4.L.GOOGLE.COM.<br />domain.tld.    IN    MX    30 ASPMX5.L.GOOGLE.COM.</code></pre>
<p>It worked well.</p>
<p>I also wanted to use a simple address for the webmail, like mail.domain.tld.</p>
<p>So I added the following line</p>
<pre lang="htaccess"><code lang="apache">mail.domain.tld    IN    CNAME    ghs.google.com.</code></pre>
<p>I also updated the serial at the start of the file and rebooted my server. I know there must be a less savage way that rebooting the server but I still haven't find it.</p>
<p>P.S : I used this <a href="http://www.google.com/support/a/bin/answer.py?hl=en&amp;answer=116393">google / DNS Stuff page</a> to help me test my records all along the way</p>