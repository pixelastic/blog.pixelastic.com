---
layout: post
title: "Komodo Edit Tip : Using regexp in search/replace"
custom_v2_id: 244
---

Here's a little tip. As I started to use more and more often the regexp search
and replace feature of Komodo Edit, I guessa quick blog note could be useful.

I had to "simplify" a big HTML file a while ago, and searching for useless
tags and then replacing them using this feature saved me a lot of time.

Note that you can use `\n` and `\t` for new line and tabulation respectively.

I also had to change the order of attributes in all `<img>` tags (according to
Google Page Speed, this is supposed to help the Gzip algorithm in compressing
data).

I just had to search for

    
    <img src="(.*)" width="(.*)" height="(.*)" alt="(.*)">

and replace with

    
    <img src="\1" alt="\4" height="\3" width="\2">

Â

