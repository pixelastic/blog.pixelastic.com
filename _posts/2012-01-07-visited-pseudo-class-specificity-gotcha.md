---
layout: post
title: "The :visited pseudo-class specificity gotcha"
custom_v2_id: 334
---

In a [previous post](/blog/333:alternative-multiples-classes-ie6), I bloggued
about the way to emulate OOCSS behavior with multiple classes in IE6.

Today, I'll do a follow up and write about a possible gotcha involving the
`:visited` pseudo class.

Following the previous example let's imagine you have a styling for your
defauls links (`a { color:blue; }`), one for the default buttons (`.button {
... }` ) and one for a custom button that extend the `.button` (`.customButton
{ ... }`)

Now, imagine that you'll want to style all `:visited` links the same way non-
visited links are styled. You might write something like :



```css
a, a:visited { color:blue; }
```

Unfortunatly, this will have some nasty side effects on your `.button` and
`.customButton` rules because `a:visited` will have precedence over `.button`
and `.customButton`

You can find more information about CSS specificity in this [Star
Wars](http://www.stuffandnonsense.co.uk/archives/css_specificity_wars.html)
post.

Your first solution could be to add even more specificity to your own rules,
to override the `a:visited` one, like so :

```css
.button, .button:visited { ... }
.customButton, .customButton:visited { ... }
```

This will work, of course, but you're only adding complexity to your
specificities, and this get more and more tedious the more you add other
customised buttons.

In fact, there is a much better way, one that you could throw in your
`reset.css` if it isn't there already :

```css
a:visited { color:inherit; }
```

That way, all your visited links will inherit their color from their non-
visited version. This mean that visited `.button` will use the `.button`
color, visited `.customButton` will use `.customButton` color and simple
visited links will use the `a` color.

Of course, if you defined a `background-color` in your `a`, you should define
a `background-color:inherit` in your `a:visited` too.

