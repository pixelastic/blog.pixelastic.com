---
layout: post
title: "Making Flash and Javascript speaks to each other"
custom_v2_id: 268
tags: flash, javascript, externalinterface, swfobject, allowdomain
---

I needed a Flash app and my Javascript code to be able to communicate. The
Flash needed to call some methods in the Javascript, and in turn the
Javascript needed to inject back some data into the Flash.

I let my Flash coder colleague took care of the Flash side, he needed to
implement ExternalInterface, register some callbacks methods that I could call
and more importantly change some security settings to make it work.

On my side, I just needed to get the `object `element holding the Flash
(thanks to `swfobject.getObjectById` it was pretty easy) and call the callback
method registered in Flash on it.

Piece of cake.

Have a look at this [blog post from CircleCube](http://circlecube.com/2010/12
/actionscript-as3-javascript-call-flash-to-and-from-javascript/), it does a
pretty neat job at explaining all of that.

Update :

I finally had some issues with this implementation. It was working perfectly
on some servers but not on others. We finally found that calling
Security.allowDomain('*.mainhost.com') wasn't working.

You have to explicitly allow each domain/subdomain.

As our code would be deployed on various duplicate domains, we had to manually
pass as a flash var the domain to allow.