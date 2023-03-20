---
layout: post
title: "Path to the current script folder in zsh"
tags: zsh
---

To get the path of the folder of the script currently running in zsh, use
`${0:a:h}`. `$0` is the path to the currently running script, `a` forces it to
absolute, and `h` to keep the head (the folder).

This is useful when you need to reference scripts that are not in your
`$PATH`, but are stored close to your initial script.


