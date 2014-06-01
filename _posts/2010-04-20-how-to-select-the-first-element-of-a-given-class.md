---
layout: post
title: "How to select the first element of a given class"
custom_v2_id: 80
---

Imagine the following HTML code :

    
```html
<div class="wrapper">  
[... various HTML elements ...]  
  <div class="bar">bar</div>  
  <div class="foo">foo</div>  
  <div class="bar">bar</div>  
  <div class="foo">foo</div>  
</div>
```

How would one style the first `div.foo` ?

I've tried `div.wrapper div.foo:first-of-type` but unfortunatly it does not
work. In fact the previous rule can be translated into "select the first child
of div.wrapper only if it is a div.foo" and not "select the first div.foo
inside div.wrapper" as I imagined.

Using jQuery I could do a `$('div.wrapper div.foo:first')` but there's no such
selector in CSS.

