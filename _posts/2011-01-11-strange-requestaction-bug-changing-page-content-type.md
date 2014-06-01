---
layout: post
title: "Strange requestAction bug changing the page Content-Type"
custom_v2_id: 257
---

Today, I thought my current project was finished. But I had this bug report in
my tracker from one of the beta-tester telling me that one of the page wasn't
rendered properly.

It says that the code source was displayed on screen instead of being rendered
as HTML. And only on Firefox.

And if that wasn't odd enough, even with the plethora of Firefox versions I
got, I couldn't reproduce the bug on my side.

## Turning off the debugger to debug

Then I had an idea. I turned off the debug mode, and was then able to
reproduce the infamous bug.

As I initially supposed, there was something wrong with the `Content-Type`
header. The Firebug Net Panel told me that it was set as `text/plain` while
the developer toolbar insisted that it was `text/html`.

After some digging in my own code, I found the culprit. A `requestAction()`
call I made as part of an update process. This `requestAction `was targeted at
a `.txt` file.

I played a little with the debug value and found that for any value above 2,
everything was working correctly, but if I set my value below that threshold,
my whole view will get displayed as `text/plain`.

I couldn't quite explain why a debug value will have anything to with the view
rendering. I even disabled the Debug Kit component, just to be sure.

## Digging into cake world

And then I decided to follow the dispatch trace to find where the debug value
was being used. After a long journey, I got to the `respondAs `method of the
`RequestHandler `component.

And specifically, to that part :

    
    if (Configure::read() < 2 && !defined('CAKEPHP_SHELL')) {  
    	$this->_header($header);  
    }

Ok, so there was my debug value. Exactly the code reponsible for my symptoms.
Well, I still don't understand WHY someone wanted to add an header based on
the debug value, but I could easily understand HOW it made my view that ugly.

The `requestAction `was being dispatched all along the way to its final
action, firing the `RequestHandler `component on its way. Its extension being
`.txt`, `RequestHandler `will fire its `respondAs` method and set the
appropriate header.

Unfortunatly, setting such an header in a `requestAction `wasn't useful for
the request, and additionnaly, it was messing with the primary view dispatch
path.

## Solution

I[ reported the
bug](http://cakephp.lighthouseapp.com/projects/42648-cakephp/tickets/1445
-requestaction-may-change-the-current-layout-depending-on-debug-value) hoping
for a fix in a future version. For the time being, I manually set the debug to
2 before calling my `requestAction`, and set it back to its previous value
after in my app.

And for why it was only buggy on Firefox, it was caused by a double header
definition. A first header was telling `text/plain` and a second one`
text/html`. I guess Firefox uses the first one while other browsers the last.
This is what made Firebug and the Developer Toolbar return different results
too.

  

