---
layout: post
title: "Slicing an array in zsh"
tags: zsh
---

To get only part of a specific array in zsh, you have to use the `[@]:X:Y`
syntax, where `X` is the start of your slice and `Y` the end of it. 

You can omit the `Y` or use negative indices.

For example, `${myArray[@]:1}` slices the array by removing its first element
