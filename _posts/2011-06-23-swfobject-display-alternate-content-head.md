---
layout: post
title: "SWFObject must be included in the <head>"
custom_v2_id: 292
---

<p>We just discovered a strange behavior on one of our test VM (one without Flash installed). I don't know how we've missed it before.</p>
<p>When embedding the main flash file of our application, the alternate content wasn't displayed to players. In fact it seemed to be displayed very briefly then disappear.</p>
<p>I had correctly embeded it with the static publishing method and added a call to <code>swfobject.registerObject</code> to soften the edges. I remembered it working correctly in my tests, so I quickly made a small test case.</p>
<p>It occurs that the alternate content was corretcly displayed if I removed the <code>swfobject.registerObject</code> call and only used the static publishing.</p>
<p>I also found that everything worked fine if I called the <code>swfobject.js</code> file in the <code>head</code>, but started to bug when I moved it at the end of the page.</p>
<p>As I didn't want to add a call to a .js file in my <code>head</code>, I google a bit and I finally found that one have to call <code>swfobject.switchOffAutoHideShow();</code> right before the<code> swfobject.registerObject</code> call. This seems to fix things by not hiding the alternate text</p>
<h4>Edit</h4>
<p>I spent some more hours trying to debug the last corner cases. We had a user using Firefox 3.5.3 with Flash 10.0.42.34. Using SWFObject, we required at least version 10.1. Unfortunatly, the app was still loading, but was buggy because of features not present in the user flash version.</p>
<p>After some tests, I discovered that the <code>swfobject.js</code> code MUST be included in the <code>&lt;head&gt;</code> of the document (well, before any <code>.swf</code> in the page, so better put it in the <code>&lt;head&gt;</code>).</p>
<p>Doing so, you won't even need the previous fix (<code>swfobject.switchOffAutoHideShow()</code>).</p>
<p>I would have loved putting it at the end of the page, with the others JS files, but I guess I won't have a choice here.</p>