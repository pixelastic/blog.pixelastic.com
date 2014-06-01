---
layout: post
title: "Aborting an AJAX request with jQuery"
custom_v2_id: 229
---

<p>I needed a way to abort a pending AJAX request. I had a dialog box loaded through AJAX, but I let my users the possibility to close the window before it was completely loaded.</p>
<p>I thought I could easily cancel a request using jQuery but it appears that there is no method to do that. I had to instead directly call the <code>.abort()</code> method on the XHR object returned by <code>$.ajax</code>.</p>
<p>What I learned was that aborting an XHR request still triggered the jQuery ajax <code>complete </code>callback, and even passed a <code>success</code> as second argument.</p>
<p>My complete callback was supposed to display the loaded window, so I really didn't want it to fire if the user closed the loading window.</p>
<p>I finally had to check on the <code>XHR.status</code> property (200 if ok, 0 if aborted) to manually stop the <code>complete </code>callback.</p>
<p>It felt surprising at first that an abort call is not intercepted as an error, but after a little more thinking, it is logical. An abort is something that the user asked for, so it shouldn't be considered an error (which is something that no one ever asked for).</p>
<p>On the other hand, it feels strange to consider an abort as a success too. I guess the jQuery team didn't have a lot of request for an edge case like abort and didn't wrap their API around it, leaving us with the low level XHR object instead.</p>