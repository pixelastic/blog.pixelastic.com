---
layout: post
title: "Rendering bug with generated content on form fields in Opera"
custom_v2_id: 73
---

If you try the following code in Opera 10.51, you'll have some weird rendering
bug :

    
```html
<style>  
  .test:after {  
    content:"This should be on red background";  
    background:red;  
  }  
 </style>  
 Text input : <input type="text" value="I'm unstyled" class="test" />
```

The generated content is added to the page, but the background color isn't
rendered. Worse, the input lose all styling, it does not have a background
color nor borders anymore.

The same effect also apply to every `input `(`radio`, `checkbox `and
`password`).

On a `select` tag, the generated content correctly have it's background color,
but still lose all styling.

On a `textarea`, the styling is gone too, and the background color is here.
Well, sort of, it is actually cropped after a while and the end of the text is
on transparent background.

I sent a bug report to Opera about that.

![Opera, input  generated content bug](files/2010/04/12/4bc2f9103d4c2.jpg)

