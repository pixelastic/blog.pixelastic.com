---
layout: post
title: "Namespaced helpers for git tags"
tags: git
---

I recently posted an article here about my git aliases for handling
branch-related stuff. I've namespaced all my CRUD action with the
`git-branch-*` prefix.

Now, I'll post a very similar set of commands, but this time for handling git
tags. This will let you run simple commands like `git-tag-create foo`,
`git-tag-push`, `git-tag-remove-remote foo`.

## Display all tags

It is quite easy to display all the tags available using the `git tag` command.
Unfortunatly, this command will only list tags along with the commit message
they are associated with. If you also want the commit hash, you'll have to call
`git show-ref --tags`.

```sh
$ git tag-list
v1.1.9          Version 1.1.9
v1.1.10         Version 1.1.10
v1.2.0          Version 1.2.0
```

```sh
#!/usr/bin/env bash
# git-tag-list
git tag -n | sort -V
```

Note that I piped the output into `sort -V` to have them correctly sorted in
alphabetical order, while still keeping version sort.

If you want to have a bit more information (like the commit hash, colors and
columns) have a look at [the complete ruby script][1] I'm using.

## Display all remote tags

Getting the list of all remote tags is a bit more complex. First, it is not
possible to get the tags commit messages, only the hashes. Then, we'll have to
add a bit more commandline processing in order to get a meaningful ordered
list.

```sh
$ git tag-list-remote
v1.1.9                     9190a6c
v1.1.10                    066198a
v1.2.0                     cde09b3
```

```sh
#!/usr/bin/env bash
# git-tag-list-remote
git ls-remote --tags origin 2>/dev/null | \
  grep -v '\^{}' | \
  awk '{print $2, $1}' | \
  sort -V
```

Here we grab the full list from the remote and we exclude tags ending with `^{}`
(they are used by git internals, we don't need them). Then, we swap the first
and second columns (hash and tag) so we can safely run `sort -V` on them and
order the result by tag.

Here, the `origin` remote is hardcoded. I personnally use a slightly more
complex code to allow specifying a different remote and add a bit of color. You
can have a look at it [on GitHub][2].

## What is the current tag ?

By "current tag", I mean the tag that is closer in backward history. This one
is directly available through the `git describe` command.

```sh
$ git tag-current
v1.2.0
```

```sh
#!/usr/bin/env bash
# git-tag-current
git describe --tags --abbrev=0 2>/dev/null
```

Note that this simple script does not handle the case when there are multiple
tags on the same commit.

## Does the tag `foo` exists ?

For this one, we'll simply ask git to return all the tags that match a specific
pattern. If nothing is returned, then the tag does not exists.

```sh
$ git tag-exists foo
$ echo $?
1

$ git tag-exists v1.2.0
$ echo $?
0
```

```sh
#!/usr/bin/env bash
# git-tag-exists
if [[ "$(git tag -l "$1")" != '' ]]; then
  exit 0
fi
exit 1
```

## Does the tag `foo` exists on the remote ?

Pretty much the same thing as above, we'll ask git to get us the list of all
remote tags that match a pattern. But this time, instead of using the `git
tag` command, we'll use the `git ls-remote` one.

```sh
$ git tag-exists-remote foo
$ echo $?
1

$ git tag-exists-remote v1.2.0
$ echo $?
0
```

```sh
#!/usr/bin/env bash
# git-tag-exists-remote
if [[ "$(git ls-remote --tags origin "$1")" != '' ]]; then
  exit 0
fi
exit 1
```

Note that this simple script will always check the `origin` remote. If you need
to be able to specify the remote to check, have a look at the [complete ruby
script][3] I'm using.

## Creating the `foo` tag

## Pushing the `foo` tag to the remote

## Pulling the `foo` tag from the remote
Pulling all tags ?

## Deleting the local `foo` tag

## Deleting the remote `foo` tag

[1]: https://github.com/pixelastic/oroshi/blob/master/scripts/bin/git-tag-list
[2]: https://github.com/pixelastic/oroshi/blob/master/scripts/bin/git-tag-list-remote
[3]: https://github.com/pixelastic/oroshi/blob/master/scripts/bin/git-tag-exists-remote
