---
layout: post
title: "Migrating mails from GMail to other IMAP server"
custom_v2_id: 239
---

I have previously blogged on how [I migrate mails](/blog/176:migrating-mails-
imap-part-1-2) from [one IMAP server to another.](/blog/180:migrating-mails-
from-imap-to-imap-part-2-2) Today I had to migrate some mails again.

My client's staff wasn't happy about the GMail webmail we gave them. The lack
of a true "Draft" feature (one tha could be used and reused) had them drop a
lot of productivity, so we decided to get back to Squirel Mail.

I started by manually recreating all the email adresses on the back-end on the
Dreamhost server. Once at least one address is created, Dreamhost
automatically creates the matching A and MX records.

I had to update my zone file on my registrar to update the previously MX and A
records that were set to point to Google and updated to point to Dreamhost. I
have to use an intermediate zone file on my registrar because I'm dealing with
[a limitation of the .fr TLD](/blog/24:configuring-a-fr-with-dreamhost) here.

Once the zone were updated and changes repercuted accross the network, I
connected to the new Squirel mail. My inbox was empty.

So I ran `imapsync` to copy all mails from the google hosted service to my new
server.

The syntax to be used is a little different than the one I mentioned on my
previous post, so here it is :


```sh
imapsync --host1 imap.gmail.com --ssl1 --authmech1 LOGIN --user1 foo@domain.fr --passfile1 /path/to/pass1 --host2 208.97.*.* --user2 foo@domain.fr --passfile2 /path/to/pass2 --useheader="X-GMail-Received" --useheader 'Message-Id' --noauthmd5
```

After that, I reloaded my Squirel Mail inbox, and it was populated. I just had
to do that for every account.

