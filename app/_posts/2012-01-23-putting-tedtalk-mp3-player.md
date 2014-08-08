---
layout: post
title: "Downloading all the TEDTalk podcasts"
custom_v2_id: 336
tags: wget, tedtalk, podcast, linux
---

As I'm about to move for a couple of long months without an internet
connection and a lot of travel hours, I thought of downloading the TEDTalk
podcasts.

Being a linux user for about a year now, I'm taking the habit of using the
linux tools to do the boring and repetitive work. Downloading more than a
hundred files seems like a good candidate for a script.

The complete list of audio podcasts is available [here](https://spreadsheets.g
oogle.com/pub?key=0Ahz_ZQm7pkwTdFBVWXBLOFNGSkdsVFgxc0Y0bk9lc0E). I simply
selected all text and copied it into a `file.txt`.

Then, it was simply a matter of extracting only the urls, and feeding them to
`wget`


```sh
cat file.txt | tr ' ' '\n' | tr '\t' '\n' | grep http > list.txt
wget --no-clobber -i list.txt
```

This took a while to download as there are more than 400 files, but that way
I'll have some interesting talks to listen to during my trip.
