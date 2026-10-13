---
layout: post
title: "Replacing new lines with spaces in zsh"
tags: zsh
---

Another one of those things I need to often do in zsh and never remember the
syntax.

I had a multiline string (as returned by `fzf`) and wanted to convert it into
a single line, with spaces instead of spaces.

This was the right formula: `selection=("${(f)selection}")`

