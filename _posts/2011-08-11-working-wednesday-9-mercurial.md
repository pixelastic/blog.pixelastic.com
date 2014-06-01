---
layout: post
title: "Working on Wednesday #9 : Mercurial"
custom_v2_id: 303
---

_I'm feeling like I'm getting more and more behind schedule for what I
intended to do at first. I still haven't tried Rails more than that and have
gone on different learning side projects._

_I've been reading the _[Mercurial : Definite Guide](http://hgbook.red-
bean.com/read/) the past few days to get a correct grasp of the soft.

I've been using Mercurial for the pas two years, but through a GUI and without
using any "advanced" features. I never branched a project, and always worked
alone.

## Commands

Now that I'm working on a Linux machine every day, I can use hg through the
command line.

`hg commit -Am "commit message"` is the same as `hg addremove; hg commit -m
"commit message".`

`hg rollback` will remove the last local commit. Useful if you forgot files in
the commit, or if you inserted a typo in your commit message

`hg revert` can revert a file or set of files to the state they were at the
last commit. This can also cancel a `hg add` or `hg remove`

`hg backout` can "forget" a commit in the history. It will not really forget
the commit (ie. will not let you alter the history). Instead, it will create a
new commit where the specified changeset is removed (through a merge). It can
easily backout the tip, but may involve more merge work if we want to backout
an old changeset.

## Automation

Also, I've learned about two great tools of Mercurial.

`hg bisect` let you isolate a specified commit in your history where you
introduced a specific bug. You write a piece of code that, given a changeset,
returnsÂ `true` or `false` based on the bug presence, and `hg bisect` will
cleverly scan the history to find the revision that introduced the bug.

hooks where also very interesting. One can script automatic command on
specific hg command like `commit`, `pull`, `push`. Or even before those
commande to refuse the command if something does not work as expected.

The classical examples where running a build process after a commit, refusing
a commit if no bug id where specified, or if the tests didn't pass. Another
use case would be to push changes to a remote server on commit.

## Git

Why am I learning Mercurial while all the cool guys are using git ?

Well, I've read a lot of papers comparing hg to git. What I've read the more
is that git is an awesome toolbox that lets you do whatever you want with your
version control, through its 100+ tools.

On the other hand, Mercurial is far easier to learn and has built-in command
for the day to day work. As I was already quite familiar with Mercurial, I
stick with it, but know that I'll learn git also eventually.

Â

