---
layout: post
title: "Using nested subrepos with Mercurial and TortoiseHg"
custom_v2_id: 51
---

Nowadays, when I'm developping a new website, I almost always ended using
parts and bits of the previous website I've done. All my websites are based on
the same framework (cakePHP) that I have itself updated with its own CMS
(Caracole, more on that later).

Caracole is made of several little plugins, each one of them focusing on a
simple task (like handling 404 errors, adding a recycle bin, draftable
elements, SEO-friendly url, and so on).

I've also updated each one of this plugins to BitBucket, allowing me to easily
commit changes and clone new version from one project to another.

But very often, when working on a specific project, using a specific plugin I
think that I can update the plugin (be it either by adding a new feature or
fixing a bug I've discovered). In that case, I want my changes to be added to
both the plugin (on BitBucket) and the project I'm working on at the moment.

To do that, I had to struggle my way with Mercurial because nested
repositories (called subrepos) is not a trivial setup.

## Setting up subrepo with Mercurial :

Let me show you the classical and easy way to achieve that :

First, let's say you have your main repo. You go in the directory where you
want to add your subrepo and you either create it using hg init or hg clone.

You then go back to your main repo root and edit the .hgsub file (if you don't
have this file yet, just create it). Add the following line to the .hgsub :

    
```ini
path/to/your/subrepo = path/to/your/subrepo
```

Now, on every subsequent commit Hg will be aware that your repo is holding a
new subrepo. If you omit this line, Hg will not allow you to commit
complaining about a repo inside an other repo.

You can now safely commit your main repo, or your subrepo independently.

Now, let's see the edge case.

## Changing a classical sub directory into a subrepo

The classical example above is what you can find in the Mercurial help pages.
It wasn't that helpful for me because my setup was a little different and it
was causing Hg a lot of trouble.

I was not creating a new subrepo, nor cloning a new one. I had sub diretcory
of my main app, that I wanted to change into a subrepo. My sub directory was
named 'myplugin' and I had a repo of that name hosted on BitBucket.

So I tried to delete my existing 'myplugin' directory, and clone the
'myplugin' from BitBucket, edit the .hgsub and commit but Hg aborted the
operation, complaining about the repo in repo file structure.

After a lot of testing, and [cry for
help](http://stackoverflow.com/questions/2371330/what-is-the-correct-way-to-
handle-nested-hg-repositories-with-mercurial-tortoiseh), I finally managed to
get it to work. The workflow is almost the same, with one little new step.

Deleting the 'myplugin' folder wasn't enough. I had to tell Mercurial to
completly remove this files from its index. Using TortoiseHg, I was able to do
that by right clicking on the folder, and then choosing 'TortoiseHg > Remove
Files'. Then I had to commit those changes, officially telling Mercurial to
forget this files, and putting it in a state where those files aren't there at
all.

Then only was I able to clone my repo from BitBucket, edit the .hgsub file and
commit my main repo.

