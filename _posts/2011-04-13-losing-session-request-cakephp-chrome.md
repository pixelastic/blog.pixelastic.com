---
layout: post
title: "Losing session on each request with cakePHP and Chrome"
custom_v2_id: 273
---

I finally found solution for one of the more tenacious bug I ever encountered.
Share the joy !

I had a website working perfectly under Firefox but when browsing using
Chrome, I noticed that my Session gets regenerated on each page load.
**Constantly**. Creating hundred and hundred of useless session files.

## And only with Chrome.

Since when using a browser should change the server behavior ? Well I don't
exactly know what Chrome is doing with the `referer` but it seems that it is
altering it in some ways.

And cakePHP forces the setting of `session.referer_check` to `true`, thus
checking that multiple requests with the same PHPSESSID comes from the same
url.

As one posted on php.net :

> If you have a value specified for session.referer_check you may run into
difficulty when someone accesses your site and attempts to log in with a mis-
capitalized URL.  The logon will fail because any calls to session_start()
will result in the existing session being trashed and a new one being created.
This becomes a bigger problem when the logon is followed by a
header("Location: ...") redirect, because the session_start() at the top of
the page will fail.

Those two settings combined, and you got a hell of a mess. I first found a
quick fix by forcing the setting of `session_start()` in
`app/webroot/index.php`. But after more [reading ](http://www.nirvaat.com/blog
/web-development/session-issue-in-iis-with-cakephp/)and [debugging
](http://freetofeel.com/page15/)I finally found the culprit.

## Hacking your way through the fix

There is no easy way to prevent cake from setting this setting, but you can
define your own session handler in the `Session.save` configure key.

Just create file named `session_custom.php` in `app/config/` and set
`Configure::write('Session.save', 'session_custom');` in your `core.php` file.

And in that file, just drop the following lines (copy/paste from
`cake_session.php`)

    
    ini_set('session.referer_check', '');                    // Killing this f***ing config that was causing so much trouble with Chrome  
    ini_set('session.use_trans_sid', 0);                    // No session id in url  
    ini_set('session.name', Configure::read('Session.cookie'));    // Using custom cookie name instead of PHPSESSID  
    ini_set('session.cookie_lifetime', $this->cookieLifeTime);    // Cookie like time, depending on security level  
    ini_set('session.cookie_path', $this->path);                // Cookie path


