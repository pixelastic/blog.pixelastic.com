---
layout: post
title: "Show and hide Flash elements without redraw"
custom_v2_id: 312
---

Imagine you have a Flash element in your HTML markup. If you apply any
`show`/`hide `logic to it, the flash will be reset and played back to its
first frame.

Actually, as soon as you change the `display `property of an element, if
forces all inner Flash element to be restarted.

There are a few ways you can work around that, and here are the two main I'm
using

## Your Flash file is in a tab

Fairly common scenario, you have tabs on your page (maybe using jQuery UI or a
custom code). When you display your Flash tab, all others are hidden, and when
you display another tab, the Flash one is hidden.

Instead of using `display:none` / `display:block`, we'll be a little more
sneaky and not really "hide" the element, but simply put it out of the user
view.

Just apply the following CSS rule to the element you want to hide. It will
just display it offscreen.

```css
.tabHidden {
  position:absolute;
  top:0px;
  left:-9999em;
}
```

Don't forget to add a `position:relative` to the HTML parent of your tab for
the absolute positionning to work.

## You have multiple Flash files in a list

This one is trickier. Imagine you have a list of elements, and each row
contains a Flash file. You want to filter the list based on various criterias
and only show the rows matching.

You can't use the previous technique here because some elements of your list
will be in relative positionning while others will be in absolute
positionning. And everytime you change the `position `property of your
element, the Flash will be reset.

The trick here is to play with your element dimensions and visibility. You can
change the `visibility `without triggering a redraw. As this will only make
the element invisible but still taking space, you just have to put its `height
`and `width `to `0` to make it effectively disappear.

```css
.listElementHidden {
  visibility:hidden;
  width:0px;
  height:0px:
  margin:0px;
}
```

The `margin:0px` is here to clear any margin you might have defined around
your element.

