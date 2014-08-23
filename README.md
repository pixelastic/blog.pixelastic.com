# blog.pixelastic.com

This repository holds all the content of my personal blog. 

## Jekyll and Hyde

It is build using the static website generator Jekyll and the Hyde theme, by
@mdo.

## Previous versions

This is the third iteration of my blog. I kept the content but updated both the
theme and the underlying technology. Version 2 was based on cakePHP, but
I decided to try the static generation adventure, hoping it will help me blog
more often.

## GitHub

As an exercice, I also made the code available on GitHub. Using git makes
backups a non-issue, and site updates are only a `git push` away. As most of my
workflow now involves `git`, it seems a natural evolution.

## Build process

All the jekyll processing is done through `grunt-jekyll`. The full website is
build using `grunt build` and is then uploaded on the webserver with `rsync`.
The full deploy script is in `./scripts/deploy`.

One can locally serve the build output using `grunt serve`.

## Development process

There is also a secondary process, used in development that does not involve
concatenating and minifiying assets, and only builds a subset of the whole
posts.

It is build using `grunt build:dev` and served with `grunt serve:dev`. This
only includes the 10 last posts (and drafts) and enable livereload.

## Todo

- "Code on GitHub" on bottom of page for desktops
- colors for code parts
- Using grunt-rsync to deploy
- Comments
- Images from v2
- Sass / Bourbon
- UnCSS
