---
layout: post
title: "Installing mitmproxy"
custom_v2_id: 345
---

I spend the last hour trying to install [mitmproxy](http://mitmproxy.org/).
This is supposed to be a commandline proxy to intercept, read, edit and replay
HTTP(S) requests. I say "supposed" because I haven't had the chance to try it
so far as I was blocked on a compilation error.

According to [the official
documentation](http://mitmproxy.org/doc/install.html), installing mitmproxy
should be as easy as `pip install mitmproxy`. Being new to using `pip`, I
first had to install it (`sudo apt-get install python-pip`) and figure out
that one need to install stuff with `pip` using `sudo`.

But `sudo pip install mitmproxy` resulted in charming compilation errors in my
case. Something along the lines of :

    
```sh
src/lxml/lxml.etree.c:16:20: fatal error: Python.h: No such file or directory  

```

After a bit of googling, I understood that the issue was some missing headers
on my part. After running `sudo apt-get install python-dev` I was good to run
a `sudo pip install mitmproxy` again.

Next step will be to configure the beast and learn how to use it.

