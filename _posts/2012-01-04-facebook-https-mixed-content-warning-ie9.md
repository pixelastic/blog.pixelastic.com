---
layout: post
title: "Facebook https mixed content warning on IE9"
custom_v2_id: 330
---

When browsing the web, you might have seen a "mixed content warning" popup
show in your browser. They are most of the time poorly worded and their
meaning is quite obscure.

What it means is that your are currently browsing a page with both `http `and
`https `content. Typically, if your page is `https `but one of the css, js or
image file it contains is requested through `http`, the warning will pop.

_(It's interesting to note here that not all assets are treated equal. Loading
a flash movie through `http `does not trigger the warning)._

## The IE special case

Now, what's special about IE is that it also trigger the mixed content warning
when content is the other way around. If you're serving a page through `http
`and load assets through `https`, it will consider it a mixed content too.

In a sense, that's logical, but it needlessly prompt the user with a dialog
that block downloading of all `https `assets until confirmed.

The solution is to make sure that all your assets are loaded with the same
protocol as the host page. An easy way to do so is to use the `//` relative
protocol url. This will use `http `or `https `automatically based on the page
protocol.

## And adding Facebook to the mix

A few months ago, Facebook forced all apps to serve content through `https`.
In the meantime, they suggested that all their users browse their website
using `https `too.

Unfortunatly for us, some of our own users had bookmarks in their browsers and
Facebook pages referencing our old
[http://apps.facebook.com/appname/](http://apps.facebook.com/appname/) url.
And following that link triggered the dreaded mixed content warning in IE.

When accessing this page, Facebook was loaded in classic `http `but our inner
iframe was loaded through `https`. So far, so good.

The problem came from one of Facebook own javascript SDK included in our app.
This script loaded other scripts based on what it needed.

Unfortunatly, it loaded the other scripts from an `http `(not `https`) server.
The SDK has two distinct sets of urls, based on the current page protocol.

It was wrongly considering being in an `http `page, not an `https `one, and
thus used the wrong set of urls. This confusing comes from the fact that it
checks the top page protocol instead of checking the current page protocol.

After some googling, I found a solution that consisted in forcing the SDK to
consider that we are in `https `mode by calling : `FB._https = true` before
the call to` FB.init()`

## Almost there

If correctly forced FB to use the correct set of urls, thus removing the mixed
content warning. And I almost thought it would be that easy.

It was not.

This did not fixed the payment popup. All Facebook UI element loaded correctly
(feeds, permissions, requests), but the payment popup.

I couldn't find a way to fix that, so I reverted to a more brutal approach.

## Final and brutal solution

All my problems came from the fact that FB thought we were serving `http
`while in fact we were serving `https`. So the solution, might be to force FB
to serve `https `from start to end.

I wanted to detect if the page was loaded through
[http://apps.facebook.com/appname/](http://apps.facebook.com/appname/) or
[https://apps.facebook.com/appname/](https://apps.facebook.com/appname/).

Unfortunatly, due to cross domain restrictions in Javascript, we are not able
to read, from inside and iframe, the parent frame properties. So I couldn't
read `top.location.protocol` to easily check if I needed to redirect.

But, as I mentionned earlier, `FB._https` incorrectly report that we are not
in `https `because it checks the top protocol. So I used this var, to know if
the parent frame was in the correct protocol or not. Using this own FB bug to
fix itself.

Now, for the redirect : even if I couldn't read the` top.location`, I could
modify it. I just had to call `top.location.url =
'https://apps.facebook.com/appname/'` to redirect the whole page.

I hardcoded the app url because there was no way to get it from js, and I took
care of keeping any GET parameter passed before the redirect, and I ended up
with this :

    
```js
if (!FB._https) {  
  var appUrl = 'https://apps.facebook.com/appname/';  
  var iframeUrl = location.protocol+'//'+location.host+location.pathname;  
  var redirectUrl = location.href.replace(iframeUrl, appUrl);  
  top.location.href = redirectUrl;  
  return;  
}  
FB.init(options);
```

## Conclusion

I'm not really proud of this solution, as it is mostly a hack and will force a
useless loading of the http version before loading the https one, but that's
the best I've found. If any of you have a better solution, feel free to
comment.

