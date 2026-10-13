---
layout: post
title: "Array (List) functions in vimscript"
tags: vim
---

Vimscript `Array`s are called `List`s. They have a set of rules and functions
that I'll document here for my own reference:

## Basics

- They are defined with `let myArray=['one', 'two', 'three']`
- They are zero-indexed: `echo myArray[0]` is `one`
- They can be accessed from the end `echo myArray[-1]` is `three`

## Functions

- `add(myArray, 'four')` adds a new elements. `myArray+=['four']` also works
- `get(myArray, 0, 'default value')` reads a value, with a fallback
- `len(myArray)` returns `3`
- `index(myArray, 'three')` returns `2` (or `-1` if not found)
- `join(myArray, '/')` returns `one/two/three`
- `split('one/two/three', '/')` creates `['one', 'two', 'three']`

## Source

- [List functions](https://learnvimscriptthehardway.stevelosh.com/chapters/35.html)
- [String functions](https://learnvimscriptthehardway.stevelosh.com/chapters/27.html)
