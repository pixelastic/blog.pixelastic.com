---
layout: post
title: "Migrating mails from IMAP to IMAP (part 1/2)"
custom_v2_id: 176
tags: imap, dreamhost, squirrelmail, horde, gmail
---

One of my clients wanted to change its hosting provider because of almost
constant downtime. I suggested that we move the whole site and the associated
email addresses to Dreamhost.

He is heavily using its webmail, with a dozen of different accounts, all with
custom address book and drafts to reuse.

I had already moved a previous site of the same client to a GMail powered
webmail and he wasn't so satisfied of it because of the lack of a "draft"
feature that would allow him to reuse the same message templates.

Its current webmail is powered by Imp (Horde) and the default Dreamhost
webmail is Squirel Mail.

So now I'm faced with a challenge. Which webmail should I choose and how will
I initiate the migration ?

## Contestant 1 : Horde

The easiest way would have been to reuse Horde. Horde has a nifty
export/import function. It means that I could have exported the settings on
the current host and imported them back in the new host.

Unfortunatly, Horde is not pre-installed on Dreamhost. It means I would have
to install it and I don't really want to do it. This is not my area of
expertise and if something goes wrong it will take me ages to fix.

Additionnaly, the default php5 install on Dreamhost lacks the IMAP extension
needed and SSL connection requires an additional monthly fee.

That would be the better solution for the client, but I don't feel capable of
doing it.

## Contestant 2 : Squirel Mail

Squirel Mail is the default webmail on Dreamhost. It means that they do handle
all the heavy stuff of configuring it and making sure it does not crash.

They assure me that I can have unlimited hosting of my mails, the only limits
are a maximum of 100 SMTP sending per hour and no attached filed > 7Mo.

Those are almost no issues at all, we can handle that. I just have to check if
the 100 sending per hour is for each mail address or for the entire account.

The only problem will be that I can't export/import the horde feature into
Squirel.

What I could do however is synchronize the two IMAP servers, effectively
copying all the mail from the current one to the new. Unfortunatly, there is
no easy way to do that.

The Dreamhost support even told me that it was impossible. I found a linux
command named imapsynch however that maybe could help, but I'll need to know
the name of the dreamhost imap server and needed credentials to connect to it.
I'll sort this out with them.

## Contestant 3 : GMail

I've already set mails up with GMail a couple of times in the past so this
won't be too hard. Could take some times, but nothing difficult about that.

I may be able to copy the current mails to the GMail server, I've seen some
articles on the subject floating on the network, but I'll definitly won't be
able to copy drafts.

## Conclusion

I'm still in contact with the Dreamhost support to choose the better option. I
don't think I'll install Horde, this will be too much work. I guess I'll go
with the second option of migrating mails to Squirel Mail.

Whatever solution I'll pick, I'll be sure to post the whole details here for
others to follow.

## Update

<del>I finally won't have to migrate mails, the client makes regular POP
backup of its mails so he will just do one more right before the transfer and
will start over with a brand new mail boxes. Concerning the drafts, he will
manually copy-paste them from one webmail to the other and he told me that he
wasn't using the address book...</del>

<del>So it appears that I'll just have to change the DNS to point to the new
webmail and create a temporary CNAME to still access the old webmail on the
old server until the migration is totally over.</del>

Re-update

In fact, it appears that I won't be able to access both webmail at the same
time. I'll have DNS issues, and the registrar panel that I have is very basic,
I won't be able to fine tuned it correctly.

It seems that I'll have to migrate mails from one server to the other.