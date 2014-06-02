---
layout: post
title: " swfobject.getObjectById() when flash not installed"
custom_v2_id: 322
---

SWFObject is the de-facto library used whenever you need to ember Flash files
in your code. It takes care of smoothing all cross browser issues.

It has a `getFlashPlayerVersion `method that return a string of the current
version in the form `major.minor.release`. Its value is `0.0.0` if Flash isn't
installed.

It also provides a cross browser markup, including conditionnal comments for
IE, that validate and works everywhere. The downside is that it forces you to
create two elements in your markup with the same id.

Hopefully, the `getObjectById `method is here to return the correct DOM
element based on the browser flash integration type.

But... It seems that the mechanisme is buggy when Flash isn't installed (on
2.2)

I've tested running IE9 without Flash installed and FF8 with Flash disabled,
and the return of `getObjectById `differs : I got `null `in IE9 and the DOM
element in FF8.

I've added a small patch to my code to take it into account :


```js
var el = swfobject.getObjectById(id) || document.getElementById(id);
```

And I've also submitted a [bug report](http://code.google.com/p/swfobject/issu
es/detail?id=599&thanks=599&ts=1319792868).

