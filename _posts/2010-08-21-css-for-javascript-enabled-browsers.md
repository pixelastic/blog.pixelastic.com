---
layout: post
title: "CSS for Javascript enabled browsers"
custom_v2_id: 224
tags: css, javascript, performance, html
---

In a previous post I was wondering if my way of loading js-specific CSS rules
was right. I was loading a specific css file for js overrides.

This allow for lighter stylesheets for users without Javascript (they won't
load useless rules), but also resulted in slower rendering for other users
because they needed to load two stylesheets instead of one.

After much pondering, I now think that loading all the rules in one stylesheet
is the way to go.

In addition with the number of request mentionned, keeping all your rules in
the same file is much more easier to maintain. Js-specific rules aren't that
big either so the small additional bytes are usually better than a full http
request.

I now prefix all my Javascript rules by `.js`. I add a `js` class to the `html
`element directly from the `head`, this helps in preventing any FOUC that may
occur because we add the class before the `body` rendering.

```html
<head>
    <script>document.documentElement.className+=' js';</script>
</head>
```

