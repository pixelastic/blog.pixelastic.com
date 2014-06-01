---
layout: post
title: "Working on Wednesday #8 : Custom zsh scripts for housekeeping"
custom_v2_id: 301
---

<p>I made a break of the Ruby/Rails learning this week. Instead I learned a bit more about the basic Linux command, and made a few scripts to help me in my day to day work (and fun) with my Linux environment.</p>
<p>I currently use two laptops. One is a tiny netbook while the other a Dell XPS. I mostly use the XPS for everything work related (like posting this), while the netbook is dedicated to casual use : browsing, playing, etc.</p>
<p>Last week, during my vacations, I only took the netbook with me, and while not strictly speaking working on it I still had to code a little bit. I installed <code>ScummVM</code>, <code>CortixTH</code> and managed to run Carmageddon 2 under <code>wine</code>. I also downloaded and tried a few old emulator games on my <a href="http://en.wikipedia.org/wiki/Dingoo_A320" target="_blank">Dingoo</a>.</p>
<p>As you may have guessed, I wrote a bunch of scripts during that week to help me in some of the more tedious aspects of this task.</p>
<h4>Dingoo deployment</h4>
<p>Downloading roms, copying them to the Dingoo, and then testing the games to make sure they are working was tedious. I wrote a little script that automatically mount the Dingoo when plugged to the computer, and copy my games to it, removing old version along the way while still keeping my saved games.</p>
<p>I had to parse <code>dmesg</code> (thanks to <code>grep</code>, <code>tail</code> and <code>sed</code>) as well as use <code>rsync</code> for the copy.</p>
<h4>Sansa Clip cleaning</h4>
<p>I also wrote a simple script to clean my <a href="http://anythingbutipod.com/2009/08/sandisk-sansa-clip-plus-review/" target="_blank">Sansa Clip</a> of all the useless files I had put on it. As I only have a text screen, I don't need the <code>jpg</code> covers, torrent <code>txt</code> files, auto-generated <code>m3u</code> files and other <code>thumbs.db</code> and <code>.DS_Store</code> useless files.</p>
<p>Here, <code>find</code> to the rescue with some <code>zsh</code> scripting, and here we go.</p>
<h4>Shared config files</h4>
<p>As I'm working on several computers (two laptops and the one at work at least), I found myself spending time reconfiguring stuff multiple times.</p>
<p>Here, thanks to Dropbox and some clever <code>ln -s</code> calls, I managed to replicate the same config on the 3 machines easily.</p>
<p>From my freelance time, I also have a pretty big <code>/etc/hosts</code> and <code>~/.ssh/config</code> file. At work, I have another one for the work servers. But I sometimes had to connect to the work server from home.</p>
<p>So once again, thanks to Dropbox, some <code>ln -s</code> once more and <code>cat</code> I wrote two functions to regenerate those two files based on config files. That way, whenever I change one of those files, it is updated on the other machines too.</p>
<p>That was it. It took most of my day.</p>
<p>Being able to script those little repetitive tedious task is something I really appreciate on Linux. I am no longer dependent on the UI my OS gave me, and can now really understand how things work. It requires some time to learn, but this is not going to drastically change from one version to another like it does on each Windows new release.</p>