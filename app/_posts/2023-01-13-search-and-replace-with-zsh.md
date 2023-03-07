---
layout: post
title: "Search and replace with zsh"
tags: zsh
---

To search and replace with `zsh`, there are two ways.

## With `${var//XXX/YYY}`

This will replace all occurences of `XXX` in `$var` with `YYY`. 

Note that you
can interpolate variables inside of `XXX`, so `${var//${input}/YYY}` with
`input="foo"` will replace `foo` with `YYY` in `$var`.

You can use only one `/` instead of `//` to only replace the first occurence.


## With `${var:gs/XXX/YYY}`

The `:s/XXX/YYY` modifier is the basic syntax to replace `XXX` with `YYY`.

It **does not** allow for interpolating variables. You need to replace `s` with
`gs` to make it a global search and replace.

The only advantage over the other syntax in my opinion is that you can swap the
delimiter character (`/`) with any other character you like. So if your patterns
are heavy on `/`, you can swap them for `_` for example for a more readable
format, like `${var:gs_/_#}` to replace all `/` with `#`.
