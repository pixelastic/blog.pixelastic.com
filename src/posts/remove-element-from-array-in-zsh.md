---
layout: post
title: "Removing an element from an array in zsh"
tags: zsh
---

To remove an element from an array at a specific index, you need to set the
value to `()`. 

```zsh
local myArray=(one two three)
myArray[2]=()
echo $myArray # one three
```

To remove a specific value from an array, we first need to get the index of that
value with the `(i)` modifier, and then empty that index.

```zsh
local myArray=(one two three)
local indexOfTwo=$myArray[(i)two]  # 2
myArray[$indexOfTwo]=()
echo $myArray # one three

# Or, as a oneliner
myArray[$myArray[(i)two]]=()
```

