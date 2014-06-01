---
layout: post
title: "Renaming files to fit on a FAT32 drive"
custom_v2_id: 349
---

When moving files from my hard-drive (formatted in ext3) to my mp3 music
player or to any drive formatted in FAT32, some files never get to the
destination due to illegal characters in their filename.

Those includes characters like question marks, colons or quotes which can be
quite common in media filenames.

So I wrote myself a [tiny command-line
script](https://github.com/pixelastic/oroshi/blob/master/scripts/bin/rename-
fat32) to make the filenames FTA32 compliant. Note that this is a destructive
operation as it will simply remove the illegal characters.

