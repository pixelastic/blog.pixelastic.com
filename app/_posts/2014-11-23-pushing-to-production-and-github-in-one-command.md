---
layout: post
title: "Pushing to production and Github in one command"
tags: git, github
---

I'm using git for all my workflow. I use either GitHub or BitBucket to store my
code online. And for [some](http://www.pixelastic.com)
[tiny](http://talks.pixelastic.com) projects, I'm also using git directly to
push in production.

## Pushing to own remote

I have a few repositories that simply holds a bunch of `html` and `css` files,
to display a very simple page. Whenever I push some changes to thoses
repositories, I want to have the changes directly reflected online.

For this I created on my server a new repo, aptly named `repo`. In `repo`,
I simply ran `git init --bare` to create a bare repository. Now, from my local
repository I just update my local git repository to point the `origin` remote
to this bare repository. Running `git push` pushed my changes to this repo.

Easy, I have my own repo on my own server to store my files.

## Pushing to production

But that's only a bare repo, holding the list of changes but not exposing the
working directory. For that, I cloned `repo` into another directory using `git
clone ./repo ./dist`. This `dist` directory is actually served by nginx.

I added a hook to `repo/hook/post-receive` with the following code :

```sh
#!/bin/sh
unset GIT_DIR
cd /path/to/my/dist/directory
git pull
```

This will ran everytime the `repo` receives a new push. It will go to the
`dist` folder and pull changes from `repo` (as `repo` is the default origin for
`dist` as we cloned from it).

The part about `unset GIT_DIR` is needed so that the hook correctly run in
a bare repo.

Now, everytime I push my code, the hook will be run and the `dist` repo will be
updated. And as this directory is exposed through nginx, it will be directly
available to all.

## Pushing to multiple remotes

But that's not finished yet. I don't like having my code saved only in one
place. I'd like to also have my sources available on GitHub. So
I updated the `post-receive` hook by adding the following lines :

```sh
cd /path/to/my/repo/directory
git push
```

Of course, I also configured my `origin` remote to be GitHub, but you can make
it any repo. This will automatically push the content to a secondary repo
whenever the primary one receives new data.

## Conclusion

With simple git hooks I managed to push my code to production and save the
source in two different repository whenever I `git push`. Less commands to
type, more time to code something else.
