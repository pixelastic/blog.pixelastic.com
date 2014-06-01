---
layout: post
title: "Updated CSSTidy files"
custom_v2_id: 67
---

CSSTidy allows you to optimize your CSS files by aggregating them in one
unique file, removing useless spaces and comments as well as running some
other optimizations on multiple declarations and shorthand notations.

But if, like me, you're still using the 1.3 version available on the official
website, you may have run into issues when dealing with the latest CSS3
goodies.

I've been hacking this library in the last year, adding support for `@font-
face` and for proprietary prefixed properties values, but today I was faced
with some other issues that I wasn't able to resolve.

CSSTidy does not use regexp to parse the file, it reads it one char at a time
and does its optimization at the same time, and it is sometimes quite hard to
follow.

Anyway, I just discovered that the Sourceforge page of the project is still up
and running and that a commit was added today, so the project is not dead ! I
also posted two bug reports and one (dummy) patch.

Here's the link, you got a download link at the bottom :
http://csstidy.svn.sourceforge.net/viewvc/csstidy/trunk/

