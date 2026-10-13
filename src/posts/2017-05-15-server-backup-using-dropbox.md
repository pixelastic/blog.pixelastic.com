---
layout: post
title: "Server backup using Dropbox"
tags:
---

Last week-end I received an email from the company that hosts this very own
website. Their monitoring detected that there was an issue with my server.
2 hours later they were able to tell me something was wrong with my hard drive.
24 hours after that they explained the procedure to get the hard drive
replaced.

I'm using this dedicated server for hosting websites, but also as a backup for
some personal data and private repositories. This was too much reponsability
for one server. Having it down made me realize my offsite backup was not 100%
reliable.

I decided to keep this server for hosting my websites. Havin a dedicated server
let me tweak nginx and do deploys with rsync. I'm deploying static
websites so the security risk is low.

But now I needed to move my backup somewhere else. This whole experience made me
realize I don't want to have to maintain the backup. I want something that "just
works™" and where I could push my data. I decided to go with the Dropbox Plus
plan as Dropbox a service I'm already using. $10/month for 1To is ok. I'm paying
for the peace of mind it will bring me.

It also comes with features I couldn't have done with my dedicated server
like a Web UI to browse pictures, or a way to share (and revoke) links with
people. It's not the main features I was looking for, but they are great nice to
have, still.

Now the question is: how do I move my 400Go+ to Dropbox. I don't even
have that much space available on my local computer and downloading it all to
re-upload it afterwards would take ages.

I have a rescue access to my server with a way to mount the hard drive and
explore it. It's Debian-based, so I can install the Dropbox headless client.

Once installed, I also have to install their python helper and rename it to
`dropbox`. From this tool, I can command Dropbox. I started by excluding all
directories from the synchronization. I didn't want this rescure box to download
all my current Dropbox.

Then I created a new directory in my Dropbox (through the Web UI), and added
inside symbolic links to all the directories I wanted to backup. And it worked.
I didn't expect it to work that easily, to be honest. I could see in the Web UI
directories being created and all my data being upload. Now all I have to do is
wait a couple hours while the backup is happening in the background.

That's the most original way of using Dropbox I ever did.
