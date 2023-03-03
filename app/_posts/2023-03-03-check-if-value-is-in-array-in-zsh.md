---
layout: post
title: "Check if an array contains a value"
tags: zsh
---

zsh doesn't have a way to check if a value is in an array, but can tell us
(using `${(ie)}`) the index of the element.

The `i` means `i`nverse subscript, meaning that instead of accessing a value by
its index, we want to access the index by its value.

`e` is for `e`xact match; without it zsh will return the index of any value that
contains the substring, instead of exactly matching it.

The trick is that if the value is not found, zsh will return the `length of the
array + 1`.

So, to summarize, to check if the value `zsh` is in the array `myArray`, you
would test it that way:

```zsh
if [[ ${myArray[(ie)zsh]} -lt ${#myArray} ]]; then
  # ${#myArray} return the length of the array
fi
```

Alternatively, if the string you're looking for is dynamic (`$myVar`), you'll need one more
wrapping level: `${myArray[(ie)${myVar}]}`.

