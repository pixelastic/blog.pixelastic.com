---
layout: post
title: "Using multiple variable modifiers in zsh"
tags: zsh
---

`zsh` has a lot of variable modifiers, and sometimes trying to put more than one
on the same variable either throws an error or does nothing.

To fix that, I've been assigning and re-assigning to the same variable, each
time with a new modifier added.

Today, I found a syntax that allows chaining/embedding of modifiers.

```zsh
local myArray=(../../up-the-tree ./here ../in-the-parent)

# To display this array from the closest to the furthest, here is what I used to
do
myArray=(${(O)myArray})   # To sort it in reverse order
echo ${(F)myArray})       # To display it line by line
```

The following syntax also works:

```zsh
echo ${(F)${(O)myArray}}
```

