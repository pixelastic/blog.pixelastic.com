---
layout: post
title: "Working on Wednesday #8 : Custom zsh scripts for housekeeping"
custom_v2_id: 301
---

I made a break of the Ruby/Rails learning this week. Instead I learned a bit
more about the basic Linux command, and made a few scripts to help me in my
day to day work (and fun) with my Linux environment.

I currently use two laptops. One is a tiny netbook while the other a Dell XPS.
I mostly use the XPS for everything work related (like posting this), while
the netbook is dedicated to casual use : browsing, playing, etc.

Last week, during my vacations, I only took the netbook with me, and while not
strictly speaking working on it I still had to code a little bit. I installed
`ScummVM`, `CortixTH` and managed to run Carmageddon 2 under `wine`. I also
downloaded and tried a few old emulator games on my
[Dingoo](http://en.wikipedia.org/wiki/Dingoo_A320).

As you may have guessed, I wrote a bunch of scripts during that week to help
me in some of the more tedious aspects of this task.

#### Dingoo deployment

Downloading roms, copying them to the Dingoo, and then testing the games to
make sure they are working was tedious. I wrote a little script that
automatically mount the Dingoo when plugged to the computer, and copy my games
to it, removing old version along the way while still keeping my saved games.

I had to parse `dmesg` (thanks to `grep`, `tail` and `sed`) as well as use
`rsync` for the copy.

#### Sansa Clip cleaning

I also wrote a simple script to clean my [Sansa
Clip](http://anythingbutipod.com/2009/08/sandisk-sansa-clip-plus-review/) of
all the useless files I had put on it. As I only have a text screen, I don't
need the `jpg` covers, torrent `txt` files, auto-generated `m3u` files and
other `thumbs.db` and `.DS_Store` useless files.

Here, `find` to the rescue with some `zsh` scripting, and here we go.

#### Shared config files

As I'm working on several computers (two laptops and the one at work at
least), I found myself spending time reconfiguring stuff multiple times.

Here, thanks to Dropbox and some clever `ln -s` calls, I managed to replicate
the same config on the 3 machines easily.

From my freelance time, I also have a pretty big `/etc/hosts` and
`~/.ssh/config` file. At work, I have another one for the work servers. But I
sometimes had to connect to the work server from home.

So once again, thanks to Dropbox, some `ln -s` once more and `cat` I wrote two
functions to regenerate those two files based on config files. That way,
whenever I change one of those files, it is updated on the other machines too.

That was it. It took most of my day.

Being able to script those little repetitive tedious task is something I
really appreciate on Linux. I am no longer dependent on the UI my OS gave me,
and can now really understand how things work. It requires some time to learn,
but this is not going to drastically change from one version to another like
it does on each Windows new release.

