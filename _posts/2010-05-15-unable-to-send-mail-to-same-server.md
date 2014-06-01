---
layout: post
title: "Unable to send mail to same server"
custom_v2_id: 166
---

I just realized that one of my domains was sending mails (in PHP), but I never
actually received them.

I first tested the mail adress, sending mails from a personal adress. I then
tested the `mail()` php function, sending mail to a personal adress. But all
that was working fine.

But sending mails in PHP on www.server.com to name@server.com did nothing. No
mail, no error.

## Damn you Gmail

After some digging it appears that local mails (to addresses on the same
server) were using some sort of special local delivery.

I recently moved the whole mail handling stuff from this server to Google
Apps, but I forgot to remove/edit the postfix configuration file so the local
delivery routine was still up and local mails where internally routed.

So, I just had to edit the `/etc/postfix/main.cf` file, find the
`mydestination `line and remove any reference to my server here.

Then, just restart postfix by doing a

    
    postfix restart  
    

## It still doesn't work

In my case, it still didn't change anything... That's when I understood that
postfix was using a `vmail` mysql database to check for existing domains.

I renamed the `domain `field value in the `domains `table, and I can now
correctly receive mails.

## But, I have lost a lot of mails !

No you don't, as they are routed by the local delivery system, they should be
somewhere on your hard drive. In my case it was in the `/home/mailusers/`
directory

