---
layout: post
title: "Allow click through an HTML element"
custom_v2_id: 198
---

When one HTML element is over another one (like when positioning an element
using `position:absolute`), you usually can't click through the top element to
access the bottom element.

That's used as a common technique to prevent the right click on images by some
sites (like Flickr). They just add an empty transparent div over their images
to prevent the lambda user from right clicking and saving the image.

Sometimes, when integrating complex designs, you need those additional layers,
but you also want the user to be able to click through them, as if they
weren't there.

Just use the `pointer-events:none` css property to allow click events to go
through the element.

This is only supported by Firefox 3.6+, Chrome and Safari for now.

