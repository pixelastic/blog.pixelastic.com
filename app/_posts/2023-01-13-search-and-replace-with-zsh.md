---
layout: post
title: "Search and replace with zsh"
tags: zsh
---

`zsh` modifiers allow you to do a great deal with variables, without
having to resort to external commands or functions.

But the syntax is pretty esoteric and hard to guess. I randomly stumble
upon it when reading other people code. And then I forgot about it.

This serie of articles about `zsh` is my way of documenting what I learn, so
I can later refer it.

We'll see how to replace part of a string with something else. The
basic syntax is to use the `${variableName:gs/XXX/YYY/}` syntax.

- `:gs/XXX/YYY/` is the basic syntax for search and replace
- `XXX` should be the string you want to replace
- `YYY` should be the string you want to replace it with
- `s` instead of `gs` replaces the first match, and not all matches
- To actually replace the `/` symbol you can change the delimiter by anything
  else, as long as you use the same in the three places. So
  `${variableName:gs_/_#_}` will replace all `/` with `#`.

I haven't found a way to make the replacement dynamic, though (where `XXX` is
actually coming from `$anotherVariable`).
