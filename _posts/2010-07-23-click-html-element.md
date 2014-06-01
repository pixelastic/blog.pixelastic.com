---
layout: post
title: "Allow click through an HTML element"
custom_v2_id: 198
---

<p>When one HTML element is over another one (like when positioning an element using <code>position:absolute</code>), you usually can't click through the top element to access the bottom element.</p>
<p>That's used as a common technique to prevent the right click on images by some sites (like Flickr). They just add an empty transparent div over their images to prevent the lambda user from right clicking and saving the image.</p>
<p>Sometimes, when integrating complex designs, you need those additional layers, but you also want the user to be able to click through them, as if they weren't there.</p>
<p>Just use the <code>pointer-events:none</code> css property to allow click events to go through the element.</p>
<p>This is only supported by Firefox 3.6+, Chrome and Safari for now.</p>