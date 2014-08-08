---
layout: post
title: "Converting files to UTF-8 from the command line"
custom_v2_id: 348
tags: iso-8859-1, encoding, utf8, iso-8859-2
---

Converting to and from charset encoding is boring. Life would be much easier
if everything was saved in proper UTF-8.

I just coded a couple of scripts that will help be read file encoding from
files and convert them to UTF-8.

First, not all encoding can be easily read. Some uses markers that are easy to
check, other requires heuristic and guessing. I won't deal with the second
part. Most of the files I'm currently handling are either Latin1 (ISO-8859-1)
or Latin2 (ISO-8859-2), so I'll limit the scope of my scripts to those two
sets.

Fortunatly, the default `file` command can do that.


```sh
$ file -bi file.txt
text/plain; charset=us-ascii
$ file -bi bad.html
text/html; charset=iso-8859-1
$ file -bi good.html
text/html; charset=utf-8
```

Now that we have a way to know the input encoding, we can use `recode` to
convert to UTF-8. You can install `recode` easily with `sudo apt-get install
recode`.

Once done, it is just a matter of `convert latin1..utf8 bad.html`

I wrapped those methods in two scripts : [encoding](https://github.com/pixelas
tic/oroshi/blob/master/scripts/bin/encoding) and
[utf8](https://github.com/pixelastic/oroshi/blob/master/scripts/bin/utf8) that
respectively output the file encoding and convert the file to utf8.
