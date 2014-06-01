---
layout: post
title: "PHP sessions and the Pragma:no-cache header"
custom_v2_id: 283
---

<p>You may have seen the <code>Pragma:no-cache</code> response header on various website (if you're that kind of guy actually reading HTTP response headers...).</p>
<p>What you may not know is that this Header doesn't actually exists. The Pragma header <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.32" target="_blank">is supposed to be</a> <strong>Request </strong>header, not a <strong>Response </strong>header.</p>
<p>It is not only useless, it may also trigger strange caching bugs in IE6.  I'm sure you know what kind of IE6 quirks I'm talking about. The best  is to remove it, just to be sure.</p>
<p>This is a common misconception (I myself didn't know that before reading <a href="http://www.mnot.net/cache_docs/" target="_blank">this excellent caching tutorial</a>), and that header is still returned in a lot of request.</p>
<p>For example, if you set your <code>session.cache_limiter</code> to <code>nocache </code>in your <code>php.ini</code>, then PHP will send this header (as defined in the <a href="http://ca.php.net/manual/en/function.session-cache-limiter.php" target="_blank">session_cache_limiter</a> doc. This is obviously wrong.</p>
<p>It also adds a weird <code>Expires: Thu, 19 Nov 1981 08:52:00 GMT</code> header. I don't like it as it allow easy fingerprinting of the server-side technology used.</p>
<p>I changed my <code>session.cache_delimiter</code> value to <code>private_no_expire</code> to return better headers.<br />First, it removed the useless <code>Pragma</code>, but it also removes the <code>Expires </code>header (<code>Cache-Control</code> is enough).</p>