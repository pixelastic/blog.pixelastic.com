---
layout: post
title: "Displaying HTML mails sent from cakePHP in SquirrelMail"
custom_v2_id: 230
---

I just stumble upon the fact that my automated multipart (text + html) mails
sent from my apps weren't correctly displayed on SquirrelMail.

I'm personnaly using GMail for my day to day email needs, but one of my client
was using the default [SquirrelMail](http://squirrelmail.org/) (v1.4.21)
install on their [Dreamhost account](http://www.dreamhost.com/). The received
mails are not correctly parsed and get displayed as plain text, even if the
header clearly specifiy a `Content-Type: multipart/alternative;
boundary="alt-"`

The first culprit was that no boundary were given. This does not seem to cause
GMail any problem, but I thought that SquirrelMail may choke on that. So I
manually added a `$this->Email->_createboundary();` call before my
`$this->Email->send();`

Still, no succes. After some googling I found a [bug
report](http://cakephp.lighthouseapp.com/projects/42648-cakephp/tickets/14
-email-component-should-set-mime-version-header-when-sendas-html-or-both) for
a similar problem. I tried adding the suggested MIME header, and that solved
my problem.

So here's my updated code :

    
    $this->Email->sendAs = 'both';  
    $this->Email->_createboundary();  
    $this->Email->__header[] = 'MIME-Version: 1.0';  
    $this->Email->send();

I'll now have to add those two additional line of code everytime I'll have to
send a multipart (html + text) email in cakePHP, until it get fixed (no
specified milestone).

