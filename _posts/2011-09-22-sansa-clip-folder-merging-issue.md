---
layout: post
title: "Sansa Clip+ folder merging issue"
custom_v2_id: 314
---

<p>I own a <a title="Sansa Clip+ review on abi" href="http://anythingbutipod.com/2009/08/sandisk-sansa-clip-plus-review/" target="_blank">Sansa Clip+</a> as my mp3 player. It's really small, has great audio quality and combined with a 32Go microSD card plus the internal 8Go, it's enough to hold almost all my music library.</p>
<p>As with any mp3 player realeased nowadays, you can browse your files using mp3 tags. I don't really like it and feel limited in my browsing. As I'm listening to a lot of movie soundtracks I have a pretty long list of artists with only one song attached.</p>
<p>Fortunatly, the Sansa also allows you to browse by folders, which is rare enough to be highlighted.</p>
<p>So far so good. Except that I've discovered a little bug a few days ago in the way folder navigation is done.</p>
<p>I had two folders named <code>Soundtrack - Games</code> and <code>Soundtrack - Movies</code>. Each were holding a dozen albums. In each of those folders I had subfolders sharing the same prefix, like <code>Hitman Contracts</code>, <code>Hitman Blood Money</code> or <code>Kill Bill</code> and <code>Kill Bill volume 2</code>.</p>
<p>When browsing my music folder on the Sansa I noticed that the <code>Soundtrack - Games</code> folder had disappeared. I check the SD card in my computer, and it really was there.</p>
<p>I finally discovered that all the <code>Sountracks - Games</code> content had been merged in <code>Soundtracks - Movies</code> resulting in one big directory instead of two smaller ones.</p>
<p>My second discovery was that all my <code>Hitman</code> sub folders were also merged into <code>Hitman Contracts</code>, and my <code>Kill Bill</code> music was in <code>Kill Bill volume 2</code>.</p>
<p>It seems that when multiple directories shared the same prefix, all folders will be merged in one whose name is the last in alphabetical order.</p>
<p>I'm not the only one in this case, I saw a similar report on Sandisk forums, but the bug seems erratic. Folders does not always get merged if sharing a prefix.</p>
<p>As a temporary fix, waiting for a regular fix in a firmware update, I'll update my folder tree to use <code>Soundtracks/Games/Hitman/Contracts</code> and <code>Soundtracks/Movies/Kill Bill/Volume 1</code> but this is far from optimal.</p>