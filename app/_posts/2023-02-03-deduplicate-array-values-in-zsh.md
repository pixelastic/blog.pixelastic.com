---
layout: post
title: "Deduplicating array values in zsh"
tags: zsh
---

Given an array with a lot of values, I want to keep only one occurence of each
value. I want to make those values unique.

## The `(u)` modifier

```zsh
local myArray=(a b c d a b b)
echo ${(u)myArray} # a b c d
```

Applied on an array, the `(u)` (for `u`nique) deduplicates the array.

## The `typeset -aU` definition

Somehow, I didn't work in my case and I'm still unsure why, so I found another
way.

By defining my variable as an array with unique values from the get go, I don't
need to deduplicate it manually, it will automatically refuse duplicate values.

```zsh
typeset -aU myArray
local myArray=(a b c d a b b)
echo ${(u)myArray} # a b c d
```

