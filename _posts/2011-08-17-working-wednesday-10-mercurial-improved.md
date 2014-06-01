---
layout: post
title: "Working on Wednesday #10 : Mercurial improved"
custom_v2_id: 304
---

Today I enjoyed the nice blue sky and moved to the park at the end of my
street to finish reading the Mercurial guide.

I skipped the last chapters about patches and queues. I know this would be
useful, but I'd rather get back to them when I'll need them instead of try
them without any real world example.

## Tweaking Mercurial

I updated my `.hgrc` to configure it as best as I could.

I set `vimdiff` to handle the conflicted merge. `vim` is quite hard to get
(but it is coming easier the more you use it), but it seems so powerful that
I'm willing to spend some time learning it.

I've also added a `cm` alias to `commit -Am`. This basically is the same as
calling `hg addremove; hg commit` which I happen to do all the time before.

I've create two simple styles and matching templates for my new two aliases
`peek` and `hist` that repectively display a peek at the last 4 commits, and
display the latest 10 commits in history in a concise way. I still have to
manage to find how I could add coloring to those.

I've also added a `discardlocal` alias to remove all local commit and get the
repo back as it is on the remote repo. I never actually had to use it, but I
found the code on Stack Overflow and thought I might need it later.

I finally wrote a custom `resurect` method. It will bring back a deleted file
(obviously, the file needs to be tracked by hg). I simply find the changeset
that deleted the file, and then revert the file to the parent changeset of
that changeset. I might post the exact code later as I'm quite happy with the
result.

## A note on laptop screens

Also, I've spent the last few weeks working on my netbook when at home. This
is very tiny thing, the screen is really small (compared to my two 21" at work
for example). But (and I was the first surprised of it), you actually get
accustomed to it after a while.

Now that I'm writing this post on my 13" other laptop, I feel like it's huge.
The more I use the netbook, the more I like it. I didn't quite use it back
when it was running Windows because it was way too slow. Now with Ubuntu on
it, it's a whole new story !

## Next week

I still have some zsh to learn. I still don't quite get the quote and double
quote differences, and a few other quirks (arithmetic, arrays, etc).

I've kinda dropped the Rails tutorial. I liked it. Really, I liked it a lot.
But I'm not sure I want to start again learning a framework for making
websites. I've made a living doing websites for clients, I still do partly
that today, and I'd like to change.

I have a lot of personnal project on my mind that I'd like to achieve. Almost
all of them could be achieved using the traditional way of making websites
that both cake and Rails would allow. But one of them might need another way
to look at things. And for this one, I might better need node.

So.. maybe I'll start learning node next week. This is actually something I'd
love to do, so this might happen. I'm currently refactoring the JS code of my
work app in Backbone at the moment, so I guess there's no perfect time for
some JS practice.

