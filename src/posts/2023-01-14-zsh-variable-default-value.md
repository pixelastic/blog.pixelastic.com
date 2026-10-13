---
layout: post
title: "Default variable values with zsh"
tags: zsh
---

`zsh` has two modifiers (`${:-}` and `${:=}`) to handle fallback for empty
values.

`echo ${ahead:-0}` will display the variable `$ahead`, or display `0` if the
variable is empty.

`echo ${ahead:=0}` (note the `:=` instead of `:-`) will **assign** `0` to the
variable `$ahead`, and then display it.

They are pretty similar, and in that example the result is the same. But with
`:=`, the variable will still be set to `0` afterward, while with `:-` it's
a one-off thing.
