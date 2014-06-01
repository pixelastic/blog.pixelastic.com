---
layout: post
title: "PHP sessions and the Pragma:no-cache header"
custom_v2_id: 283
---

You may have seen the `Pragma:no-cache` response header on various website (if
you're that kind of guy actually reading HTTP response headers...).

What you may not know is that this Header doesn't actually exists. The Pragma
header [is supposed to
be](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.32) **Request
**header, not a **Response **header.

It is not only useless, it may also trigger strange caching bugs in IE6. I'm
sure you know what kind of IE6 quirks I'm talking about. The best is to remove
it, just to be sure.

This is a common misconception (I myself didn't know that before reading [this
excellent caching tutorial](http://www.mnot.net/cache_docs/)), and that header
is still returned in a lot of request.

For example, if you set your `session.cache_limiter` to `nocache `in your
`php.ini`, then PHP will send this header (as defined in the
[session_cache_limiter](http://ca.php.net/manual/en/function.session-cache-
limiter.php) doc. This is obviously wrong.

It also adds a weird `Expires: Thu, 19 Nov 1981 08:52:00 GMT` header. I don't
like it as it allow easy fingerprinting of the server-side technology used.

I changed my `session.cache_delimiter` value to `private_no_expire` to return
better headers.

First, it removed the useless `Pragma`, but it also removes the `Expires
`header (`Cache-Control` is enough).

