---
layout: post
title: "Setting the size of a tab character in a pre element"
custom_v2_id: 79
tags: white-space, tab-stops, tab, o-tab-size, moz-tab-size
---

When displaying code in an HTML page, you often want it to be correctly
indented with tabs. Unfortunatly, setting a `white-space:pre `(like is the
default on a <pre> element) to an element will transform any tab in the
equivalent of 8 space characters.

8 is way more than needed, 4 will be much suited, specially in a website
design where the horizontal space is limited.

I've googled a lot, going from obscure old CSS drafts to proprietary
implementation mailing lists, browsing CSS codes.

One [interesting discussion can be found here](http://www.phwinfo.com/forum
/comp-inf-authoring-css/365851-change-tab-width-using-css.html), there even is
a [proposal for a tab-stops property](http://www.w3.org/People/howcome/t
/970224HTMLERB-CSS/WD-tabs-970117.html) on the W3C

Opera has a proprietary `-o-tab-size`. You just have to pass the number of
space characters that should be used.

That's all I have for now...

I know I could replace every` \t` with 4 `&nbsp;`, or with a `<span>` that
I'll style to match the desired width but it involves a back-end processing
and I would have liked to style it directly.

Edit : There seems to have a `-moz-tab-size` property on the latest Firefox
3.7 nightlies