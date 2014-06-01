---
layout: post
title: "Sansa Clip+ folder merging issue"
custom_v2_id: 314
---

I own a [Sansa Clip+](http://anythingbutipod.com/2009/08/sandisk-sansa-clip-
plus-review/) as my mp3 player. It's really small, has great audio quality and
combined with a 32Go microSD card plus the internal 8Go, it's enough to hold
almost all my music library.

As with any mp3 player realeased nowadays, you can browse your files using mp3
tags. I don't really like it and feel limited in my browsing. As I'm listening
to a lot of movie soundtracks I have a pretty long list of artists with only
one song attached.

Fortunatly, the Sansa also allows you to browse by folders, which is rare
enough to be highlighted.

So far so good. Except that I've discovered a little bug a few days ago in the
way folder navigation is done.

I had two folders named `Soundtrack - Games` and `Soundtrack - Movies`. Each
were holding a dozen albums. In each of those folders I had subfolders sharing
the same prefix, like `Hitman Contracts`, `Hitman Blood Money` or `Kill Bill`
and `Kill Bill volume 2`.

When browsing my music folder on the Sansa I noticed that the `Soundtrack -
Games` folder had disappeared. I check the SD card in my computer, and it
really was there.

I finally discovered that all the `Sountracks - Games` content had been merged
in `Soundtracks - Movies` resulting in one big directory instead of two
smaller ones.

My second discovery was that all my `Hitman` sub folders were also merged into
`Hitman Contracts`, and my `Kill Bill` music was in `Kill Bill volume 2`.

It seems that when multiple directories shared the same prefix, all folders
will be merged in one whose name is the last in alphabetical order.

I'm not the only one in this case, I saw a similar report on Sandisk forums,
but the bug seems erratic. Folders does not always get merged if sharing a
prefix.

As a temporary fix, waiting for a regular fix in a firmware update, I'll
update my folder tree to use `Soundtracks/Games/Hitman/Contracts` and
`Soundtracks/Movies/Kill Bill/Volume 1` but this is far from optimal.

