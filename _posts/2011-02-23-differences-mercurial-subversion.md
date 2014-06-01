---
layout: post
title: "Differences between Mercurial and Subversion"
custom_v2_id: 265
---

People at my current job are using Subversion, and our project will be tracked
using it. I never used Subversion before, the only versionning system I ever
used was Mercurial. And moving from one to the other meant changing a lot of
reflexs I had.

Here is a little list of changes, mostly as a reminder for myself.

## Directories

Mercurial uses a single `.hg` directory at the root of your project to store
all your project history while Subversion adds multiple `.svn` directories in
each directory, to track history changes to that directory only.

I prefer the Mercurial approach, it keeps all changes centralized in one
place. You can simply remove the `.hg` directory to transform your versionned
version into a stand-alone one.

While the Subversion approach litters your app with countless hidden
directories, making copy and pasting a real pain.

## Centralised vs Distributed

Subversion is centralised while Mercurial is distributed.

As far as I understand the difference, it means that Subversion uses one main
directory to store the versionned version and can deploy (export) a specific
revision at anytime.

That revision do not hold any history information, it is only a copy of your
project at a given time.

On the other hand, each Mercurial repository holds both the current public
version and all the history. You do not have to deploy anything anywhere,
just `update` your current repo with data from one of the revision.

## Tortoise

I am using both TortoiseSVN and TortoiseHg. When you commit with TortoiseSVN
it displays the list of files that where updated since the last commit. If you
added new files, they won't show unless the "Show unversionned files" is
checked.

In TortoiseHg, all new files are automatically seen in the commit window, as
well as a diff. It allows me the easily see what changes where made, and help
me write my commit message.

I really like the TortoiseHg vision better.

## Tracking directories

Subversion can track empty directory, just by adding them. Mercurial can't.
You have to add an empty file in each to allow tracking.

Also, when doing a commit in a specific directory in Mercurial, it will commit
the whole repo, while with Subversion it will only commit the current repo. I
can see the benefits of both and I'm not quite sure which is better.

Subversion will allow me to do a commit of one special feature by committing
only one directory, but the TortoiseHg integration help me doing commits more
easily no matter where I'm browsing.

## Ignoring files

I have some files in my project I don't want to track (like auto-generated
cache files). In Mercurial, all I need is editing the `.hgignore` file with
regexps. The syntax can be a little strange sometimes, it took me a while to
correcly understand it, but it definitely works.

On Subversion, I can add files to the ignore list so they don't show as
"unversionned", but I can also add a `svn:ignore `property to a specific
directory to set regexp to files that I don't want to track. The end result is
the same, but the way Mercurial handle it with one file is more appealing to
me.

## Conclusion

Having all history in one dir and all ignore rules in one files seems a better
approach to me. I guess on some aspects Mercurial is still more centralised
than Subversion.

