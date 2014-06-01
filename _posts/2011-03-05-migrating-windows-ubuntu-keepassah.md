---
layout: post
title: "Migrating from Windows to Ubuntu : KeePass"
custom_v2_id: 266
---

<p>I'm slowly trying to move my development machine from a desktop Windows Xp to a laptop running Ubuntu. This is quite a long task because there are so much softwares I depend on on my day to day work. Most of them are crossplatform but I often need o find a Ubuntu equivalent, and sometimes it does not exists and I have to run the Windows app using an emulator.</p>
<p>This is exactly the case with <a title="KeePass" href="http://keepass.info/" target="_blank">KeePass</a>. KeePass 2.0 is an improved version of KeePass 1.0 (obviously), that allows one to save all password in one place. The 2.0 version also permit to save more than single password, virtually anything, and adding little icons to each entry (when you start having 200+ entries, icons are a must have).</p>
<h4>Enter Ubuntu world</h4>
<p>The official 2.0 version is not supported under linux. There is a linux port, named <a title="KeePassX" href="http://www.keepassx.org/" target="_blank">KeePassX</a>, but it does not support the <code>.kdbx</code> file format used by the official 2.0 version.</p>
<p>So I tried to run the Windows <code>.exe</code> file with Wine at first (I already had Wine installed to run another app), but it wasn't working with KeePass. I tried instead an other emulator, Mono, and running <code>mono KeePass.exe</code> totally worked.</p>
<h4>Little tweaks ahead</h4>
<p>First of all, I had to install two additionnal packages to make it open without errors : <code>System.Windows.Forms</code> and <code>System.Runtime</code>. So far, so good.</p>
<p>But, I quickly discovered that one of the most usefull features of KeePass, auto-type (Ctrl+V automatically fills a login/password field) wasn't working correctly. There was one more missing dependency : <code>xdotool</code>.</p>
<p>If you are running Ubuntu like me, do not install it from the official packages, this version is completly outdated and won't work. Instead, you have to manually install the latest version. If you are lucky and running a 64bits system, you can download directly <a title=".deb file for xdotool on 64bits system" href="http://code.google.com/p/semicomplete/downloads/list?can=2&amp;q=label%3A.deb+label%3Axdotool+label%3Afeatured&amp;colspec=Filename+Summary+Uploaded+ReleaseDate+Size+DownloadCount" target="_blank">the .deb file from here</a>.</p>
<p>If you are running under a 32bits system like me, you'll have to manually install it. First grab <a title="xdotool for 32bits" href="ttp://code.google.com/p/semicomplete/downloads/list?q=label:xdotool" target="_blank">the files from this link</a>. Then, install the <code>libxtst-dev</code> package (it is needed for the install to complete), export the content of the <code>.tar.gz</code> file into a temporary directory and execute <code>sudo make install</code>.</p>
<h4>Finally !</h4>
<p>Now, you got KeePass 2.0 working under Ubuntu, and installed all dependencies needed to run the auto-type feature.</p>
<p>In a Windows environment, one can change KeePass preferences so that closing it only send it to the tray bar.This option does not seem to be working under Linux, KeePass still shows in the task bar even when minimized. I spent some time trying to fix that too, tetsing AllTray and other tray softs for linux but didn't managed to get what I wanted.</p>