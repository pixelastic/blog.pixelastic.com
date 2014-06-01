---
layout: post
title: "Migrating from Windows to Ubuntu : KeePass"
custom_v2_id: 266
---

I'm slowly trying to move my development machine from a desktop Windows Xp to
a laptop running Ubuntu. This is quite a long task because there are so much
softwares I depend on on my day to day work. Most of them are crossplatform
but I often need o find a Ubuntu equivalent, and sometimes it does not exists
and I have to run the Windows app using an emulator.

This is exactly the case with [KeePass](http://keepass.info/). KeePass 2.0 is
an improved version of KeePass 1.0 (obviously), that allows one to save all
password in one place. The 2.0 version also permit to save more than single
password, virtually anything, and adding little icons to each entry (when you
start having 200+ entries, icons are a must have).

#### Enter Ubuntu world

The official 2.0 version is not supported under linux. There is a linux port,
named [KeePassX](http://www.keepassx.org/), but it does not support the
`.kdbx` file format used by the official 2.0 version.

So I tried to run the Windows `.exe` file with Wine at first (I already had
Wine installed to run another app), but it wasn't working with KeePass. I
tried instead an other emulator, Mono, and running `mono KeePass.exe` totally
worked.

#### Little tweaks ahead

First of all, I had to install two additionnal packages to make it open
without errors : `System.Windows.Forms` and `System.Runtime`. So far, so good.

But, I quickly discovered that one of the most usefull features of KeePass,
auto-type (Ctrl+V automatically fills a login/password field) wasn't working
correctly. There was one more missing dependency : `xdotool`.

If you are running Ubuntu like me, do not install it from the official
packages, this version is completly outdated and won't work. Instead, you have
to manually install the latest version. If you are lucky and running a 64bits
system, you can download directly [the .deb file from here](http://code.google
.com/p/semicomplete/downloads/list?can=2&q=label%3A.deb+label%3Axdotool+label%
3Afeatured&colspec=Filename+Summary+Uploaded+ReleaseDate+Size+DownloadCount).

If you are running under a 32bits system like me, you'll have to manually
install it. First grab [the files from this
link](ttp://code.google.com/p/semicomplete/downloads/list?q=label:xdotool).
Then, install the `libxtst-dev` package (it is needed for the install to
complete), export the content of the `.tar.gz` file into a temporary directory
and execute `sudo make install`.

#### Finally !

Now, you got KeePass 2.0 working under Ubuntu, and installed all dependencies
needed to run the auto-type feature.

In a Windows environment, one can change KeePass preferences so that closing
it only send it to the tray bar.This option does not seem to be working under
Linux, KeePass still shows in the task bar even when minimized. I spent some
time trying to fix that too, tetsing AllTray and other tray softs for linux
but didn't managed to get what I wanted.

