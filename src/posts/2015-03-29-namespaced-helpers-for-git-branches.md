---
layout: post
title: "Namespaced helpers for git branches"
tags: git
---

I use `git` everyday and I often need to switch between branches, create one
when I start a feature, then delete it afterwards. I need to know which branch
I'm currently in, and the list of all available branches.

The bare git commands to do all that are not the easiest to remember.
Sometimes you have to call `git branch`, sometimes it's `git checkout` or `git
show-branch`.

I've created a bunch of aliases to prevent me from having to remember the exact
commands, and abstracting them under a `git branch-*` namespace. I now simply
need to type `git branch-list` to list all my branches, `git branch-delete foo`
to delete the `foo` branch or `git branch-exists bar` to check if the `bar`
branch exists.

## Quick note about aliases

You can create aliases in two different ways. Either you create a new entry in
your `~/.gitconfig` file under the `[alias]` section, or you create a new
script file in your `$PATH` whith a name starting with `git-`. By creating
a `git-foo` script, you can invoke it by running `git foo` automatically. 

I've opted for the second approach as it makes writing non-trivial scripts
easier, and it gives an easy access to potential arguments. Also note
that all git scripts are run from your git root.

## Display all the branches

This one is easy and git provides an easy way to call it. It will display
a list of all the local branches, and the current one will be prefixed with
a `*`.

```sh
$ git branch-list
* develop
  master
  release
```

```sh
#!/usr/bin/env bash
# git-branch-list
git branch $@
```

Note that we pass the `$@` to the initial call to allow passing optional
arguments (like `--all` to also get remote branches).

## What is the current branch ?

Instead of displaying the whole list of all available branches, you might
simply need to know what the current branch is.

```sh
$ git branch-current
develop
```

```sh
#!/usr/bin/env bash
# git branch-current
git rev-parse --abbrev-ref HEAD 2>/dev/null
```

This one is a little trickier. To get the name of the current branch, we need
to ask git the unambiguous name of the current `HEAD`, which happens to be the
name of the current branch. Note that in detached head mode, this command will
return `HEAD`.

## Does the branch `foo` exists ?

Git also provides a top-level command to get this information. This will return
an exit code of `0` if the branch exists, `1` otherwise.

```sh
$ git branch-exists foo
$ echo $?
1
$ git branch-exists master
$ echo $?
0
```

```sh
#!/usr/bin/env bash
# git-branch-exists
git show-branch $1 &>/dev/null
```

Note that we simply pass the name of the branch to test as the `$1` variable
and hide any output the command might create. I suggest you configure your
terminal prompt so you can easily see if the last command was a success or not.

## Creating the `foo` branch

There are two ways to create branches in git. Either simply creating it and
staying on your current one, or creating one and switching to it. I've
decided that my alias should do the second command, because more often than
not, when I need to create a new branch, I also need to switch to it.

```sh
$ git branch-create foo
Switched to a new branch 'foo'
```

```sh
#!/usr/bin/env bash
# git-branch-create
git checkout -b $1
```

This one is easy too, we've simply aliased `git branch-create` to the `git
checkout -b` we're used to call.

## Deleting the local `foo` branch

We're talking here about deleting a local branch. We'll see how to delete
a remote branch in the next part.

```sh
$ git branch-delete foo
Deleted branch foo (was 05d51b4).
```

```sh
#!/usr/bin/env bash
# git branch-delete
git branch -D $1
```

This one is pretty easy too, we've simply aliased `git branch-delete` to `git
branch -D`. 

## Deleting the remote `foo` branch

Now we want to delete the `foo` branch from the remote. 

```sh
$ git branch-remove-remote foo
To git@github.com:user/repo
 - [deleted]         foo
```

```sh
#!/usr/bin/env bash
# git branch-remove-remote
git push origin --delete $1
```

This version of the alias is pretty simple and only allows deleting branches
from `origin`. If you want to be able to delete branches from other remotes,
have a look at the [complete script I'm using][1].

## Conclusion

What I really like about those aliases is how they add consistency to the git
command. Instead of using `git checkout`, `git show-branch` or `git branch` for
commands that deals with branches, we've adding a namespace and we're now only
using command that starts with `git branch-`. If you have git command
autocompletion, this makes using them much much pleasant.

I have aliases to do the same kind of things for tags and remotes, but I'll
detail them in a future post.


[1]: https://github.com/pixelastic/oroshi/blob/master/scripts/bin/git-branch-remove-remote
