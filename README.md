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

// TODO: This part of the readme needs some rework

> We first build the jekyll website with `grunt jekyll` (or `grunt jekyll:dev` to
> only build a small part, for faster testing). This will put jekyll content in
> `./dist/jekyll`.
> 
> Then, we can run the `grunt build` command to minify, compress and put the
> final content in `./dist/final`.
> 
> One can still run the manual `jekyll build` and/or `jekyll serve`.

## Todo

- Comments
- Images from previous posts
- Sass
- Dev and Build process
- Faster grunt dev deployment

