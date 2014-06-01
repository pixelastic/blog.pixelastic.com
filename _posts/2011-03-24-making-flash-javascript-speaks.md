---
layout: post
title: "Making Flash and Javascript speaks to each other"
custom_v2_id: 268
---

<p>I needed a Flash app and my Javascript code to be able to communicate. The Flash needed to call some methods in the Javascript, and in turn the Javascript needed to inject back some data into the Flash.</p>
<p>I let my Flash coder colleague took care of the Flash side, he needed to implement ExternalInterface, register some callbacks methods that I could call and more importantly change some security settings to make it work.</p>
<p>On my side, I just needed to get the <code>object </code>element holding the Flash (thanks to <code>swfobject.getObjectById</code> it was pretty easy) and call the callback method registered in Flash on it.</p>
<p>Piece of cake.</p>
<p>Have a look at this <a href="http://circlecube.com/2010/12/actionscript-as3-javascript-call-flash-to-and-from-javascript/">blog post from CircleCube</a>, it does a pretty neat job at explaining all of that.</p>
<p>Update :</p>
<p>I finally had some issues with this implementation. It was working perfectly on some servers but not on others. We finally found that calling Security.allowDomain('*.mainhost.com') wasn't working.</p>
<p>You have to explicitly allow each domain/subdomain.</p>
<p>As our code would be deployed on various duplicate domains, we had to manually pass as a flash var the domain to allow.</p>