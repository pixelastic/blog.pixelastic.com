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

## Folder structure

To be able to easily deploy to GitHub pages, I have to directories on my local
laptop, in the same parent directory : `./master` and `./gh-pages`.

As their names suggest, each one contain the content of the branch they are
named after. My Jekyll process involve building the website into `../gh-pages`.
This way I can easily commit on the output of the website in `gh-pages` branch
while still being able to locally serve it.

## Todo

### Must have
- Images from previous posts
- Favicon

### Should have
- Home website on www.pixelastic.com
- robots.txt and humans.txt

### Nice to have
- Adding related posts (time-based and/or tag-based).
- Grunt/bower build process
- Comments
- Custom CSS
