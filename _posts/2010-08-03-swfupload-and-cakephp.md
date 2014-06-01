---
layout: post
title: "SWFUpload and cakePHP"
custom_v2_id: 208
---

One thing that always sent me an awful hours of debugging is the fact that the
Flash player identify itself as a whole different browser that the one it is
integrated into.

I've ran into this issue multiple times when dealing with SWFUpload and today
was one more. As I always spent quite a lot of time debugging issues arising
from this, I guess I should post about it here.

## The Flash player uses a different userAgent that your browser

Most of the time, this is not a problem. But when dealing with restricted
areas of a website built on top of cakePHP, it can become one.

The thing is that as the `userAgent `string used by the Flash player is not
the same as the one used by your browser. So, when you make a request to your
site, cake will see that as whole new request and you won't be able to access
your current session variables.

As you can't overwrite the `userAgent `hash sent, you need to send the
`sessionId `along with your flash request. That way, you'll be able to call a

    
```php
$this->Session->id($sessionId);  
$this->Session->start();
```

in your controller `beforeFilter `(or component `initialize`)

_In cake 1.2, you'll also have to call `$this->Session->destroy()` before to
delete the Flash session created._

## The Flash player uses a different cookie pool that your browser

_This used to be an issue in 1.2 but not longer is._

Cake stores in a cookie the name of the session you're supposed to use. Flash
having its own cookie pool, it will save its own cookie (usually somewhere you
don't even know) and will always check for the session specified inside.

This took me quite a long time to found out why the flash request where
reading an other request that the one I was setting.

In 1.2, you needed to delete the cookie created by cake whenever you made a
flash request to avoid conflicts

    
```php
setcookie(Configure::read('Session.cookie'), '', time() - 42000, $this->Session->path);  

```

## cakePHP used to overwrite the userAgent string in session

In cake 1.2, when you manually change the current session, cake would update
the inner `userAgent `hash saved to your current userAgent hash.

This meant that whenever you were moving from the Flash session to the correct
session, you had to overwrite the `userAgent `hash to the correct one.

    
```php
$this->Session->write('Config.userAgent', $userAgent);  

```

_This is no longer the case in 1.3, changing the current session does not
alter it anymore._

## Doesn't all that stuff alter security ?

Well, most of the answers I found online were among the lines of "Just disable
the check of the `userAgent`", so I think my method is a little bit more
secure.

Anyway, passing a `sessionId `as a parameter seems a little risky, even to me.
I guess there should be a way of encrypting it to not pass it as clear text

## UPDATE !

I had to fiddle with this script some more. It appears that, as we are
changing the `sessionId`, we need to do that BEFORE we access the session. It
means that any call to `Session::read()` or `Session::check()`, or almost any
other Session method BEFORE setting the id will block this trick from working.
So, make sure that this code is executed before anything else, put it in a
component that will be loaded first.

It also appears that if you follow my advice, you'll only have to call
`id($sessionId)`, and none of the hocum pocum about `destroy`, `write `and
`userAgent `hashes I talked about...

I just lost some hours finding this out. I add a call to Session in my `I18n
`component that was rendering this whole fix useless. It was driving me
crazy...

