---
layout: post
title: "Getting up to date on CSS"
tags: css
---

I have been coding in CSS for a few years. I started when IE6 was the major
browser but had to stop when HTML5 started to became a buzzword. Too bad. At
that time, I had a job where I mostly handled server-side stuff and couldn't
really keep on the newest CSS topics. Then I took a year off abroad.

Now that I'm back, I decided to get up to speed with all the goodness the CSS
world now has to offer. I decided to rewrite the default Hyde theme of this blog
with my own to better understand how it's done. Here is what I learned along
the way.

### SCSS

This is the first time I'm using a preprocessor, and the simple joy of being
able to use variables and mixins is great. The nesting is nice but I try not to
use it too much. I'd rather have a OOCSS naming convention than too much
hierarchy in my selectors.

### Autoprefixer

I added autoprefixer instead of SCSS mixins to handle cross-browser
compatibility as it seems a more future-proof approach. It leaves the
underlying SCSS files simpler to read.

### Fonts

I grabbed a font on FontSquirrel to use on the titles. I simply copy-pasted the
relevant CSS code, but still do not understand all the details of it. I'll have
to read a bit more to really understand the browsers it covers.

### rem

I started using `rem` units as most as I could. This really removes the burden
of having to handle the math involved in using `em`. I still had to use `px`
for media-queries, though.

### media-queries

I still struggle in remembering which one of `max-width` or `min-width` I need
to use in a given context, but otherwise media-queries are great. I coded first
for the perfect (or optimal) layout, and then added media-queries to handle
bigger and smaller screens.

In my case optimal means enough space to display the sidebar and the text in
a way that's easily readable. I then transformed the sidebar into a header for
smaller screens, and even added a menu icon to display the menu on really small
screens.

It's nice how SCSS lets you define media-queries inside of selectors, and using
variables for you breakpoints. This really fluidified the way I write code.

### CSS tricks

I had to resort to two small CSS tricks (or mind puzzle) for this new design.
I like bending my mind to find creative solutions with a declarative language
like CSS. Here I created a menu (hamburger) icon in pure CSS using `:before`
and `:after` borders. I also displayed a menu when this icon is clicked using
a `<label>` bound to a `checkbox` and selecting the menu with a clever `+`
selector. 

I really like not using images or Javascript for this kind of things. CSS is
a powerful language, but a hard one to master.
