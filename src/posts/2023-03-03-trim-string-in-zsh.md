---
layout: post
title: "How to trim a string in zsh"
tags: zsh
---

Trimming a string means removing any space at the beginning or end of it.
It's something I need to do often when parsing the output of commands.

The easiest way I found to do it in zsh is to cast the string into an array, and
back into a string with `myvar="${=myVar}"`. 

The `${=}` syntax splits the string as a list of arguments (so,
separated by spaces), and wrapping it in `""` casts it back into a string.

One could use a similar trick by using `echo "   one two three    " | xargs`,
but this would require spawning a new process.

