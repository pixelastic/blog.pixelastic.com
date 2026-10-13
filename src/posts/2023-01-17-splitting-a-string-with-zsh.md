---
layout: post
title: "Splitting a string with zsh"
tags: zsh
---

This is one of those transformations I know how to do with node, ruby, or even
the command line, but that I always have to refer to Stack Overflow when
attempting to do it with `zsh`.

Hopefully, writing this blog post (and referring to it later) will help me
remember how to do it.

To split a string variables by a delimiter, one can use the
`(${(@s/X/)variableName})` syntax.

- The wrapping `()` means that the resulting variable will be treated as an
  array
- The `${}` interpolation syntax allow passing specific modifiers
- The `(@s/X/)` modifier means to split it by the `X` character.

To split by the `/` character, you can use an alternate syntax like
`(@s:/:)` instead. The character following the `@s` is part of the zsh syntax
parsing, and the character between them will be your actual delimiter.

