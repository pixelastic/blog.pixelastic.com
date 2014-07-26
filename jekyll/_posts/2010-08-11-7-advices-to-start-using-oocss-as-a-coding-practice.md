---
layout: post
title: "7 advices to start using OOCSS as a coding practice"
custom_v2_id: 201
tags: css, oocss
---

Not long ago, I stumbled across this [video about massive and unmaintainable
CSS files](http://www.stubbornella.org/content/2010/07/01/top-5-mistakes-of-
massive-css/) from Nicole Sullivan. It made me want to try OOCSS.

[OOCSS ](http://wiki.github.com/stubbornella/oocss/)is a way to code css in a
way that replicates the goodies general OOP told us. Classic CSS use the
cascade in selectors to emulate a concept of inheritence.

OOCSS puts the concept of inheritence a little step further by telling us to
create "modules" in our CSS files. Each module represent a "widget" of our
page, or should I say of our whole site.

It comes with a simple list of principles that could allow one to write much
more flexible and maintainable code. I rewrote the whole CSS for this website
(as well as the admin interface I'm using behind the doors) following those
principles, and I thought I'll share it with you.

## Drop the `#id` selector

We won't be using the `#id` selector anymore (except for some edge cases).
Instead of `#commentList {}` we'll use `.commentList {}`

This change alone lets us reuse the same element multiple times on the same
page.

Note that we will still add `ids` in our HTML markup for form inputs or for
Javascript purpose (`document.getElementById` is still the faster selection
method).

## Don't make your selector dependent on the page structure

We won't style our elements based on where they will be displayed in the page.

We don't care if our module will be displayed in a footer, sidebar, specific
page or whatever. We just style it all the same.

Instead of writing `.sidebar .lastComments {}`, we will go for the shorter
`.lastComments {}`.

This will allow us to easily display the last comments on any page, anywhere.
You should carefully name your modules to something that clearly evoke what
the module is supposed to display, without ambiguity.

If you need to tweak the display of an element in a certain part of the page,
you could always write a specific selector for this specific need, that will
overwrite the default rules. But this must not be your default selector.

## Do not use both tag and class selector on the same element

Avoid the `div.errorMessage`, `ul.userList` selectors. The first one is just
too specific : what happen if you ever want to style a `<p>` instead of a
`<div>` ? The second one is useless, `<ul>` is a list by definition.

There is only one moment when being that specific can be useful, it is when
you need to overwrite, for a specific element, rules defined for the class.
Fortunatly, thanks to the OOCSS coding style, this won't happen much.

## Don't make your selectors over-specific

This is a followup of the previous rule, but don't write overly specific
rules, like .`userList table thead tr th a`. A simple `.userList thead a` is
enough.

First, you are overly detailing each level of the markup while most of the
time the uppermost and lowermost parts are enough. But you also define useless
selectors like `tr th` or `ul li,` where `th` or `li` are enough (those
elements can not be placed in any other parent element).

## Create your own reset stylesheet

To avoid repeating `margin:0; padding:0` over and over in your stylesheets,
you should spend some time finding a reset stylesheet that you like and then
tweaking it to fit your coding practice.

I used to include the [Tripoli framework](http://devkick.com/lab/tripoli/) in
my previous projects but I found that I had to reset styles it was settings
far too often.

All reset stylesheets are not equals, some will just remove all styling from
elements, letting you define them as you want. Others will also assign default
rendering styles to make something both visually beautiful and cross-browser.

But the best reset stylesheet you'll get is the one you'll create (or, as it
is quite a bit of work, tweak) yourself.

## Use a grid system to place elements

Some years ago, I found CSS Framework like Blueprint to be a waste of time. I
didn't want to clutter mu HTML markup with _non-semantic_ classes for handling
the styling.

I also found that the psd files I was given to integrate couldn't fit in grids
because the sidebar was 173px wide for example.

Now I still don't think cluttering the HTML with `span-6 pull-2` is the best
thing that happened to CSS, but I found it much better than cluttering my CSS
with endless `overflow:hidden` and `float:left; margin-right:10px`
declarations.

And I still got design from not-so-professional designers to integrate that do
not seems to have any logical proportion, and can't fit them in grids. But I
also work with more talented people that deliver beautiful design and they
tend to be the one that fits easily into grids.

So it may not always be possible to use a grid system, but more often than
not, it is and even if that means tweaking the original (badly designed)
design a dozen pixels off, it will greatly help the CSS process.

## Create a global stylesheet for your main classes

I also create a main stylesheet for all the classes I know I'll be reusing all
accross this project (and others). I include it at the top, right after the
reset one.

In it I'll defined general classes that could be extended by all the other
inner classes later. Like a `.message` class, that I may be extending later
using `.message.error` or .`message.success`

## One final word

Ok, this is it. I'm fairly new to OOCSS too, so I'm still discovering it too.
So far I found that I have greatly reduce the size of my files but most
importantly, my styles are way more easy to tweak for special needs than
before.

It also helped me separate the various elements of the website, and it is much
more easier to find the piece I need. Fewer classes to depends on means I know
where the rules are coming from and I can write more specific selectors if
need me more easily.