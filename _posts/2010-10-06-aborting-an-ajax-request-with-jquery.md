---
layout: post
title: "Aborting an AJAX request with jQuery"
custom_v2_id: 229
---

I needed a way to abort a pending AJAX request. I had a dialog box loaded
through AJAX, but I let my users the possibility to close the window before it
was completely loaded.

I thought I could easily cancel a request using jQuery but it appears that
there is no method to do that. I had to instead directly call the `.abort()`
method on the XHR object returned by `$.ajax`.

What I learned was that aborting an XHR request still triggered the jQuery
ajax `complete `callback, and even passed a `success` as second argument.

My complete callback was supposed to display the loaded window, so I really
didn't want it to fire if the user closed the loading window.

I finally had to check on the `XHR.status` property (200 if ok, 0 if aborted)
to manually stop the `complete `callback.

It felt surprising at first that an abort call is not intercepted as an error,
but after a little more thinking, it is logical. An abort is something that
the user asked for, so it shouldn't be considered an error (which is something
that no one ever asked for).

On the other hand, it feels strange to consider an abort as a success too. I
guess the jQuery team didn't have a lot of request for an edge case like abort
and didn't wrap their API around it, leaving us with the low level XHR object
instead.

