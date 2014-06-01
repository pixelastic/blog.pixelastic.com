---
layout: post
title: "Missing bits of the official Facebook documentation"
custom_v2_id: 281
---

As a complement to my post about FB.ui undocumented hard limit, here are some
other parts that should be in the documentation.

#### Custom html tag

You have to add `xmlns:fb="http://www.facebook.com/2008/fbml"
xmlns:og="http://opengraphprotocol.org/schema/"` to your main `<html>`
element.

If you don't, the `<fb:like>` (and possibly other `<fb:*>` elements) won't
work in IE. I guess those unorthodox tags won't be interpreted by IE until you
define the correct xmlns.

#### Adding a #fb-root

You also have to add a `<div id="fb-root"></div>` in your html code. I guess
the Javascript API use it for some stuff, but I don't really know why.

The Javascript SDK logs an error message asking for this missing element if
you don't have it.

