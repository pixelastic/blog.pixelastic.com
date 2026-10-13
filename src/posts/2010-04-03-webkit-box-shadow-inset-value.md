---
layout: post
title: "-webkit-box-shadow inset value"
custom_v2_id: 66
tags: webkit, safari, inset, chrome, box-shadow, border-radius
---

Webkit browsers (Safari and Chrome) have the `-webkit-box-shadow` property
defined to add shadows to elements. Shadow can either be outside the box, or
inside it (using the inset parameter).

Unfortunatly, only the latest Webkit nightlies have the `inset` parameter
functionnal, Safari 4 does not.

Chrome does indeed have the inset parameter, but it also have [a
bug](http://code.google.com/p/chromium/issues/detail?id=25334) when used in
conjunction with the `-webkit-border-radius` property : the inset shadow is
visible "behind" the element where the borders are rounded.

This bug does not occur on Mac, but as I have no way to target a certain OS
when writing CSS rules, I decided to remove `inset box-shadow` for webkit
browsers on my actual projects, I may re-insert them later when both issues
will be fixed.