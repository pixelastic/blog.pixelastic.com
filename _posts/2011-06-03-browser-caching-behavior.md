---
layout: post
title: "SWF caching issues accross browsers"
custom_v2_id: 287
---

Here are some quick notes on various browser caching behavior. I was fiddling
with Wireshark to optimise my caching strategy and found some quirks one
should be aware of.

First, let's define some reload vocabulary.

  * **initial load** is the first time the page is loaded, when the cache is empty.
  * **hard reload** is the classical reload. Clicking the Reload icon, or pressing Ctrl+R / F5.
  * **link reload** is when the page is loaded again after you click on a link to it
  * **soft reload** will be loading the page again by pressing enter in the address bar
  * **navigational reload** is the reloading of a page that occurs while using the previous/next buttons.

For the rest of this blog post, we will assume an HTML page loading the same
.jpg file multiple times and the same swf file multiple times too (we will use
both IE specific and general swf markup).

The html itself is not cached.

Also, all those static assets will have a `Cache-Control:max-age=29030400`
header.

All the network tests have been made using Wireshark.

## Chrome

**Initial load** : Download of jpg and swf once each. Perfect.

**Link reload & navigational reload**: Nor jpg nor swf is loaded again. Perfect.

**Soft reload & hard reload **: The jpg is downloaded again but not the swf. Chrome sends a `Cache-Control:max-age=0` header to the jpg request, to force loading it again.

Reloading images is a standard behavior on images, but I wouldn't have
expected it on soft reloads.

## Safari 5 Win

Safari behaves much like Chrome, with one important difference. It does not
cache swf files at all.

**Initial load** : The jpg gets downloaded perfectly, but the swf gets downloaded multiple times, one per instance.

**Link reload & navigational reload** : The jpg is correctly fetched from cache, but the swf are all downloaded again. No swf is ever cached.

**Soft reload & hard reload** : Much as Chrome, Safari forces the reload of the jpg here. As you might guess, it also reload all the swf too, multiple times.

It means that Safari 5 does not cache any swf file at all. That's pretty
impressive.

This same caching bug is talked about [on this other
blog](http://don.blogs.smugmug.com/2008/04/04/nasty-bug-safari-doesnt-cache-
stuff/). I've also tried including flash files from within another flash file
(much like the [Satay method](http://www.alistapart.com/articles/flashsatay)).
The results are the same : no swf flash is ever cached, even in the same html
request.

It is supposed to have been fixed in Safari Mac (anyone can confirm this? I
don't own a Mac) but the issue is still here on Safari Windows.

## IE6, IE7 and IE8

IE6, IE7 and IE8 behaves the same here. They have a less severe version of the
bug than Safari 5. At the time of writing I didn't have IE9 to test on it.

**Initial load** : Same bug as Safari here. The swf are downloaded multiple times, once for each instance. The jpg is only download once.

**Link reload, navigational reload and soft reload** : This time, everything is fetched from the cache. Actually, even the html is seems fetched from cache (I didn't investigate that much)

**Hard reload** : Html and jpg are fetched from the server, swf file stays in the cache.

It appears that (surprisingly) IE behaves quite well. Its caching behavior is
more aggressive than the others (soft reload is really soft). However, it
still have a nasty side effect of loading swf files multiple times on the same
page. Shouldn't happen a lot in the real world, but still nice to know.

## Firefox 4.0

**Initial load** : No issue arising. It does fetch each resource once.

**Link reload, navigational reload and soft reload** : Fetches everything from cache, nice.

**Hard reload** : Re-request jpg and swf files by adding a `Cache-Control: max-age=0` request header. This feels like the expected behavior.



  

