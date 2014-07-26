---
layout: post
title: "How to hide/show elements based on Javascript"
custom_v2_id: 221
tags: css, javascript, performance
---

Sometimes you have a really great design with some really fancy Javascript
goodness, like drag'n'drop and other shiny Ajaxy stuff.

But when you browse the website with Javascript disabled, none of that works
and you end up with interface elements that should'nt be here because they do
not work.

In those case, you'd rather display a nice message to your user, telling him
that he can't use the feature withou Javascript enabled.

## But how do you do that ?

Well, I myself load two different stylesheets. Remember that your website
should be working without Javascript, this is just the last layer you add.

My default stylesheet will load all the rules for when Javascript is not
enabled. No fancy `cursor:move` here.

Then I load a second stylesheet using Javascript, using `document.write()` in
the `<head>`. And that's in this one that I write rules that overload the
previous one. I add every styling that deals with Javascript-enabled features
here.

## Limitations

I may be changing the way I load the JS stylesheet in the future. I don't
really like relying on `document.write` because it is _evil_. I also don't
like the idea of getting one extra request.

I could add a `js` class to my body element (like
[modernizr](http://www.modernizr.com/) does with all its CSS3 properties) and
then target elements by prepending `.js` to the rule.

But it means adding rules in my main CSS file for users without JS that will
still be downloading those extra useless bytes.

I haven't yet figured which way was the best (or should I say, the worst)

## Convenient methodes

Whatever way you choose, one thing that really helped me was two real simple
classes : `jsOn `and `jsOff `that I add to elements.

Elements with `jsOn `will only be visible if Javascript is enabled and hidden
otherwise, while element with `jsOff `will do the opposite.

Assuming you mark your body element with a `js` class if Javascript is
enabled, here's how to do it :

```js
.jsOn { display:none; }
.js .jsOn { display:block;
.jsOff { display:block;
.js .jsOff { display:none;
```

Hope all that helps at least someone.
