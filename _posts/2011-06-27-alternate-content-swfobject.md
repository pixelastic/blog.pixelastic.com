---
layout: post
title: "Alternate content with SWFObject"
custom_v2_id: 293
---

SWFObject allow a web developer to add an alternate content in place of the
`swf` file is the user doesn't have flash installed.

In the case of a web app this is great to provide your user with a link to the
Adobe website. You then tell your users Flash is needed and provide a link for
them to install it.

Unfortunatly, if for one reason or another the `swf` file you try to load is
unreachable (maybe your host is down ?), SWFObject will display the same
alternate content. Meaning that a user with a perfectly correct Flash version
will see an error message telling him that he does not have Flash when in fact
the error is on your side.

That's not very user friendly and makes you look bad.

So, to fix this, I added two error messages as alternate content :


```html
<div id="alternateContent" class="alternateContent">
  <div class="noFlash message">It seems that you do not have the Flash player installed. Please install it, by <a href="http://www.adobe.com/go/getflashplayer" target="_parent">following this link</a>.</div>
  <div class="error404 message">Sorry, we were unable to load the game. Please try again in a few moments.</div>
</div>
```

Then, in CSS I decided to hide them both :


```css
.alternateContent .message { display:none; }
.alternateContent.noFlash .noFlash { display:block; }
.alternateContent.error404 .error404 { display:block; }
```

And finally, in Javascript I checked for the current Flash version. If it's
equal to zero, it means that Flash is not installed, so I display the `noFlash
`error message, otherwise, I guess it's a 404 error and display the other
message.


```js
var flashVersion = swfobject.getFlashPlayerVersion(),
  alternateContent = $('#alternateContent')
;
// Displaying one message or the other
if (flashVersion.minor=='0') {
  alternateContent.addClass('noFlash');
} else {
  alternateContent.addClass('error404');
}
```

This is not bulletproof : I only test for two cases. And a better solution
would also have been to put the error message dynamically using Javascript
instead of polluting the HTML markup with contradictory text.

