---
layout: post
title: "Trigger focus on input on iPhone programmatically"
tags: javascript iphone focus
---

It seems that Safari mobile on iPhone does not allow one to programmatically set
the focus to an input element if this does not come from a user interaction.

This means that if you listen to some event to set focus to an input, the focus
won't be set on Safari. This also means that if you create a new call trace by
wrapping your call in a `setTimeout`, you're also out of luck.

## HTML only attempt

I was using the HTML default behavior of `label`s being bound to their `input`s
through the `for` and `id` attributes to automatically hide/display part of my
UI when a specific `label` was clicked. This in turns checked/unchecked an
hidden checkbox that I was using in a CSS selector selector.

Something like:

```css
.my-ui { 
  display:none;
}
.my-checkbox:checked + .my-ui {
  display: block;
}
```

## Adding a bit of JavaScript

And then, I was listening to the `change` event on my checkbox to trigger
a `focus` event on an `input` in my UI.

This worked quite well on desktop but fails on iPhone. After some Googling, it
turns out that Safari has a mechanism to protect auto focus of inputs. Inputs
can only be programmatically focused if the order comes from a user interaction.

This means that if you call `.focus()` in a `click` handler, this is ok, but
this won't be ok if called from a `change` event or a `setTimeout`.

## Replicating standard behavior

In my case, I had to bypass the whole standard `label` behavior and rewrite it
in JavaScript to be able to trigger my focus event. Here is what I did:

```javascript
$label.on('click', function(e) {
  $checkbox.click();
  e.preventDefault();
  $input.focus();
});
```

This is actually me listening to the `click` event on the label, triggering
a `click` on the checkbox (which will toggle the checkbox value) and disabling
the default behavior (using `e.preventDefault()`).

Then I'm doing my input focus, which will work because it originated from a user
interaction.

## Conclusion

It's a shame that I had to disable common HTML behavior to re-implement it in
JS, just so I can work around a weird bug in a specific proprietary
implementation. But such is the life a web developer.
