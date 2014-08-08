---
layout: post
title: "Migrating mails from IMAP to IMAP (part 2/2)"
custom_v2_id: 180
tags: linux, imapsync, imap
---

I'll finally have to migrate mails from one IMAP server to another because of
a change in the hosting provider of one of my clients.

Let me first do a quick review of my current config :

I have an IMAP server on a not-so-reliable host. I need to move all the
mailboxes to a brand new Dreamhost server.

The current host use horde/imp as its webmail, but Dreamhost is running under
Squirel Mail.

## How to do that ?

When I first contacted Dreamhost to ask them the better way to copy the
content of my old IMAP server to their new one, they told me that IMAP to IMAP
transfer was unfortunatly not possible.

After some digging I found a little linux tool called `imapsync `that was
developped to synchronize two IMAP servers. As I only wanted to copy content
from one server to an empty one, I guess it should work.

And it does.

## Installing the tool

First of all, you really need to have a Linux machine. I'm sorry for all
Windows and Mac users out there, but this solution will only work with Linux.

Obviously, you'll first have to download and install it.

I'm a newbie linux user, and don't use it at its full potential. It means that
I rely a lot on the UI, I don't know most of the more basics commands.

So, I don't know the correct procedure to install something, I always use the
Synaptic Packager Manager UI. I just have to type `imapsync`, check its
checkbox and start the install.

I guess you, more experienced linux user, would know how to do that anyway.

## Running the command

Once it's installed, you'll just have to run one command. But before typing
it, you have make sure that you have all the required informations.

You'll need the server name, login and pass of both the source and destination
account.

In my case I had previously reset all the password to newly generated one on
the source server, then created the same email (with same password) on the
destination server.

For the source server name, you shouldn't have any problem finding it. It
usually is something like `mail.domain.co`m.

But for the destination server, that's a little more tricky. As I haven't yet
changed DNS, I have a Dreamhost server but no domain name pointing to it. So I
can't use `mail.domain.com` there.

I had to go my Dreamhost DNS panel (clicking on DNS under the name of my
domain in Manage domain) and check for the IP address associated with the
`mail A` entry.

Once you have all this, create a file (name it `pass`) which contain the
password of your account (or `pass1 `and `pass2 `if source and destination
password aren't the same). This is done so you won't type in clear text the
password of your accounts, or they could be found in the history files.

Once it's done, just run the following command

~~~sh
imapsync --host1 mail.domain.com --user1 contact@domain.com --passfile1 /path/to/pass1 --host2 208.97.XXX.XXX --user2 contact@domain.com --passfile2 /path/to/pass2 --noauthmd5
~~~


It is not an instant process, actually in can be quite long. One of the
mailbox I had to move had more than 20.000 mails in the sent folder and about
40.000 in the received one. It took me almost 18h to complete.
