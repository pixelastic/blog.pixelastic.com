---
layout: post
title: "Unable to send mail to same server"
custom_v2_id: 166
---

<p>I just realized that one of my domains was sending mails (in PHP), but I never actually received them.</p>
<p>I first tested the mail adress, sending mails from a personal adress. I then tested the <code>mail()</code> php function, sending mail to a personal adress. But all that was working fine.</p>
<p>But sending mails in PHP on www.server.com to name@server.com did nothing. No mail, no error.</p>
<h4>Damn you Gmail</h4>
<p>After some digging it appears that local mails (to addresses on the same server) were using some sort of special local delivery.</p>
<p>I recently moved the whole mail handling stuff from this server to Google Apps, but I forgot to remove/edit the postfix configuration file so the local delivery routine was still up and local mails where internally routed.</p>
<p>So, I just had to edit the <code>/etc/postfix/main.cf</code> file, find the <code>mydestination </code>line and remove any reference to my server here.</p>
<p>Then, just restart postfix by doing a</p>
<pre><code lang="sh">postfix restart<br /></code></pre>
<h4>It still doesn't work</h4>
<p>In my case, it still didn't change anything... That's when I understood that postfix was using a <code>vmail</code> mysql database to check for existing domains.</p>
<p>I renamed the <code>domain </code>field value in the <code>domains </code>table, and I can now correctly receive mails.</p>
<h4>But, I have lost a lot of mails !</h4>
<p>No you don't, as they are routed by the local delivery system, they should be somewhere on your hard drive. In my case it was in the <code>/home/mailusers/</code> directory</p>