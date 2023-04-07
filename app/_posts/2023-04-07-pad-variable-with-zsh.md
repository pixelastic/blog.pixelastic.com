---
layout: post
title: "Padding a string with zsh"
tags: zsh
---

To pad a string with leading spaces in zs, you can use `${(r(15)( ))variableName)`.

- `r(15)` pads on the `r`ight (use `l` for `l`eft padding)
- The `15` defines the maximum length of the string
- `( )` defines the character to use for padding (here, a ` ` space)
