---
layout: post
title: "Migrating mails from GMail to other IMAP server"
custom_v2_id: 239
---

<p>I have previously blogged on how <a title="Migration from IMAP to IMAP 1/2" href="/blog/176:migrating-mails-imap-part-1-2">I migrate mails</a> from <a title="Migration from IMAP to IMAP 2/2" href="/blog/180:migrating-mails-from-imap-to-imap-part-2-2">one IMAP server to another.</a> Today I had to migrate some mails again.</p>
<p>My client's staff wasn't happy about the GMail webmail we gave them. The lack of a true "Draft" feature (one tha could be used and reused) had them drop a lot of productivity, so we decided to get back to Squirel Mail.</p>
<p>I started by manually recreating all the email adresses on the back-end on the Dreamhost server. Once at least one address is created, Dreamhost automatically creates the matching A and MX records.</p>
<p>I had to update my zone file on my registrar to update the previously MX and A records that were set to point to Google and updated to point to Dreamhost. I have to use an intermediate zone file on my registrar because I'm dealing with <a title="Limitation of the .fr TLD" href="/blog/24:configuring-a-fr-with-dreamhost">a limitation of the .fr TLD</a> here.</p>
<p>Once the zone were updated and changes repercuted accross the network, I connected to the new Squirel mail. My inbox was empty.</p>
<p>So I ran <code>imapsync</code> to copy all mails from the google hosted service to my new server.</p>
<p>The syntax to be used is a little different than the one I mentioned on my previous post, so here it is :</p>
<pre><code lang="sh">imapsync --host1 imap.gmail.com --ssl1 --authmech1 LOGIN --user1 foo@domain.fr --passfile1 /path/to/pass1 --host2 208.97.*.* --user2 foo@domain.fr --passfile2 /path/to/pass2 --useheader="X-GMail-Received" --useheader 'Message-Id' --noauthmd5</code></pre><p>After that, I reloaded my Squirel Mail inbox, and it was populated. I just had to do that for every account.</p>