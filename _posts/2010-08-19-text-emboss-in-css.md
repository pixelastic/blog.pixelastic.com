---
layout: post
title: "Text emboss in CSS"
custom_v2_id: 222
---

I know only two _unperfect _ways of displaying an emboss text in CSS. As we
can't use inset shadows with `text-shadow`, unlike `box-shadow`, we have to
resort to other hacky ways.

Let me show you what can be done.

## Simulate it with an optical illusion

Instead of creating a real inner shadow, you can just create an optical
illusion by adding the correct shadow to make the viewer believe your text is
embossed.

If you have dark text, just add a subtle white shadow at the bottom, while if
you have light text, just add a subtle black one at the top.


```html
<a class="emboss light">Lorem ipsum</a>
<a class="emboss dark">Lorem ipsum</a>
```

```css
.emboss { font-size:1.2em; padding:50px; font-weight:bold; background:#0A539C; display:block; }
.light { color:#FFFFFF; text-shadow:0px -1px 0px rgba(0,0,0,0.9); }
.dark { color:#000000; text-shadow:0px 1px 0px rgba(255,255,255,0.1); }
```

I added an `emboss `class to more easily spot the effect, but the important
code is in the `light `and `dark `rules.

## Add an almost transparent layer

For this second solution we will simply add a second layer with the exact same
text above the first text. Just slightly moving it and making it partly
transparent.

You could add twice your element in your markup, but that would be bad for
accesibility as well as SEO, so we'll instead use the `:before` pseudo-class.

We can set the `:before` content using the `content:` property, and we can
also use the` attr()` method to get the content of one of our element's
attributes. We just need to put the exact same text in one of our attributes
and we're good to go.

This can be easily done with a link and its `title `attribute.


```html
<a class="emboss lightAgain" title="Lorem ipsum">Lorem ipsum</a>
<a class="emboss darkAgain" title="Lorem ipsum">Lorem ipsum</a>
```

```css
.lightAgain { color:#FFFFFF; position:relative; }
.lightAgain:before {
  content: attr(title);
  position:absolute;
  color:rgba(0,0,0,0.1);
  top:-1px;
  left:-1px;
  padding:50px;
}
.darkAgain { color:#000000; position:relative; }
.darkAgain:before {
   content: attr(title);
   position:absolute;
   color:rgba(255,255,255,0.1);
   top:1px;
   left:1px;
   padding:50px;
}
```

The effect is much better with this technique but it also has it share of
drawback :

  * You have to write your content twice, once in the element and once in an attribute
  * You have to copy all your `padding `rules in the `:before `element or it won't get correctly positionned
  * You can't select the text with this effect

Hope those two little techniques helped someone, anyway.

