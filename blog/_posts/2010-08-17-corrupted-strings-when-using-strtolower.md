---
layout: post
title: "Corrupted strings when using strtolower()"
custom_v2_id: 220
tags: lc-ctype, setlocale, utf8, php
---

_Little blog post at 5am, I'll try to make it very short, I need some sleep._

To avoid getting corrupted string results when calling `strtolower `on UTF8
strings, you can call `mb_strtolower` instead. The `mb_*` functions are aware
of the utf8 encoding.

Unfortunatly, sometime you just can't, because the call is made in the cakePHP
core (`Inflector`). Defining a `CTYPE `locale for your whole app may be a
better solution.

Just add a `setlocale(LC_CTYPE, 'C');` in your app and all your utf8 strings
will correctly work with string functions.

Just note that on Windows, calling `setlocale` will change the locale for all
threads, not just the one where PHP is running. This may cause unexpected
results.
