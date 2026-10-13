---
layout: post
title: "Substrings in zsh"
tags: zsh
---

To get only parts of a specific string in zsh, you can use the
`${var:start:stop}` syntax. 

If `stop` is omitted, it will cut until the end of the string. You can also pass
negative values.
