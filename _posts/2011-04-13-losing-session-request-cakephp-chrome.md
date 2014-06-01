---
layout: post
title: "Losing session on each request with cakePHP and Chrome"
custom_v2_id: 273
---

<p>I finally found solution for one of the more tenacious bug I ever encountered. Share the joy !</p>
<p>I had a website working perfectly under Firefox but when browsing using Chrome, I noticed that my Session gets regenerated on each page load. <strong>Constantly</strong>. Creating hundred and hundred of useless session files.</p>
<h4>And only with Chrome.</h4>
<p>Since when using a browser should change the server behavior ? Well I don't exactly know what Chrome is doing with the <code>referer</code> but it seems that it is altering it in some ways.</p>
<p>And cakePHP forces the setting of <code>session.referer_check</code> to <code>true</code>, thus checking that multiple requests with the same PHPSESSID comes from the same url.</p>
<p>As one posted on php.net :</p>
<blockquote>
<p>If you have a value specified for session.referer_check you may run into difficulty when someone accesses your site and attempts to log in with a mis-capitalized URL.  The logon will fail because any calls to session_start() will result in the existing session being trashed and a new one being created.  This becomes a bigger problem when the logon is followed by a header("Location: ...") redirect, because the session_start() at the top of the page will fail.</p>
</blockquote>
<p>Those two settings combined, and you got a hell of a mess. I first found a quick fix by forcing the setting of <code>session_start()</code> in <code>app/webroot/index.php</code>. But after more <a href="http://www.nirvaat.com/blog/web-development/session-issue-in-iis-with-cakephp/">reading </a>and <a href="http://freetofeel.com/page15/">debugging </a>I finally found the culprit.</p>
<h4>Hacking your way through the fix</h4>
<p>There is no easy way to prevent cake from setting this setting, but you can define your own session handler in the <code>Session.save</code> configure key.</p>
<p>Just create file named <code>session_custom.php</code> in <code>app/config/</code> and set <code>Configure::write('Session.save', 'session_custom');</code> in your <code>core.php</code> file.</p>
<p>And in that file, just drop the following lines (copy/paste from <code>cake_session.php</code>)</p>
<pre><code lang="php">ini_set('session.referer_check', '');                    // Killing this f***ing config that was causing so much trouble with Chrome<br />ini_set('session.use_trans_sid', 0);                    // No session id in url<br />ini_set('session.name', Configure::read('Session.cookie'));    // Using custom cookie name instead of PHPSESSID<br />ini_set('session.cookie_lifetime', $this-&gt;cookieLifeTime);    // Cookie like time, depending on security level<br />ini_set('session.cookie_path', $this-&gt;path);                // Cookie path</code></pre>
<p> </p>