---
layout: post
title: "Parsing string as arguments in zsh"
tags: zsh
---

I had a `commandOptions` string variable that I wanted to use as arguments to
another script. But `commandOptions` had all kind of spaces and quoted strings
in it and I had a hard time passing it correctly as a set of multiple distinct
arguments and not one long string argument.

The solution was to use the `(z)` modifier.

```zsh
local commandOptions="--disabled --delimiter="x" --bind="change:reload pwd"
commandOptions=(${(z)commandOptions})
fzf $commandOptions
```

