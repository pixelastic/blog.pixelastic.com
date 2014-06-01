---
layout: post
title: "SWFObject must be included in the <head>"
custom_v2_id: 292
---

We just discovered a strange behavior on one of our test VM (one without Flash
installed). I don't know how we've missed it before.

When embedding the main flash file of our application, the alternate content
wasn't displayed to players. In fact it seemed to be displayed very briefly
then disappear.

I had correctly embeded it with the static publishing method and added a call
to `swfobject.registerObject` to soften the edges. I remembered it working
correctly in my tests, so I quickly made a small test case.

It occurs that the alternate content was corretcly displayed if I removed the
`swfobject.registerObject` call and only used the static publishing.

I also found that everything worked fine if I called the `swfobject.js` file
in the `head`, but started to bug when I moved it at the end of the page.

As I didn't want to add a call to a .js file in my `head`, I google a bit and
I finally found that one have to call `swfobject.switchOffAutoHideShow();`
right before the` swfobject.registerObject` call. This seems to fix things by
not hiding the alternate text

## Edit

I spent some more hours trying to debug the last corner cases. We had a user
using Firefox 3.5.3 with Flash 10.0.42.34. Using SWFObject, we required at
least version 10.1. Unfortunatly, the app was still loading, but was buggy
because of features not present in the user flash version.

After some tests, I discovered that the `swfobject.js` code MUST be included
in the `<head>` of the document (well, before any `.swf` in the page, so
better put it in the `<head>`).

Doing so, you won't even need the previous fix
(`swfobject.switchOffAutoHideShow()`).

I would have loved putting it at the end of the page, with the others JS
files, but I guess I won't have a choice here.

