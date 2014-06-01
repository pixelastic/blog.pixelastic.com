---
layout: post
title: "Accessing a frame with Firebug console"
custom_v2_id: 320
---

If you want to access the Javascript console of an inner frame of a webpage,
know that you can "browse" through the window as you could browse through a
file system.

For example, if you want Firebug to use the first frameof the page as its
current window object, just type the following code in Firebug console :

```js
cd(window.frames[0])
```

This proved immensely useful when debugging a Facebook application.

