---
layout: post
title: "Migrating to Jekyll"
tags:
---

You might have noticed that the skin of the website changed. Actually, I've
updated pretty much every aspect of the stack underneath.

This was a cakePHP blog, it is now a static site generated through
[Jekyll](http://jekyllrb.com/). This was a custom skin, this is now heavily
based on [Hyde](https://github.com/poole/hyde). This was versioned using
Mercurial, and is now using Git (and the [source code is available on
GitHub)](https://github.com/pixelastic/blog.pixelastic.com). And finally, it
was hosted on a shared host on Dreamhost and is now served by a private
[ks-3](https://www.kimsufi.com/).

No more mysql database for the posts, everything is now simple markdown files.
This is much more easier to commit and backup, and it is also much more easier
for me to write posts, as I only need a text editor.

I had to create an nginx config file to handle all the redirects from the
previous urls. At first I thought of hosting it on GitHub Pages, but as my
Jekyll install is quite personalized (tags, archives, etc) I needed more
flexibility, so in the end I build the website locally and rsync the output to
the server.

One of the main features missing from this new version is the ability to leave
comments. I'm working on it.

