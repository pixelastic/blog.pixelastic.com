---
layout: post
title: "Automatically save pictures from phone to Dropbox folder"
tags: dropbox, ifttt
---

The Dropbox app on my Android offers to automatically save pictures I take to
my Dropbox account. That is a very great feature, removing the pain of
doing backup of pictures on a regular basis.

But it actually saves them in a special Dropbox folder named `Camera Uploads`,
one that cannot be moved, and is not synchronized with the desktop Dropbox.

So I create a special [ifttt](https://ifttt.com) recipe that will copy any new
picture added to this folder into a _real_ Dropbox folder. I simply chose
Dropbox as the input, with `/Camera Uploads` as the folder to listen to. Then
I also chose Dropbox as the ouput, `{{PhotoUrl}}` as the File URL,
`{{FilenameNoExt}}` as the File name, and chose one of my folders for the
Dropbox path folder.

Now, whenever I take a picture on my phone, it gets saved on my Dropbox
account, and then ifttt kicks in and copy it to another directory in my Dropbox
which will in turn save it on my local Dropbox folder.

That's quite circumvoluted to simply save a picture from my phone to my
computer, but that's still the easiest way I found.
