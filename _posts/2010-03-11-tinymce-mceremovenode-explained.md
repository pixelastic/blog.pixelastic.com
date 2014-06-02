---
layout: post
title: "tinyMCE mceRemoveNode explained"
custom_v2_id: 57
---

When writing my image plugin for tinyMCE today I came accross the
`mceRemoveNode `command that one can use to alter the tinyMCE editor content.

It has to be used with `editor.execCommand('mceRemoveNode', true/false,
node)`.

I don't really get what the `true`/`false `argument was about, setting either
one or the other didn't change anything (that I could tell) in my case. The
node argument is the DOM node you want to remove from the editor.

At first I thought that the command would allow me to remove a node from the
editor area. I needed it in my plugin. But it was not exactly what it really
does.

In fact it only removes the wrapping node, but keep the content intact. In
other words if you have


```html
<a href="http://www.domain.com/"><img src="http://www.domain.com/picture.jpg" /></a>
```

And you remove the `<a>` node using `mceRemoveNode`, you'll end up with


```html
<img src="http://www.domain.com/picture.jpg" />
```

in place of your link.

I had to manually (well, with the great help of jQuery) remove the content of
the link before removing it. I could have remove the node itself using jQuery
but I thought that sticking to the tinyMCE methods would be a better approach,
I don't want to mess all this stuff up, maybe "simply" removing html nodes
like this could interfere with the `textarea `value update, I don't know. And
in doubt, I prefer to use the methods and command exposed by the API

