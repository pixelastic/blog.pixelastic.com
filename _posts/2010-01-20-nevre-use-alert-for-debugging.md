---
layout: post
title: "Never use alert() for debugging"
custom_v2_id: 31
---

One thing I learned today is to never use alert() for debugging pruposes. When
the javascript alert() function is called it blocks every other action until
the OK button is pressed. It means that your javascript code that is
immediatly after the alert() call is delayed until you press OK.

It also means that the thread your browser gave to the javascript engine is
halted during all this time.

Imagine you are binding keyboard shortcuts on your website to specific
actions. Like pressing Ctrl+S will submit the current form. Of course, Ctrl+S
is already defined as a shortcut in the browser, so you will take care of
preventing the default behavior in your custom function (using return false,
e.preventDefault(), e.stopPropagation() or any method defined in your
framework to do that)

The problem is that is you call alert() in your function, the Javascript
thread will be halted before you can make the call to stop the propagation and
thus, the browser will take control again and firing its default shortcut.

So my advice is that you should never use alert for debugging. Use the
console.debug() method shipped in firebur or directly write to the DOM but do
not use alert().

